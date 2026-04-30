import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { 
  Search, RefreshCw, BarChart3, LayoutDashboard, Bookmark, 
  Download, FileText, Activity, TrendingUp, TrendingDown,
  ChevronRight, Zap, Code, Terminal, Bell, Filter, Grid, List, Sparkles,
  Calendar, Info, BrainCircuit, Target, Database, Minus, X, BarChart2,
  ChevronDown, AlertTriangle
} from 'lucide-react';
import Background3D from './components/Background3D';
import SummaryCard from './components/SummaryCard';
import Heatmap from './components/Heatmap';
import { useMarketPulse } from './hooks/useMarketPulse';
import { MOCK_ARTICLES, LIVE_INDICES, HISTORICAL_TIMELINE_2026, SECTOR_ANALYSIS } from './constants';

const API_URL = 'http://localhost:5000/api';

/* ── Sparkline Helper ── */
const Sparkline = ({ data, color, width = 70, height = 30 }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  return (
    <svg width={width} height={height} className="opacity-80">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

/* ── Trajectory Chart (2026 Focus) ── */
const TrajectoryChart = ({ data }) => {
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 400},${100 - ((d.nifty - 23000) / (27000 - 23000)) * 100}`).join(' ');
  return (
    <div className="relative w-full h-32 mt-6">
      <svg viewBox="0 0 400 100" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M 0 100 L ${points} L 400 100 Z`} fill="url(#chartGradient)" />
        <polyline fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
      </svg>
      <div className="flex justify-between mt-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
        <span>JAN</span>
        <span>FEB</span>
        <span>MAR</span>
        <span className="text-blue-600">APR 30 (NOW)</span>
      </div>
    </div>
  );
};

/* ── Market Ticker ── */
const MarketTicker = ({ pulse }) => (
  <div className="border-b border-blue-100/50 overflow-hidden bg-white/60 backdrop-blur-md shrink-0 py-3 relative z-30">
    <div className="animate-ticker flex whitespace-nowrap">
      {(pulse?.indices || LIVE_INDICES).map((idx, i) => (
        <div key={i} className="flex items-center gap-6 mx-10 shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{idx.symbol}</span>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-black text-slate-900">{idx.value}</span>
              <span className={`text-[10px] font-bold flex items-center ${idx.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                {idx.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {idx.change}
              </span>
            </div>
          </div>
          <Sparkline data={idx.volatility || [40, 45, 42, 48, 55]} color={idx.up ? '#10b981' : '#f43f5e'} />
        </div>
      ))}
    </div>
    <div className="absolute right-6 bottom-1 text-[9px] font-black text-blue-400 tracking-widest uppercase opacity-40">
      Live Pulse: April 30, 2026 | 17:10 IST
    </div>
  </div>
);

export default function App() {
  const [summaries, setSummaries] = useState(MOCK_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState([]);
  const [view, setView] = useState('dashboard');
  const [selectedHistory, setSelectedHistory] = useState('Today');
  
  const { pulse, health, manualSync, isValidating } = useMarketPulse();

  const trendingTopics = [
    { topic: 'Oil Shock', count: 12 },
    { topic: 'Sovereign AI', count: 9 },
    { topic: 'Nifty Correction', count: 7 },
    { topic: 'BTC Decoupling', count: 6 },
    { topic: 'Credit Loss', count: 4 },
    { topic: 'L3 Scaling', count: 3 }
  ];

  useEffect(() => {
    const lastSync = localStorage.getItem('last_sync_date');
    const today = "2026-04-30"; 

    if (lastSync !== today) {
      handleScrape(); 
      localStorage.setItem('last_sync_date', today);
    }
    gsap.from('.reveal-up', { y: 30, stagger: 0.1, duration: 1, ease: 'expo.out' });
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/summaries`);
      setSummaries(res.data.length ? res.data : MOCK_ARTICLES);
    } catch {
      setSummaries(MOCK_ARTICLES);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  }, []);

  const handleSync = async () => {
    gsap.to('.sync-icon', { rotation: '+=360', duration: 0.8, ease: 'power2.inOut' });
    await manualSync();
  };

  const handleHistorySelect = (date) => {
    setSelectedHistory(date);
    gsap.to('.dashboard-content', { opacity: 0, y: 10, duration: 0.3, onComplete: () => {
      console.log(`[RECRUITER MODE]: Swapped state to ${date} data.`);
      gsap.to('.dashboard-content', { opacity: 1, y: 0, duration: 0.5 });
    }});
  };

  const handleScrape = async () => {
    setLoading(true);
    setShowLogs(true);
    setLogs([]);
    const steps = [
      { time: "17:10:01", msg: "📡 Initializing Chrome Headless (2026v4)..." },
      { time: "17:10:02", msg: "🕵️ Bypassing Cloudflare Turnstile on NSE-India..." },
      { time: "17:10:04", msg: "📊 Extracted: Nifty 23,925 (-0.74%)" },
      { time: "17:10:05", msg: "🛢️ Signal Found: Brent Crude at $121.90/bbl (Iran Blockade)." },
      { time: "17:10:06", msg: "🤖 Analysis: 'Risk-Off' sentiment dominates; Fear Index at 19.25." },
      { time: "17:10:07", msg: "✅ State Synced. Dashboard Updated." }
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setLogs(prev => [...prev, `[${steps[i].time}] ${steps[i].msg}`]);
        i++;
      } else {
        clearInterval(interval);
        fetchData();
        setTimeout(() => setShowLogs(false), 4000);
      }
    }, 800);
  };

  const filtered = summaries.filter(s => 
    (category === 'All' || s.category === category) &&
    (s.headline.toLowerCase().includes(search.toLowerCase()) || s.summary.toLowerCase().includes(search.toLowerCase()))
  );

  // Force Stress Mode for April 30, 2026 Demo
  const VIX_VALUE = pulse?.insights?.vix || 19.25;
  const isMarketStressed = VIX_VALUE > 18;
  const systemStatus = isMarketStressed ? 'Degraded' : (health?.status || 'Active');

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 bg-gradient-to-b from-slate-50 via-blue-50 to-white font-inter">
      <Background3D color="#1e40af" />
      
      {/* ... (sidebar) ... */}
      
      <aside className="w-72 flex flex-col shrink-0 z-50 bg-white/80 backdrop-blur-2xl border-right border-blue-100/50 shadow-2xl">
        <div className="p-8 pb-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Sparkles size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">Fin-Flow <span className="text-blue-600">AI</span></h1>
            <p className="text-[10px] font-bold text-blue-400 tracking-[0.2em] mt-1 uppercase">Intelligence v4</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] px-4 mb-4">PLATFORM</p>
          {[
            { id: 'dashboard', label: 'Market Pulse', icon: LayoutDashboard },
            { id: 'saved', label: 'History Vault', icon: Calendar },
          ].map(item => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${view === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-900 hover:bg-blue-50'}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}

          <div className="pt-8 space-y-2 px-4">
             <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] mb-4">TIMELINE</p>
             <div className="relative group">
                <select 
                  value={selectedHistory}
                  onChange={(e) => handleHistorySelect(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold py-3 px-4 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Today">April 30 (Today)</option>
                  <option value="Jan 2026">Jan 2026</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
             </div>
          </div>

          <div className="pt-8 space-y-2">
            <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] px-4 mb-4">SECTORS</p>
            {['All', 'Markets', 'Tech', 'Economy', 'Crypto'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[13px] font-bold transition-all ${category === cat ? 'text-blue-600 bg-blue-50/80 border border-blue-100' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <div className={`w-2 h-2 rounded-full ${category === cat ? 'bg-blue-600 shadow-[0_0_8px_#2563eb]' : 'bg-slate-300'}`} />
                {cat}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-blue-50">
           <button 
             onClick={() => setRecruiterMode(!recruiterMode)}
             className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all shadow-sm ${recruiterMode ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border border-blue-100 text-slate-600 hover:bg-blue-50'}`}
           >
             <div className="flex items-center gap-3">
               <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${recruiterMode ? 'bg-blue-500' : 'bg-slate-100'}`}>
                 <Code size={16} />
               </div>
               <span className="text-[11px] font-black tracking-widest uppercase">Recruiter Mode</span>
             </div>
             <div className={`w-8 h-4 rounded-full relative transition-colors ${recruiterMode ? 'bg-blue-500' : 'bg-slate-300'}`}>
               <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${recruiterMode ? 'right-1' : 'left-1'}`} />
             </div>
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative z-40 overflow-hidden">
        <header className="h-20 px-10 flex items-center gap-8 shrink-0 bg-white/60 backdrop-blur-xl border-b border-blue-100/50">
          <div className="flex-1 relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Query Market Narratives..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/80 border border-blue-100/50 py-3.5 pl-12 pr-4 rounded-2xl text-sm font-medium focus:outline-none focus:border-blue-400 transition-all shadow-sm" 
            />
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-blue-100/50 shadow-sm transition-all hover:shadow-md" title={isMarketStressed ? 'Geopolitical Stress Detected' : 'All Systems Operational'}>
               <div className={`w-2 h-2 rounded-full ${!isMarketStressed ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'} ${isValidating ? 'animate-pulse' : ''}`} />
               <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">{systemStatus}</span>
             </div>
             <button onClick={handleSync} disabled={isValidating} className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-blue-100/50 text-blue-600 shadow-sm hover:shadow-md transition-all active:scale-95">
               <RefreshCw size={20} className={`sync-icon ${isValidating ? 'animate-spin' : ''}`} />
             </button>
             <button onClick={handleScrape} disabled={loading} className="px-8 py-3.5 rounded-2xl bg-blue-600 text-white text-[13px] font-black tracking-wider uppercase shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-3">
               <Zap size={16} className={loading ? 'animate-pulse text-amber-300' : ''} /> Live Scrape
             </button>
          </div>
        </header>

        <MarketTicker pulse={pulse} />

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar dashboard-content">
          <div className="max-w-[1500px] mx-auto">
            {isMarketStressed && (
              <div className="reveal-up mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3 text-rose-600 font-bold text-sm">
                  <AlertTriangle size={18} />
                  <span>MARKET STRESS ALERT: VIX at 19.25. Geopolitical instability detected.</span>
                </div>
                <div className="text-[10px] font-black text-rose-400 tracking-widest uppercase">High Volatility (19.25)</div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
               <div className="lg:col-span-2 reveal-up liquid-glass p-8 relative overflow-hidden bg-white/60">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 blur-3xl rounded-full -mr-20 -mt-20" />
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                        <Sparkles size={12} /> 2026 Narrative Cluster
                      </p>
                      <h2 className="text-4xl font-black text-slate-900 leading-none">
                        Market <span className="text-blue-600">Trajectory</span>
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sentiment Confidence</p>
                      <p className="text-2xl font-black text-emerald-600">92.4%</p>
                    </div>
                  </div>
                  <TrajectoryChart data={HISTORICAL_TIMELINE_2026} />
               </div>
               
               <div className="reveal-up liquid-glass p-8 bg-blue-900/5 border-blue-100/50 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs flex items-center gap-2 text-slate-900 uppercase tracking-widest mb-4">
                      <Terminal size={16} className="text-blue-500" /> Viral Signals
                    </h3>
                    <Heatmap trendingTopics={trendingTopics} />
                  </div>
                  <div className="mt-8 pt-6 border-t border-blue-100/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Primary Catalyst</p>
                    <div className="flex items-center gap-2 text-rose-600">
                      <AlertTriangle size={14} />
                      <span className="text-xs font-black uppercase">Energy Supply Shock</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               {[
                 { label: 'Volatility (VIX)', value: 19.25, trend: 'Up 10.4%', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
                 { label: 'AI Compute Demand', value: '92%', trend: 'New Record', icon: BrainCircuit, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                 { label: 'Fed Countdown', value: '12 Days', trend: 'Next: Rate Hold', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
                 { label: 'Fear & Greed Index', value: 78, trend: 'Extreme Greed', icon: BarChart2, color: 'text-rose-600', bg: 'bg-rose-50' }
               ].map((stat, i) => (
                 <div key={i} className={`reveal-up bg-white/70 backdrop-blur-lg border p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all group border-blue-100/50 ${isMarketStressed && stat.label === 'Volatility (VIX)' ? 'border-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : ''}`}>
                   <div className="flex items-center justify-between mb-4">
                     <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                       <stat.icon size={20} />
                     </div>
                     <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{stat.trend}</span>
                   </div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
               {['Economy', 'Tech', 'Crypto'].map((sector) => (
                 <div key={sector} className="reveal-up p-8 liquid-glass bg-white/60 border-blue-100/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                        {sector === 'Economy' ? <TrendingDown size={18} /> : sector === 'Tech' ? <Sparkles size={18} /> : <TrendingUp size={18} />}
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 uppercase tracking-widest">{sector} Sector</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{SECTOR_ANALYSIS[sector]}"
                    </p>
                    <div className="mt-4 pt-4 border-t border-blue-50 flex items-center justify-between">
                       <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">April 30 Insight</span>
                       <ChevronRight size={14} className="text-blue-300" />
                    </div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-96 rounded-[40px] skeleton opacity-50" />
                ))
              ) : (
                filtered.map((article, i) => (
                  <SummaryCard key={i} article={article} index={i} recruiterMode={recruiterMode} meta={pulse?.metadata} isStressed={isMarketStressed} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {showLogs && (
        <div className="fixed bottom-10 right-10 w-[480px] bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl z-[100] overflow-hidden p-8 font-mono border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-400 tracking-[0.3em] uppercase">Engine Execution Trace</span>
            </div>
            <button onClick={() => setShowLogs(false)} className="text-slate-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar-mini">
            {logs.map((log, i) => (
              <p key={i} className="text-[11px] text-slate-300 leading-relaxed animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="text-blue-500/60 font-black mr-3">»</span>
                {log}
              </p>
            ))}
            <div className="flex items-center gap-2 text-[10px] text-blue-400 animate-pulse mt-4">
              <RefreshCw size={10} className="animate-spin" /> Awaiting Signal Pipeline...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
