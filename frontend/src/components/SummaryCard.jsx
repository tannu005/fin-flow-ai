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

const SummaryCard = ({ article, index = 0, meta = {}, isStressed = false }) => {
  if (!article) return null;
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
      className={`bg-white backdrop-blur-lg border rounded-[32px] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(225,29,72,0.08)] relative overflow-hidden flex flex-col h-full group ${isStressed ? 'border-rose-300 animate-pulse-subtle' : 'border-slate-200'}`}
    >
      {/* ── Recruiter Mode: Technical Badge ── */}
      

      {/* ── Sentiment & Category ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-50 text-rose-900 border border-slate-200">
            {article.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5" style={{ color: sentiment.color, background: `${sentiment.color}10`, border: `1px solid ${sentiment.color}30` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: sentiment.color }} />
            {sentiment.label}
          </span>
        </div>
        <button onClick={() => setIsBookmarked(!isBookmarked)} className="text-slate-700 hover:text-rose-900 transition-colors">
          {isBookmarked ? <BookmarkCheck size={20} className="text-rose-900" /> : <Bookmark size={20} />}
        </button>
      </div>

      <h3 className="text-xl font-bold text-slate-800 leading-tight mb-3 group-hover:text-rose-900 transition-colors">
        {article.headline}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
        {article.summary}
      </p>

      {/* ── Key Insights ── */}
      <div className="space-y-2 mb-6">
        {article.key_insights?.slice(0, 2).map((insight, i) => (
          <div key={i} className="flex gap-3 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
            <Zap size={14} className="text-slate-9000 shrink-0 mt-0.5" />
            <span className="font-medium">{insight}</span>
          </div>
        ))}
      </div>

      {/* ── Next Move Projection ── */}
      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-rose-900 to-rose-950 text-white shadow-lg shadow-rose-900/20">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-200/80 mb-2">
          <BrainCircuit size={14} /> Next-Move Projection
        </div>
        <p className="text-[13px] text-rose-50 font-medium leading-relaxed italic">
          "{article.projection || 'Market awaiting technical confirmation at psychological resistance level.'}"
        </p>
      </div>

      {/* ── Footer Info ── */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
          <Server size={12} /> {article.source}
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rose-900 text-[11px] font-bold flex items-center gap-1 hover:underline group"
          >
            [View Source] <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── Data Lifecycle (Recruiter Mode) ── */}
      
    </div>
  );
};

export default SummaryCard;
