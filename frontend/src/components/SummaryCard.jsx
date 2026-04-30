import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { 
  ExternalLink, TrendingUp, TrendingDown, ChevronRight, 
  Bookmark, BookmarkCheck, BrainCircuit, Activity, 
  Target, Zap, Database, Clock, Server, Layers, BarChart2
} from 'lucide-react';

const SENTIMENT_STYLES = {
  Positive: { color: 'var(--sentiment-bull)', label: 'Bullish' },
  Negative: { color: 'var(--sentiment-bear)', label: 'Bearish' },
  Neutral: { color: 'var(--sentiment-neutral)', label: 'Neutral' }
};

const SummaryCard = ({ article, index = 0, recruiterMode = false, meta = {}, isStressed = false }) => {
  const cardRef = useRef();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const sentiment = SENTIMENT_STYLES[article.sentiment] || SENTIMENT_STYLES.Neutral;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (saved.find(a => a.id === article.id || a.url === article.url)) setIsBookmarked(true);

    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'expo.out' }
    );
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-white/80 backdrop-blur-lg border rounded-[32px] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(30,64,175,0.08)] relative overflow-hidden flex flex-col h-full group ${isStressed ? 'border-rose-300 animate-pulse-subtle' : 'border-blue-100/50'}`}
    >
      {/* ── Recruiter Mode: Technical Badge ── */}
      {recruiterMode && (
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5 animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white shadow-xl">
             <Database size={10} className="text-blue-400" /> 
             <span className="opacity-60">Source:</span> {meta.dataSource || 'AlphaVantage Proxy'}
           </div>
           <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white shadow-xl">
             <Clock size={10} className="text-emerald-400" /> 
             <span className="opacity-60">Latency:</span> {meta.latency || '32ms'}
           </div>
           <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white shadow-xl">
             <Layers size={10} className="text-amber-400" /> 
             <span className="opacity-60">Cache:</span> {meta.cacheStatus || 'HIT from Redis'}
           </div>
        </div>
      )}

      {/* ── Sentiment & Category ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {article.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5" style={{ color: sentiment.color, background: `${sentiment.color}10`, border: `1px solid ${sentiment.color}30` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: sentiment.color }} />
            {sentiment.label}
          </span>
        </div>
        <button onClick={() => setIsBookmarked(!isBookmarked)} className="text-slate-300 hover:text-blue-600 transition-colors">
          {isBookmarked ? <BookmarkCheck size={20} className="text-blue-600" /> : <Bookmark size={20} />}
        </button>
      </div>

      <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
        {article.headline}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
        {article.summary}
      </p>

      {/* ── Key Insights ── */}
      <div className="space-y-2 mb-6">
        {article.key_insights?.slice(0, 2).map((insight, i) => (
          <div key={i} className="flex gap-3 text-xs text-slate-600 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50">
            <Zap size={14} className="text-blue-500 shrink-0 mt-0.5" />
            <span className="font-medium">{insight}</span>
          </div>
        ))}
      </div>

      {/* ── Next Move Projection ── */}
      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">
          <BrainCircuit size={14} /> Next-Move Projection
        </div>
        <p className="text-[12px] font-medium leading-relaxed italic">
          "{article.projection || 'Market awaiting technical confirmation at psychological resistance level.'}"
        </p>
      </div>

      {/* ── Footer Info ── */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <Server size={12} /> {article.source}
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline group"
          >
            [View Source] <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── Data Lifecycle (Recruiter Mode) ── */}
      {recruiterMode && (
        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
           <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 tracking-tighter uppercase mb-2">
             <span>Lifecycle: API</span>
             <ChevronRight size={10} />
             <span>Validation</span>
             <ChevronRight size={10} />
             <span>DB Storage</span>
             <ChevronRight size={10} />
             <span className="text-blue-500">State</span>
           </div>
           <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500 w-3/4 animate-pulse" />
           </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
