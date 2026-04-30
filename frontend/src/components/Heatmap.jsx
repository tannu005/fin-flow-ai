import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/* Heatmap color scale: low-count = subtle blue, high-count = bright neon */
const getTopicStyle = (count, maxCount, sentiment) => {
  const ratio = count / Math.max(maxCount, 1);
  // Color: positive → green tones, mixed → cyan, negative driven → red/amber
  const r = Math.floor(0 + ratio * 30);
  const g = Math.floor(200 * ratio + 80 * (1 - ratio));
  const b = Math.floor(255 * ratio + 120 * (1 - ratio));
  const alpha = 0.08 + ratio * 0.22;
  const borderAlpha = 0.15 + ratio * 0.55;
  return {
    background: `rgba(${r}, ${g}, ${b}, ${alpha})`,
    borderColor: `rgba(${r}, ${g}, ${b}, ${borderAlpha})`,
    color: `rgba(${r + 100}, ${g + 55}, ${b}, 1)`,
    textShadow: ratio > 0.5 ? `0 0 ${ratio * 12}px rgba(${r}, ${g}, ${b}, 0.6)` : 'none',
    fontSize: `${0.7 + ratio * 0.45}rem`,
    fontWeight: ratio > 0.6 ? 700 : 500,
  };
};

const Heatmap = ({ trendingTopics }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (trendingTopics?.length && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.topic-bubble'),
        { opacity: 0, scale: 0.6, y: 15 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [trendingTopics]);

  if (!trendingTopics || trendingTopics.length === 0) {
    return (
      <div className="flex flex-wrap gap-2">
        {['AI', 'Inflation', 'Fed Policy', 'Equities', 'Bitcoin', 'Semiconductors'].map((t, i) => (
          <span
            key={i}
            className="topic-bubble px-3 py-1 rounded-full border text-xs font-medium"
            style={{
              background: 'rgba(0,212,255,0.06)',
              borderColor: 'rgba(0,212,255,0.2)',
              color: 'rgba(0,212,255,0.6)',
              fontSize: '0.7rem',
            }}
          >
            #{t}
          </span>
        ))}
      </div>
    );
  }

  const maxCount = Math.max(...trendingTopics.map(t => t.count));

  return (
    <div ref={containerRef} className="flex flex-wrap gap-2.5 items-center">
      {trendingTopics.map((topicData, i) => {
        const style = getTopicStyle(topicData.count, maxCount);
        return (
          <span
            key={i}
            className="topic-bubble px-3 py-1.5 rounded-full border cursor-default transition-transform hover:scale-110 inline-flex items-center gap-1"
            style={style}
            title={`${topicData.count} article${topicData.count !== 1 ? 's' : ''}`}
          >
            {topicData.topic}
            {topicData.count > 1 && (
              <span className="opacity-60 text-[0.65rem]">×{topicData.count}</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Heatmap;
