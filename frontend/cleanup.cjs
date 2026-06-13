const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

content = content.replace(/, RECRUITER_DATA/g, '');
content = content.replace(/  const \[recruiterMode, setRecruiterMode\] = useState\(false\);\n/g, '');
content = content.replace(/recruiterData: RECRUITER_DATA, /g, '');

const btnStart = '<div className="p-6 border-t border-slate-200">';
const btnEnd = '</button>\n        </div>';
const btnIdxStart = content.indexOf(btnStart);
const navEndIdx = content.indexOf('</nav>');
const realBtnStart = content.indexOf(btnStart, navEndIdx);
if (realBtnStart !== -1) {
  const realBtnEnd = content.indexOf('</div>', content.indexOf('</button>', realBtnStart)) + 6;
  content = content.substring(0, realBtnStart) + content.substring(realBtnEnd);
}

content = content.replace(/\{recruiterMode \? 'Talent Intelligence' : '2026 Narrative Cluster'\}/g, "'2026 Narrative Cluster'");
content = content.replace(/\{recruiterMode \? 'Talent Flow' : 'Market Trajectory'\}/g, "'Market Trajectory'");

const sectStart = `{recruiterMode ? (
                <>
                  <div className="reveal-up p-8 liquid-glass bg-white text-slate-900 border-none col-span-2">`;
const sectElse = `) : (
                <div className="reveal-up p-8 liquid-glass bg-white text-slate-900 border-none col-span-2">`;
const sectIdx1 = content.indexOf(sectStart);
const sectIdx2 = content.indexOf(sectElse, sectIdx1) + sectElse.length;
if (sectIdx1 !== -1) {
    content = content.substring(0, sectIdx1) + `<div className="reveal-up p-8 liquid-glass bg-white text-slate-900 border-none col-span-2">` + content.substring(sectIdx2);
    // Remove trailing `)}`
    content = content.replace(/\s*\}\)\s*\{\!\s*recruiterMode/g, " {!recruiterMode");
}

content = content.replace(/\{\!recruiterMode && view === 'dashboard' && \(/g, "{view === 'dashboard' && (");
content = content.replace(/recruiterMode=\{recruiterMode\} /g, '');

fs.writeFileSync('src/App.jsx', content);
