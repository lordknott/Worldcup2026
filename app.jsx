import { useState, useEffect, useCallback } from "react";

const INITIAL_FIXTURES = [
  // Group A
  { id:1, date:"Fri 12 Jun", time:"5:00 AM", teamA:"Mexico", teamB:"South Africa", group:"A", venue:"Estadio Azteca", env:"🏔 ALT", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:2, date:"Fri 12 Jun", time:"12:00 PM", teamA:"South Korea", teamB:"Czech Republic", group:"A", venue:"Estadio Akron", env:"🏔 ALT", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:3, date:"Fri 19 Jun", time:"2:00 AM", teamA:"Czech Republic", teamB:"South Africa", group:"A", venue:"Mercedes-Benz Stadium", env:"❄ A/C", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:4, date:"Fri 19 Jun", time:"11:00 AM", teamA:"Mexico", teamB:"South Korea", group:"A", venue:"Estadio Akron", env:"🏔 ALT", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:5, date:"Thu 25 Jun", time:"11:00 AM", teamA:"Czech Republic", teamB:"Mexico", group:"A", venue:"Estadio Azteca", env:"🏔 ALT", prediction:"1-2", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:6, date:"Thu 25 Jun", time:"11:00 AM", teamA:"South Africa", teamB:"South Korea", group:"A", venue:"Estadio BBVA", env:"🔥 HOT", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"MOD", result:null },
  // Group B
  { id:7, date:"Sat 13 Jun", time:"5:00 AM", teamA:"Canada", teamB:"Bosnia & Herz.", group:"B", venue:"BMO Field", env:"🌤 MILD", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:8, date:"Sun 14 Jun", time:"5:00 AM", teamA:"Qatar", teamB:"Switzerland", group:"B", venue:"Levi's Stadium", env:"🌤 MILD", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:9, date:"Fri 19 Jun", time:"5:00 AM", teamA:"Switzerland", teamB:"Bosnia & Herz.", group:"B", venue:"SoFi Stadium", env:"❄ A/C", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:10, date:"Fri 19 Jun", time:"8:00 AM", teamA:"Canada", teamB:"Qatar", group:"B", venue:"BC Place", env:"❄ A/C", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:11, date:"Thu 25 Jun", time:"5:00 AM", teamA:"Switzerland", teamB:"Canada", group:"B", venue:"BC Place", env:"❄ A/C", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:12, date:"Thu 25 Jun", time:"5:00 AM", teamA:"Bosnia & Herz.", teamB:"Qatar", group:"B", venue:"Lumen Field", env:"🌤 MILD", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  // Group C
  { id:13, date:"Sun 14 Jun", time:"8:00 AM", teamA:"Brazil", teamB:"Morocco", group:"C", venue:"MetLife Stadium", env:"🔥 HOT", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:14, date:"Sun 14 Jun", time:"11:00 AM", teamA:"Haiti", teamB:"Scotland", group:"C", venue:"Gillette Stadium", env:"🔥 HOT", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:15, date:"Sat 20 Jun", time:"8:00 AM", teamA:"Scotland", teamB:"Morocco", group:"C", venue:"Gillette Stadium", env:"🔥 HOT", prediction:"0-1", ou:"⬇ UNDER 1.5", conf:"MOD", result:null },
  { id:16, date:"Sat 20 Jun", time:"11:00 AM", teamA:"Brazil", teamB:"Haiti", group:"C", venue:"Lincoln Financial", env:"🔥 HOT", prediction:"4-0", ou:"⬆ OVER 3.5", conf:"HIGH", result:null },
  { id:17, date:"Thu 25 Jun", time:"8:00 AM", teamA:"Scotland", teamB:"Brazil", group:"C", venue:"Hard Rock Stadium", env:"🔥 HOT", prediction:"0-3", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:18, date:"Thu 25 Jun", time:"8:00 AM", teamA:"Morocco", teamB:"Haiti", group:"C", venue:"Mercedes-Benz Stadium", env:"❄ A/C", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  // Group D
  { id:19, date:"Sat 13 Jun", time:"11:00 AM", teamA:"USA", teamB:"Paraguay", group:"D", venue:"SoFi Stadium", env:"❄ A/C", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:20, date:"Sun 14 Jun", time:"2:00 PM", teamA:"Australia", teamB:"Turkey", group:"D", venue:"BC Place", env:"❄ A/C", prediction:"1-1", ou:"⬇ UNDER 2.5", conf:"MOD", result:null },
  { id:21, date:"Sat 20 Jun", time:"5:00 AM", teamA:"USA", teamB:"Australia", group:"D", venue:"Lumen Field", env:"🌤 MILD", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:22, date:"Sat 20 Jun", time:"2:00 PM", teamA:"Turkey", teamB:"Paraguay", group:"D", venue:"Levi's Stadium", env:"🌤 MILD", prediction:"1-1", ou:"⬇ UNDER 2.5", conf:"LOW", result:null },
  { id:23, date:"Fri 26 Jun", time:"12:00 PM", teamA:"Turkey", teamB:"USA", group:"D", venue:"SoFi Stadium", env:"❄ A/C", prediction:"1-1", ou:"⚠ AVOID 2.5", conf:"LOW", result:null },
  { id:24, date:"Fri 26 Jun", time:"12:00 PM", teamA:"Paraguay", teamB:"Australia", group:"D", venue:"Levi's Stadium", env:"🌤 MILD", prediction:"0-1", ou:"⬇ UNDER 1.5", conf:"MOD", result:null },
  // Group E
  { id:25, date:"Mon 15 Jun", time:"3:00 AM", teamA:"Germany", teamB:"Curacao", group:"E", venue:"NRG Stadium", env:"❄ A/C", prediction:"4-0", ou:"⬆ OVER 3.5", conf:"HIGH", result:null },
  { id:26, date:"Mon 15 Jun", time:"9:00 AM", teamA:"Ivory Coast", teamB:"Ecuador", group:"E", venue:"Lincoln Financial", env:"🔥 HOT", prediction:"1-1", ou:"⬇ UNDER 2.5", conf:"LOW", result:null },
  { id:27, date:"Sun 21 Jun", time:"6:00 AM", teamA:"Germany", teamB:"Ivory Coast", group:"E", venue:"BMO Field", env:"🌤 MILD", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:28, date:"Sun 21 Jun", time:"9:00 AM", teamA:"Ecuador", teamB:"Curacao", group:"E", venue:"Arrowhead Stadium", env:"🔥 HOT", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:29, date:"Fri 26 Jun", time:"6:00 AM", teamA:"Curacao", teamB:"Ivory Coast", group:"E", venue:"Lincoln Financial", env:"🔥 HOT", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:30, date:"Fri 26 Jun", time:"6:00 AM", teamA:"Ecuador", teamB:"Germany", group:"E", venue:"MetLife Stadium", env:"🔥 HOT", prediction:"1-2", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  // Group F
  { id:31, date:"Mon 15 Jun", time:"6:00 AM", teamA:"Netherlands", teamB:"Japan", group:"F", venue:"AT&T Stadium", env:"❄ A/C", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:32, date:"Mon 15 Jun", time:"12:00 PM", teamA:"Sweden", teamB:"Tunisia", group:"F", venue:"Estadio BBVA", env:"🔥 HOT", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:33, date:"Sun 21 Jun", time:"3:00 AM", teamA:"Netherlands", teamB:"Sweden", group:"F", venue:"NRG Stadium", env:"❄ A/C", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:34, date:"Sun 21 Jun", time:"12:00 PM", teamA:"Tunisia", teamB:"Japan", group:"F", venue:"Estadio BBVA", env:"🔥 HOT", prediction:"0-1", ou:"⬇ UNDER 1.5", conf:"MOD", result:null },
  { id:35, date:"Fri 26 Jun", time:"9:00 AM", teamA:"Japan", teamB:"Sweden", group:"F", venue:"AT&T Stadium", env:"❄ A/C", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:36, date:"Fri 26 Jun", time:"9:00 AM", teamA:"Tunisia", teamB:"Netherlands", group:"F", venue:"Arrowhead Stadium", env:"🔥 HOT", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  // Group G
  { id:37, date:"Tue 16 Jun", time:"5:00 AM", teamA:"Belgium", teamB:"Egypt", group:"G", venue:"Lumen Field", env:"🌤 MILD", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:38, date:"Tue 16 Jun", time:"11:00 AM", teamA:"Iran", teamB:"New Zealand", group:"G", venue:"SoFi Stadium", env:"❄ A/C", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:39, date:"Mon 22 Jun", time:"5:00 AM", teamA:"Belgium", teamB:"Iran", group:"G", venue:"SoFi Stadium", env:"❄ A/C", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:40, date:"Mon 22 Jun", time:"11:00 AM", teamA:"New Zealand", teamB:"Egypt", group:"G", venue:"BC Place", env:"❄ A/C", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:41, date:"Sat 27 Jun", time:"1:00 PM", teamA:"Egypt", teamB:"Iran", group:"G", venue:"Lumen Field", env:"🌤 MILD", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:42, date:"Sat 27 Jun", time:"1:00 PM", teamA:"New Zealand", teamB:"Belgium", group:"G", venue:"BC Place", env:"❄ A/C", prediction:"0-3", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  // Group H
  { id:43, date:"Tue 16 Jun", time:"2:00 AM", teamA:"Spain", teamB:"Cape Verde", group:"H", venue:"Mercedes-Benz Stadium", env:"❄ A/C", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:44, date:"Tue 16 Jun", time:"8:00 AM", teamA:"Saudi Arabia", teamB:"Uruguay", group:"H", venue:"Hard Rock Stadium", env:"🔥 HOT", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:45, date:"Mon 22 Jun", time:"2:00 AM", teamA:"Spain", teamB:"Saudi Arabia", group:"H", venue:"Mercedes-Benz Stadium", env:"❄ A/C", prediction:"4-0", ou:"⬆ OVER 3.5", conf:"HIGH", result:null },
  { id:46, date:"Mon 22 Jun", time:"8:00 AM", teamA:"Uruguay", teamB:"Cape Verde", group:"H", venue:"Hard Rock Stadium", env:"🔥 HOT", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:47, date:"Sat 27 Jun", time:"10:00 AM", teamA:"Cape Verde", teamB:"Saudi Arabia", group:"H", venue:"NRG Stadium", env:"❄ A/C", prediction:"1-1", ou:"⚠ AVOID 2.5", conf:"LOW", result:null },
  { id:48, date:"Sat 27 Jun", time:"10:00 AM", teamA:"Uruguay", teamB:"Spain", group:"H", venue:"Estadio Akron", env:"🏔 ALT", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  // Group I
  { id:49, date:"Wed 17 Jun", time:"5:00 AM", teamA:"France", teamB:"Senegal", group:"I", venue:"MetLife Stadium", env:"🔥 HOT", prediction:"3-1", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:50, date:"Wed 17 Jun", time:"8:00 AM", teamA:"Iraq", teamB:"Norway", group:"I", venue:"Gillette Stadium", env:"🔥 HOT", prediction:"0-3", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:51, date:"Tue 23 Jun", time:"7:00 AM", teamA:"France", teamB:"Iraq", group:"I", venue:"Lincoln Financial", env:"🔥 HOT", prediction:"4-0", ou:"⬆ OVER 3.5", conf:"HIGH", result:null },
  { id:52, date:"Tue 23 Jun", time:"10:00 AM", teamA:"Norway", teamB:"Senegal", group:"I", venue:"MetLife Stadium", env:"🔥 HOT", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:53, date:"Sat 27 Jun", time:"5:00 AM", teamA:"Norway", teamB:"France", group:"I", venue:"Gillette Stadium", env:"🔥 HOT", prediction:"1-2", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:54, date:"Sat 27 Jun", time:"5:00 AM", teamA:"Senegal", teamB:"Iraq", group:"I", venue:"BMO Field", env:"🌤 MILD", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  // Group J
  { id:55, date:"Wed 17 Jun", time:"11:00 AM", teamA:"Argentina", teamB:"Algeria", group:"J", venue:"Arrowhead Stadium", env:"🔥 HOT", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:56, date:"Wed 17 Jun", time:"2:00 PM", teamA:"Austria", teamB:"Jordan", group:"J", venue:"Levi's Stadium", env:"🌤 MILD", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:57, date:"Tue 23 Jun", time:"3:00 AM", teamA:"Argentina", teamB:"Austria", group:"J", venue:"AT&T Stadium", env:"❄ A/C", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:58, date:"Tue 23 Jun", time:"1:00 PM", teamA:"Jordan", teamB:"Algeria", group:"J", venue:"Levi's Stadium", env:"🌤 MILD", prediction:"0-1", ou:"⬇ UNDER 1.5", conf:"MOD", result:null },
  { id:59, date:"Sun 28 Jun", time:"12:00 PM", teamA:"Algeria", teamB:"Austria", group:"J", venue:"Arrowhead Stadium", env:"🔥 HOT", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:60, date:"Sun 28 Jun", time:"12:00 PM", teamA:"Jordan", teamB:"Argentina", group:"J", venue:"AT&T Stadium", env:"❄ A/C", prediction:"0-4", ou:"⬆ OVER 3.5", conf:"HIGH", result:null },
  // Group K
  { id:61, date:"Thu 18 Jun", time:"3:00 AM", teamA:"Portugal", teamB:"DR Congo", group:"K", venue:"NRG Stadium", env:"❄ A/C", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:62, date:"Thu 18 Jun", time:"12:00 PM", teamA:"Uzbekistan", teamB:"Colombia", group:"K", venue:"Estadio Azteca", env:"🏔 ALT", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:63, date:"Wed 24 Jun", time:"3:00 AM", teamA:"Portugal", teamB:"Uzbekistan", group:"K", venue:"NRG Stadium", env:"❄ A/C", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:64, date:"Wed 24 Jun", time:"12:00 PM", teamA:"Colombia", teamB:"DR Congo", group:"K", venue:"Estadio Akron", env:"🏔 ALT", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:65, date:"Sun 28 Jun", time:"9:30 AM", teamA:"Colombia", teamB:"Portugal", group:"K", venue:"Hard Rock Stadium", env:"🔥 HOT", prediction:"1-2", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:66, date:"Sun 28 Jun", time:"9:30 AM", teamA:"DR Congo", teamB:"Uzbekistan", group:"K", venue:"Mercedes-Benz Stadium", env:"❄ A/C", prediction:"1-1", ou:"⚠ AVOID 2.5", conf:"LOW", result:null },
  // Group L
  { id:67, date:"Thu 18 Jun", time:"6:00 AM", teamA:"England", teamB:"Croatia", group:"L", venue:"AT&T Stadium", env:"❄ A/C", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:68, date:"Thu 18 Jun", time:"9:00 AM", teamA:"Ghana", teamB:"Panama", group:"L", venue:"BMO Field", env:"🌤 MILD", prediction:"2-1", ou:"⬆ OVER 2.5", conf:"MOD", result:null },
  { id:69, date:"Wed 24 Jun", time:"6:00 AM", teamA:"England", teamB:"Ghana", group:"L", venue:"Gillette Stadium", env:"🔥 HOT", prediction:"3-0", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:70, date:"Wed 24 Jun", time:"9:00 AM", teamA:"Panama", teamB:"Croatia", group:"L", venue:"BMO Field", env:"🌤 MILD", prediction:"0-2", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
  { id:71, date:"Sun 28 Jun", time:"7:00 AM", teamA:"Panama", teamB:"England", group:"L", venue:"MetLife Stadium", env:"🔥 HOT", prediction:"0-3", ou:"⬆ OVER 2.5", conf:"HIGH", result:null },
  { id:72, date:"Sun 28 Jun", time:"7:00 AM", teamA:"Croatia", teamB:"Ghana", group:"L", venue:"Lincoln Financial", env:"🔥 HOT", prediction:"2-0", ou:"⬇ UNDER 2.5", conf:"HIGH", result:null },
];

const CONF_COLORS = { HIGH: "#1a6b3c", MOD: "#1565c0", LOW: "#c65911" };
const GROUP_COLORS = { A:"#7c3aed", B:"#0369a1", C:"#047857", D:"#b45309", E:"#be123c", F:"#0e7490", G:"#65a30d", H:"#d97706", I:"#6d28d9", J:"#059669", K:"#dc2626", L:"#2563eb" };

function parseScore(s) {
  if (!s || !s.includes("-")) return null;
  const [a, b] = s.split("-").map(Number);
  if (isNaN(a) || isNaN(b)) return null;
  return { a, b, total: a + b };
}

function predictCorrect(pred, result) {
  if (!result) return null;
  const p = parseScore(pred), r = parseScore(result);
  if (!p || !r) return null;
  const pOutcome = p.a > p.b ? "W" : p.a < p.b ? "L" : "D";
  const rOutcome = r.a > r.b ? "W" : r.a < r.b ? "L" : "D";
  if (pred === result) return "exact";
  if (pOutcome === rOutcome) return "direction";
  return "wrong";
}

export default function App() {
  const [fixtures, setFixtures] = useState(INITIAL_FIXTURES);
  const [activeGroup, setActiveGroup] = useState("ALL");
  const [editId, setEditId] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(null);
  const [aiUpdated, setAiUpdated] = useState({});

  const groups = ["ALL", "A","B","C","D","E","F","G","H","I","J","K","L"];
  const completedCount = fixtures.filter(f => f.result).length;
  const exactCount = fixtures.filter(f => predictCorrect(f.prediction, f.result) === "exact").length;
  const directionCount = fixtures.filter(f => predictCorrect(f.prediction, f.result) === "direction").length;

  const submitResult = useCallback(async (id) => {
    const val = inputVal.trim();
    if (!val.match(/^\d+-\d+$/)) return;

    setFixtures(prev => prev.map(f => f.id === id ? { ...f, result: val } : f));    setEditId(null);
    setInputVal("");
    setLoading(id);

    // Get all completed results to feed as context
    const completedFixtures = fixtures
      .filter(f => f.result && f.id !== id)
      .map(f => `${f.teamA} vs ${f.teamB} (Group ${f.group}): actual ${f.result}, predicted ${f.prediction}`);

    const thisFixture = fixtures.find(f => f.id === id);
    const allResults = [...completedFixtures, `${thisFixture.teamA} vs ${thisFixture.teamB} (Group ${thisFixture.group}): actual ${val}, predicted ${thisFixture.prediction}`];

    // Get upcoming games to re-predict
    const upcoming = fixtures
      .filter(f => !f.result && f.id !== id)
      .slice(0, 12) // batch
      .map(f => `ID:${f.id} | ${f.teamA} vs ${f.teamB} | Group ${f.group} | ${f.env} | Current prediction: ${f.prediction} | O/U: ${f.ou}`);

    if (upcoming.length === 0) { setLoading(null); return; }

    const prompt = `You are a World Cup 2026 prediction engine. Based on the actual results so far, update score predictions for upcoming matches.

ACTUAL RESULTS SO FAR:
${allResults.join("\n")}

UPCOMING MATCHES TO RE-PREDICT (only change predictions if actual results give you meaningful new information about team form, injuries revealed, or group dynamics):
${upcoming.join("\n")}

Respond ONLY with a JSON array. Each object: {"id": number, "prediction": "X-Y", "ou": "⬆ OVER 2.5" or "⬇ UNDER 2.5" or "⚠ AVOID 2.5", "conf": "HIGH" or "MOD" or "LOW", "reason": "brief 1-sentence reason if changed"}

Only include matches where you are changing the prediction or confidence. If no changes needed, return [].
IMPORTANT: Return raw JSON only, no markdown, no backticks.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(i => i.text || "").join("").trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const updates = JSON.parse(clean || "[]");

      if (updates.length > 0) {
        const updatedIds = {};
        setFixtures(prev => prev.map(f => {
          const upd = updates.find(u => u.id === f.id);
          if (upd) {
            updatedIds[f.id] = upd.reason || "Updated based on results";
            return { ...f, prediction: upd.prediction || f.prediction, ou: upd.ou || f.ou, conf: upd.conf || f.conf };
          }
          return f;
        }));
        setAiUpdated(prev => ({ ...prev, ...updatedIds }));
      }
    } catch (e) {
      console.error("AI update failed", e);
    }
    setLoading(null);
  }, [fixtures, inputVal]);

  const filtered = activeGroup === "ALL" ? fixtures : fixtures.filter(f => f.group === activeGroup);

  const accuracy = completedCount > 0
    ? Math.round(((exactCount + directionCount * 0.5) / completedCount) * 100)
    : null;

  return (
    <div style={{ minHeight:"100vh", background:"#0a0e1a", fontFamily:"'Trebuchet MS', sans-serif", color:"#e8eaf0" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg, #0d1b2a 0%, #1a2744 50%, #0d1b2a 100%)", borderBottom:"2px solid #d4af37", padding:"20px 16px 16px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div>
              <div style={{ fontSize:22, fontWeight:700, color:"#d4af37", letterSpacing:2, textTransform:"uppercase" }}>
                ⚽ World Cup 2026
              </div>
              <div style={{ fontSize:13, color:"#d4af37", marginTop:3, fontWeight:600, letterSpacing:1 }}>by William Knott</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"flex-end" }}>
              {[
                { label:"Played", val:completedCount, color:"#d4af37" },
                { label:"Exact ✓", val:exactCount, color:"#22c55e" },
                { label:"Direction ↗", val:directionCount, color:"#60a5fa" },
                accuracy !== null ? { label:"Score %", val:accuracy+"%", color:"#f59e0b" } : null
              ].filter(Boolean).map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"6px 12px", textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:700, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:10, color:"#8899aa", textTransform:"uppercase", letterSpacing:1 }}>{s.label}</div>
                </div>
              ))}
              </div>
              <div style={{ fontSize:11, color:"#8899aa", letterSpacing:1, textAlign:"right" }}>Built by William Knott</div>
            </div>
          </div>

          {/* Group tabs */}
          <div style={{ display:"flex", gap:6, marginTop:14, flexWrap:"wrap" }}>
            {groups.map(g => (
              <button key={g} onClick={() => setActiveGroup(g)} style={{
                padding:"5px 11px", borderRadius:20, border:"1px solid",
                borderColor: activeGroup === g ? "#d4af37" : "rgba(255,255,255,0.15)",
                background: activeGroup === g ? "#d4af37" : "transparent",
                color: activeGroup === g ? "#0a0e1a" : "#aab",
                fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.2s",
                ...(g !== "ALL" ? { borderLeftColor: GROUP_COLORS[g] } : {})
              }}>
                {g === "ALL" ? "ALL GROUPS" : `GRP ${g}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How to use guide */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"12px 12px 4px" }}>
        <details style={{ background:"rgba(212,175,55,0.07)", border:"1px solid rgba(212,175,55,0.25)", borderRadius:10, padding:"12px 16px", cursor:"pointer" }}>
          <summary style={{ fontWeight:700, fontSize:13, color:"#d4af37", letterSpacing:1, listStyle:"none", display:"flex", alignItems:"center", gap:8 }}>
            <span>ℹ️</span> HOW TO USE THIS TRACKER <span style={{ fontSize:11, color:"#8899aa", fontWeight:400, marginLeft:4 }}>(tap to expand)</span>
          </summary>
          <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:12 }}>

            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:6, padding:"4px 10px", fontWeight:700, fontSize:15, color:"#e8eaf0", flexShrink:0, minWidth:48, textAlign:"center" }}>
                2-0
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"#e8eaf0", marginBottom:2 }}>PRED — My Score Prediction</div>
                <div style={{ fontSize:11, color:"#8899aa", lineHeight:1.6 }}>This is my predicted final score for the match, shown as Team A – Team B. Based on team form, injuries, venue conditions and altitude research.</div>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ background:"rgba(212,175,55,0.15)", border:"1px dashed rgba(212,175,55,0.4)", color:"#d4af37", borderRadius:6, padding:"5px 10px", fontSize:11, fontWeight:600, flexShrink:0, minWidth:72, textAlign:"center" }}>
                + Result
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:"#e8eaf0", marginBottom:2 }}>+ Result — Enter the Actual Score</div>
                <div style={{ fontSize:11, color:"#8899aa", lineHeight:1.6 }}>Once the game is played, tap this and type the real score (e.g. <span style={{color:"#e8eaf0"}}>2-1</span>) then press Enter. The card will turn green (exact), blue (right direction) or red (wrong). You can tap the score again to correct it.</div>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                <div style={{ background:"rgba(26,107,60,0.4)", color:"#4ade80", borderRadius:6, padding:"3px 8px", fontSize:11, fontWeight:700 }}>⬆ OVER 2.5</div>
                <div style={{ background:"rgba(21,101,192,0.4)", color:"#93c5fd", borderRadius:6, padding:"3px 8px", fontSize:11, fontWeight:700 }}>⬇ UNDER 2.5</div>
              </div>
              <div style={{ marginTop:2 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#e8eaf0", marginBottom:2 }}>Over/Under Recommendation</div>
                <div style={{ fontSize:11, color:"#8899aa", lineHeight:1.6 }}>My recommendation on total goals in the match. <span style={{color:"#4ade80"}}>OVER</span> means I expect more goals than the line shown. <span style={{color:"#93c5fd"}}>UNDER</span> means fewer. The number (e.g. 2.5) is the betting line to use. <span style={{color:"#fb923c"}}>⚠ AVOID</span> means the match is too unpredictable to call.</div>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                <div style={{ background:"rgba(26,107,60,0.4)", color:"#4ade80", borderRadius:6, padding:"3px 8px", fontSize:10, fontWeight:700 }}>HIGH</div>
                <div style={{ background:"rgba(21,101,192,0.4)", color:"#93c5fd", borderRadius:6, padding:"3px 8px", fontSize:10, fontWeight:700 }}>MOD</div>
                <div style={{ background:"rgba(198,89,17,0.4)", color:"#fb923c", borderRadius:6, padding:"3px 8px", fontSize:10, fontWeight:700 }}>LOW</div>
              </div>
              <div style={{ marginTop:2 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#e8eaf0", marginBottom:2 }}>Confidence Level</div>
                <div style={{ fontSize:11, color:"#8899aa", lineHeight:1.6 }}><span style={{color:"#4ade80"}}>HIGH</span> = I'm very confident in this prediction. <span style={{color:"#93c5fd"}}>MOD</span> = Fairly confident but some uncertainty. <span style={{color:"#fb923c"}}>LOW</span> = Could go either way — tread carefully.</div>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ display:"flex", gap:6, flexShrink:0, flexWrap:"wrap" }}>
                <span style={{ fontSize:12, color:"#8899aa" }}>🏔 ALT</span>
                <span style={{ fontSize:12, color:"#8899aa" }}>🔥 HOT</span>
                <span style={{ fontSize:12, color:"#8899aa" }}>❄ A/C</span>
                <span style={{ fontSize:12, color:"#8899aa" }}>🌤 MILD</span>
              </div>
              <div style={{ marginTop:2 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#e8eaf0", marginBottom:2 }}>Venue Conditions</div>
                <div style={{ fontSize:11, color:"#8899aa", lineHeight:1.6 }}>🏔 <span style={{color:"#e8eaf0"}}>ALT</span> = High altitude (Mexico City/Guadalajara) — affects fitness. 🔥 <span style={{color:"#e8eaf0"}}>HOT</span> = Open air extreme heat and humidity. ❄ <span style={{color:"#e8eaf0"}}>A/C</span> = Fully air-conditioned stadium. 🌤 <span style={{color:"#e8eaf0"}}>MILD</span> = Comfortable conditions. These all factor into my predictions.</div>
              </div>
            </div>

            <div style={{ marginTop:4, padding:"10px 12px", background:"rgba(239,68,68,0.08)", borderRadius:8, border:"1px solid rgba(239,68,68,0.2)", fontSize:11, color:"#fca5a5", lineHeight:1.6 }}>
              ⚠️ <strong>Reminder:</strong> These are my personal predictions for entertainment only. They are not guaranteed. If you choose to bet, you do so at your own risk. Please gamble responsibly.
            </div>

          </div>
        </details>
      </div>

      {/* Fixtures */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"16px 12px" }}>
        {filtered.map(f => {
          const resultParsed = parseScore(f.result);
          const accuracy = predictCorrect(f.prediction, f.result);
          const isEditing = editId === f.id;
          const isLoading = loading === f.id;
          const wasUpdated = aiUpdated[f.id];

          return (
            <div key={f.id} style={{
              background: f.result
                ? accuracy === "exact" ? "rgba(34,197,94,0.08)" : accuracy === "direction" ? "rgba(96,165,250,0.08)" : "rgba(239,68,68,0.08)"
                : "rgba(255,255,255,0.03)",
              border: "1px solid",
              borderColor: f.result
                ? accuracy === "exact" ? "rgba(34,197,94,0.3)" : accuracy === "direction" ? "rgba(96,165,250,0.3)" : "rgba(239,68,68,0.3)"
                : wasUpdated ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.08)",
              borderRadius:10, marginBottom:8, padding:"12px 14px",
              transition:"all 0.3s"
            }}>
              {/* Row 1: group + date + teams */}
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ background:GROUP_COLORS[f.group], color:"white", borderRadius:4, padding:"2px 7px", fontSize:11, fontWeight:700, minWidth:24, textAlign:"center", flexShrink:0 }}>
                  {f.group}
                </div>
                <div style={{ color:"#8899aa", fontSize:11, flexShrink:0 }}>
                  {f.date} {f.time}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                  <span style={{ fontWeight:700, fontSize:14 }}>{f.teamA}</span>
                  <span style={{ color:"#556", fontSize:12 }}>vs</span>
                  <span style={{ fontWeight:700, fontSize:14 }}>{f.teamB}</span>
                </div>
              </div>

              {/* Row 2: PRED always left, then result, then badges */}
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>

                {/* Prediction — always first/left */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", minWidth:52, flexShrink:0 }}>
                  <div style={{ fontSize:10, color:"#667", marginBottom:2 }}>PRED</div>
                  <div style={{
                    background:"rgba(255,255,255,0.1)", borderRadius:6, padding:"3px 10px",
                    fontWeight:700, fontSize:15, letterSpacing:1,
                    color: wasUpdated ? "#fbbf24" : "#e8eaf0"
                  }}>
                    {f.prediction}
                  </div>
                  {wasUpdated && <div style={{ fontSize:9, color:"#fbbf24", marginTop:2 }}>✦ AI UPDATED</div>}
                </div>

                {/* Result input / display */}
                <div style={{ minWidth:80 }}>
                  {f.result && !isEditing ? (
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                      <div style={{ fontSize:10, color:"#667", marginBottom:2 }}>RESULT</div>
                      <div
                        onClick={() => { setEditId(f.id); setInputVal(f.result); }}
                        title="Click to edit"
                        style={{
                          borderRadius:6, padding:"3px 10px", fontWeight:700, fontSize:15, letterSpacing:1,
                          background: accuracy === "exact" ? "rgba(34,197,94,0.3)" : accuracy === "direction" ? "rgba(96,165,250,0.25)" : "rgba(239,68,68,0.25)",
                          color: accuracy === "exact" ? "#4ade80" : accuracy === "direction" ? "#93c5fd" : "#f87171",
                          cursor:"pointer", borderBottom:"1px dashed rgba(255,255,255,0.3)"
                        }}>
                        {f.result}
                      </div>
                      <div style={{ fontSize:9, marginTop:2, color: accuracy === "exact" ? "#4ade80" : accuracy === "direction" ? "#93c5fd" : "#f87171" }}>
                        {accuracy === "exact" ? "✓ EXACT" : accuracy === "direction" ? "↗ CORRECT DIR." : "✗ WRONG"}
                      </div>
                    </div>
                  ) : isEditing ? (
                    <div style={{ display:"flex", gap:4 }}>
                      <input
                        autoFocus
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") submitResult(f.id); if (e.key === "Escape") { setEditId(null); setInputVal(""); } }}
                        placeholder="2-1"
                        style={{
                          width:52, background:"rgba(255,255,255,0.1)", border:"1px solid #d4af37",
                          borderRadius:6, color:"white", padding:"4px 6px", fontSize:13,
                          fontWeight:700, textAlign:"center"
                        }}
                      />
                      <button onClick={() => submitResult(f.id)} style={{
                        background:"#d4af37", color:"#0a0e1a", border:"none", borderRadius:6,
                        padding:"4px 8px", fontWeight:700, cursor:"pointer", fontSize:12
                      }}>✓</button>
                    </div>
                  ) : (
                    <button onClick={() => { setEditId(f.id); setInputVal(""); }} style={{
                      background:"rgba(212,175,55,0.15)", border:"1px dashed rgba(212,175,55,0.4)",
                      color:"#d4af37", borderRadius:6, padding:"5px 10px", fontSize:11,
                      cursor:"pointer", fontWeight:600, transition:"all 0.2s"
                    }}>
                      + Result
                    </button>
                  )}
                </div>

                {/* O/U */}
                <div style={{
                  borderRadius:6, padding:"3px 8px", fontSize:11, fontWeight:700,
                  background: f.ou.includes("OVER") ? "rgba(26,107,60,0.4)" : f.ou.includes("UNDER") ? "rgba(21,101,192,0.4)" : "rgba(109,76,65,0.4)",
                  color: f.ou.includes("OVER") ? "#4ade80" : f.ou.includes("UNDER") ? "#93c5fd" : "#d4a574",
                  minWidth:90, textAlign:"center"
                }}>
                  {f.ou}
                </div>

                {/* Conf */}
                <div style={{
                  borderRadius:6, padding:"3px 8px", fontSize:10, fontWeight:700,
                  background: CONF_COLORS[f.conf] + "44",
                  color: f.conf === "HIGH" ? "#4ade80" : f.conf === "MOD" ? "#93c5fd" : "#fb923c",
                  minWidth:42, textAlign:"center"
                }}>
                  {f.conf}
                </div>

                {/* Env */}
                <div style={{ fontSize:11, color:"#667" }}>{f.env}</div>

                {/* AI loading spinner */}
                {isLoading && (
                  <div style={{ fontSize:11, color:"#fbbf24", animation:"pulse 1s infinite" }}>
                    🤖 Updating...
                  </div>
                )}
              </div>

              {/* AI update reason */}
              {wasUpdated && (
                <div style={{ marginTop:6, paddingLeft:38, fontSize:11, color:"#fbbf24", opacity:0.8 }}>
                  ✦ {wasUpdated}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px 36px" }}>
        <div style={{
          background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:10, padding:"16px 20px", textAlign:"center"
        }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#d4af37", marginBottom:8, letterSpacing:1 }}>
            ⚽ Built by William Knott
          </div>
          <div style={{ fontSize:12, color:"#8899aa", lineHeight:1.7, maxWidth:700, margin:"0 auto" }}>
            <span style={{ color:"#e8eaf0", fontWeight:600 }}>⚠️ DISCLAIMER:</span> These predictions are my own personal opinions and are <span style={{ color:"#e8eaf0" }}>not guaranteed to be correct</span>. All scores and over/under recommendations are for <span style={{ color:"#e8eaf0" }}>entertainment purposes only</span> and should not be relied upon as betting advice. Predictions are based on publicly available information including team form, injuries, venue conditions and historical data, but football is unpredictable. <span style={{ color:"#f87171", fontWeight:600 }}>If you choose to bet, you do so entirely at your own risk.</span> Please gamble responsibly.
          </div>
          <div style={{ marginTop:12, fontSize:11, color:"#445" }}>
            World Cup 2026
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        button:hover { opacity: 0.85; }
        input:focus { outline: none; }
      `}</style>
      </div>
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);


    
