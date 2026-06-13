const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

content = content.replace(/, RECRUITER_DATA/g, '');
content = content.replace(/  const \[recruiterMode, setRecruiterMode\] = useState\(false\);\n/g, '');
content = content.replace(/recruiterData: RECRUITER_DATA, /g, '');

const btnStart = '<div className="p-6 border-t border-slate-200">';
const btnEnd = '</button>\r\n        </div>';
const btnIdxStart = content.indexOf(btnStart);
const navEndIdx = content.indexOf('</nav>');
const realBtnStart = content.indexOf(btnStart, navEndIdx);
const realBtnEnd = content.indexOf(btnEnd, realBtnStart) + btnEnd.length;
if (realBtnStart !== -1) {
  content = content.substring(0, realBtnStart) + content.substring(realBtnEnd);
}

content = content.replace(/\{recruiterMode \? 'Talent Intelligence' : '2026 Narrative Cluster'\}/g, "'2026 Narrative Cluster'");
content = content.replace(/\{recruiterMode \? 'Talent Flow' : 'Market Trajectory'\}/g, "'Market Trajectory'");

const trajBlockStart = `{recruiterMode ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">`;
const trajBlockElse = `) : (
                  <TrajectoryChart data={marketHistory} />
                )}`;
const trajIdx1 = content.indexOf(trajBlockStart);
const trajIdx2 = content.indexOf(trajBlockElse, trajIdx1) + trajBlockElse.length;
if (trajIdx1 !== -1) {
    content = content.substring(0, trajIdx1) + `<TrajectoryChart data={marketHistory} />` + content.substring(trajIdx2);
}

content = content.replace(/\{recruiterMode \? 'Trending Hot Skills' : 'Viral Signals'\}/g, "'Viral Signals'");
content = content.replace(/className="text-slate-9000"/g, 'className="text-slate-900"');

const heatStart = `{recruiterMode ? (
                    <div className="flex flex-wrap gap-2">`;
const heatElse = `) : (
                    <Heatmap trendingTopics={trendingTopics} />
                  )}`;
const heatIdx1 = content.indexOf(heatStart);
const heatIdx2 = content.indexOf(heatElse, heatIdx1) + heatElse.length;
if (heatIdx1 !== -1) {
    content = content.substring(0, heatIdx1) + `<Heatmap trendingTopics={trendingTopics} />` + content.substring(heatIdx2);
}

content = content.replace(/\{recruiterMode \? 'AI Transformation Phase 2' : 'Geopolitical Stress'\}/g, "'Geopolitical Stress'");

const sectStart = `{recruiterMode ? (
                <>
                  <div className="reveal-up p-8 liquid-glass bg-white text-slate-900 border-none col-span-2">`;
const sectElse = `) : (
                <div className="reveal-up p-8 liquid-glass bg-white text-slate-900 border-none col-span-2">`;
const sectIdx1 = content.indexOf(sectStart);
const sectIdx2 = content.indexOf(sectElse, sectIdx1) + sectElse.length;
if (sectIdx1 !== -1) {
    content = content.substring(0, sectIdx1) + `<div className="reveal-up p-8 liquid-glass bg-white text-slate-900 border-none col-span-2">` + content.substring(sectIdx2);
}

// Remove the closing `</>` and `)}` from that block:
// The else block ends with:
//                   </div>
//                 </div>
//               )}
// Wait, the else block ends with:
//                   </div>
//                 </div>
//               )}
// But we just removed the `{recruiterMode ? ( ... ) : (` part, so we need to remove the trailing `)}` that closes it.
// Let's find `)}` right before `{!recruiterMode && view === 'dashboard' && (`

content = content.replace(/\{\!recruiterMode && view === 'dashboard' && \(/g, "{view === 'dashboard' && (");

// Remove recruiterMode prop
content = content.replace(/recruiterMode=\{recruiterMode\} /g, '');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx fixed');
