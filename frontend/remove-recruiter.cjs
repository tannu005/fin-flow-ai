const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Imports
content = content.replace(/, RECRUITER_DATA/g, '');

// 2. State
content = content.replace(/  const \[recruiterMode, setRecruiterMode\] = useState\(false\);\n/g, '');
content = content.replace(/recruiterData: RECRUITER_DATA, /g, '');

// 3. Sidebar Button (String replace)
const btnStart = content.indexOf('<div className="p-6 border-t border-slate-200">');
const navEnd = content.indexOf('</nav>');
// Find the button block which is after </nav>
const btnBlockStart = content.indexOf('<div className="p-6 border-t border-slate-200">', navEnd);
const btnBlockEnd = content.indexOf('</aside>', btnBlockStart);
if (btnBlockStart !== -1 && btnBlockEnd !== -1) {
    content = content.substring(0, btnBlockStart) + '\n      ' + content.substring(btnBlockEnd);
}

// 4. Titles
content = content.replace(/\{recruiterMode \? 'Talent Intelligence' : '2026 Narrative Cluster'\}/g, "'2026 Narrative Cluster'");
content = content.replace(/\{recruiterMode \? 'Talent Flow' : 'Market Trajectory'\}/g, "'Market Trajectory'");

// 5. First Ternary (Trajectory Chart)
const trajStart = content.indexOf('{recruiterMode ? (');
const trajElse = content.indexOf(') : (', trajStart);
const trajEnd = content.indexOf(')}', trajElse);
if (trajStart !== -1 && trajElse !== -1 && trajEnd !== -1) {
    // Replace the whole block with the content inside the "else"
    const elseContent = content.substring(trajElse + 5, trajEnd).trim();
    content = content.substring(0, trajStart) + elseContent + content.substring(trajEnd + 2);
}

// 6. Viral Signals Header
content = content.replace(/\{recruiterMode \? 'Trending Hot Skills' : 'Viral Signals'\}/g, "'Viral Signals'");
content = content.replace(/className="text-slate-9000"/g, 'className="text-slate-900"'); // fix typo

// 7. Viral Signals Body Ternary
const viralStart = content.indexOf('{recruiterMode ? (');
const viralElse = content.indexOf(') : (', viralStart);
const viralEnd = content.indexOf(')}', viralElse);
if (viralStart !== -1 && viralElse !== -1 && viralEnd !== -1) {
    const elseContent = content.substring(viralElse + 5, viralEnd).trim();
    content = content.substring(0, viralStart) + elseContent + content.substring(viralEnd + 2);
}

// 8. Geopolitical stress
content = content.replace(/\{recruiterMode \? 'AI Transformation Phase 2' : 'Geopolitical Stress'\}/g, "'Geopolitical Stress'");

// 9. Economy Grid Ternary
const gridStart = content.indexOf('{recruiterMode ? (');
const gridElse = content.indexOf(') : (', gridStart);
const gridEnd = content.indexOf(')}', gridElse);
if (gridStart !== -1 && gridElse !== -1 && gridEnd !== -1) {
    const elseContent = content.substring(gridElse + 5, gridEnd).trim();
    content = content.substring(0, gridStart) + elseContent + content.substring(gridEnd + 2);
}

// 10. Dashboard && view === 'dashboard'
content = content.replace(/\{\!recruiterMode && view === 'dashboard' && \(/g, "{view === 'dashboard' && (");

// 11. SummaryCard prop
content = content.replace(/recruiterMode=\{recruiterMode\} /g, '');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx cleaned');
