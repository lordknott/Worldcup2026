import { useState, useCallback } from "react";

const INITIAL_FIXTURES = [
  { id:1,  date:"Fri 12 Jun", dateOrder:1,  time:"5:00 AM",  teamA:"Mexico",        teamB:"South Africa",   group:"A", venue:"Estadio Azteca",        env:"🏔 ALT",  prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:2,  date:"Fri 12 Jun", dateOrder:1,  time:"12:00 PM", teamA:"South Korea",   teamB:"Czech Republic", group:"A", venue:"Estadio Akron",         env:"🏔 ALT",  prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:3,  date:"Sat 13 Jun", dateOrder:2,  time:"5:00 AM",  teamA:"Canada",        teamB:"Bosnia & Herz.", group:"B", venue:"BMO Field",              env:"🌤 MILD",  prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:4,  date:"Sat 13 Jun", dateOrder:2,  time:"11:00 AM", teamA:"USA",           teamB:"Paraguay",       group:"D", venue:"SoFi Stadium",           env:"❄ A/C",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:5,  date:"Sun 14 Jun", dateOrder:3,  time:"5:00 AM",  teamA:"Qatar",         teamB:"Switzerland",    group:"B", venue:"Levi's Stadium",         env:"🌤 MILD",  prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:6,  date:"Sun 14 Jun", dateOrder:3,  time:"8:00 AM",  teamA:"Brazil",        teamB:"Morocco",        group:"C", venue:"MetLife Stadium",        env:"🔥 HOT",   prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:7,  date:"Sun 14 Jun", dateOrder:3,  time:"11:00 AM", teamA:"Haiti",         teamB:"Scotland",       group:"C", venue:"Gillette Stadium",       env:"🔥 HOT",   prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:8,  date:"Sun 14 Jun", dateOrder:3,  time:"2:00 PM",  teamA:"Australia",     teamB:"Turkey",         group:"D", venue:"BC Place",               env:"❄ A/C",   prediction:"1-1", ou:"⬇ UNDER 2.5",  conf:"MOD",  result:null },
  { id:9,  date:"Mon 15 Jun", dateOrder:4,  time:"3:00 AM",  teamA:"Germany",       teamB:"Curacao",        group:"E", venue:"NRG Stadium",            env:"❄ A/C",   prediction:"4-0", ou:"⬆ OVER 3.5",   conf:"HIGH", result:null },
  { id:10, date:"Mon 15 Jun", dateOrder:4,  time:"6:00 AM",  teamA:"Netherlands",   teamB:"Japan",          group:"F", venue:"AT&T Stadium",           env:"❄ A/C",   prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:11, date:"Mon 15 Jun", dateOrder:4,  time:"9:00 AM",  teamA:"Ivory Coast",   teamB:"Ecuador",        group:"E", venue:"Lincoln Financial",      env:"🔥 HOT",   prediction:"1-1", ou:"⬇ UNDER 2.5",  conf:"LOW",  result:null },
  { id:12, date:"Mon 15 Jun", dateOrder:4,  time:"12:00 PM", teamA:"Sweden",        teamB:"Tunisia",        group:"F", venue:"Estadio BBVA",           env:"🔥 HOT",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:13, date:"Tue 16 Jun", dateOrder:5,  time:"2:00 AM",  teamA:"Spain",         teamB:"Cape Verde",     group:"H", venue:"Mercedes-Benz Stadium",  env:"❄ A/C",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:14, date:"Tue 16 Jun", dateOrder:5,  time:"5:00 AM",  teamA:"Belgium",       teamB:"Egypt",          group:"G", venue:"Lumen Field",            env:"🌤 MILD",  prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:15, date:"Tue 16 Jun", dateOrder:5,  time:"8:00 AM",  teamA:"Saudi Arabia",  teamB:"Uruguay",        group:"H", venue:"Hard Rock Stadium",      env:"🔥 HOT",   prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:16, date:"Tue 16 Jun", dateOrder:5,  time:"11:00 AM", teamA:"Iran",          teamB:"New Zealand",    group:"G", venue:"SoFi Stadium",           env:"❄ A/C",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:17, date:"Wed 17 Jun", dateOrder:6,  time:"5:00 AM",  teamA:"France",        teamB:"Senegal",        group:"I", venue:"MetLife Stadium",        env:"🔥 HOT",   prediction:"3-1", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:18, date:"Wed 17 Jun", dateOrder:6,  time:"8:00 AM",  teamA:"Iraq",          teamB:"Norway",         group:"I", venue:"Gillette Stadium",       env:"🔥 HOT",   prediction:"0-3", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:19, date:"Wed 17 Jun", dateOrder:6,  time:"11:00 AM", teamA:"Argentina",     teamB:"Algeria",        group:"J", venue:"Arrowhead Stadium",      env:"🔥 HOT",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:20, date:"Wed 17 Jun", dateOrder:6,  time:"2:00 PM",  teamA:"Austria",       teamB:"Jordan",         group:"J", venue:"Levi's Stadium",         env:"🌤 MILD",  prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:21, date:"Thu 18 Jun", dateOrder:7,  time:"3:00 AM",  teamA:"Portugal",      teamB:"DR Congo",       group:"K", venue:"NRG Stadium",            env:"❄ A/C",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:22, date:"Thu 18 Jun", dateOrder:7,  time:"6:00 AM",  teamA:"England",       teamB:"Croatia",        group:"L", venue:"AT&T Stadium",           env:"❄ A/C",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:23, date:"Thu 18 Jun", dateOrder:7,  time:"9:00 AM",  teamA:"Ghana",         teamB:"Panama",         group:"L", venue:"BMO Field",              env:"🌤 MILD",  prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:24, date:"Thu 18 Jun", dateOrder:7,  time:"12:00 PM", teamA:"Uzbekistan",    teamB:"Colombia",       group:"K", venue:"Estadio Azteca",         env:"🏔 ALT",  prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:25, date:"Fri 19 Jun", dateOrder:8,  time:"2:00 AM",  teamA:"Czech Republic",teamB:"South Africa",   group:"A", venue:"Mercedes-Benz Stadium",  env:"❄ A/C",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:26, date:"Fri 19 Jun", dateOrder:8,  time:"5:00 AM",  teamA:"Switzerland",   teamB:"Bosnia & Herz.", group:"B", venue:"SoFi Stadium",           env:"❄ A/C",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:27, date:"Fri 19 Jun", dateOrder:8,  time:"8:00 AM",  teamA:"Canada",        teamB:"Qatar",          group:"B", venue:"BC Place",               env:"❄ A/C",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:28, date:"Fri 19 Jun", dateOrder:8,  time:"11:00 AM", teamA:"Mexico",        teamB:"South Korea",    group:"A", venue:"Estadio Akron",          env:"🏔 ALT",  prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:29, date:"Sat 20 Jun", dateOrder:9,  time:"5:00 AM",  teamA:"USA",           teamB:"Australia",      group:"D", venue:"Lumen Field",            env:"🌤 MILD",  prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:30, date:"Sat 20 Jun", dateOrder:9,  time:"8:00 AM",  teamA:"Scotland",      teamB:"Morocco",        group:"C", venue:"Gillette Stadium",       env:"🔥 HOT",   prediction:"0-1", ou:"⬇ UNDER 1.5",  conf:"MOD",  result:null },
  { id:31, date:"Sat 20 Jun", dateOrder:9,  time:"11:00 AM", teamA:"Brazil",        teamB:"Haiti",          group:"C", venue:"Lincoln Financial",      env:"🔥 HOT",   prediction:"4-0", ou:"⬆ OVER 3.5",   conf:"HIGH", result:null },
  { id:32, date:"Sat 20 Jun", dateOrder:9,  time:"2:00 PM",  teamA:"Turkey",        teamB:"Paraguay",       group:"D", venue:"Levi's Stadium",         env:"🌤 MILD",  prediction:"1-1", ou:"⬇ UNDER 2.5",  conf:"LOW",  result:null },
  { id:33, date:"Sun 21 Jun", dateOrder:10, time:"3:00 AM",  teamA:"Netherlands",   teamB:"Sweden",         group:"F", venue:"NRG Stadium",            env:"❄ A/C",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:34, date:"Sun 21 Jun", dateOrder:10, time:"6:00 AM",  teamA:"Germany",       teamB:"Ivory Coast",    group:"E", venue:"BMO Field",              env:"🌤 MILD",  prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:35, date:"Sun 21 Jun", dateOrder:10, time:"9:00 AM",  teamA:"Ecuador",       teamB:"Curacao",        group:"E", venue:"Arrowhead Stadium",      env:"🔥 HOT",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:36, date:"Sun 21 Jun", dateOrder:10, time:"12:00 PM", teamA:"Tunisia",       teamB:"Japan",          group:"F", venue:"Estadio BBVA",           env:"🔥 HOT",   prediction:"0-1", ou:"⬇ UNDER 1.5",  conf:"MOD",  result:null },
  { id:37, date:"Mon 22 Jun", dateOrder:11, time:"2:00 AM",  teamA:"Spain",         teamB:"Saudi Arabia",   group:"H", venue:"Mercedes-Benz Stadium",  env:"❄ A/C",   prediction:"4-0", ou:"⬆ OVER 3.5",   conf:"HIGH", result:null },
  { id:38, date:"Mon 22 Jun", dateOrder:11, time:"5:00 AM",  teamA:"Belgium",       teamB:"Iran",           group:"G", venue:"SoFi Stadium",           env:"❄ A/C",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:39, date:"Mon 22 Jun", dateOrder:11, time:"8:00 AM",  teamA:"Uruguay",       teamB:"Cape Verde",     group:"H", venue:"Hard Rock Stadium",      env:"🔥 HOT",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:40, date:"Mon 22 Jun", dateOrder:11, time:"11:00 AM", teamA:"New Zealand",   teamB:"Egypt",          group:"G", venue:"BC Place",               env:"❄ A/C",   prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:41, date:"Tue 23 Jun", dateOrder:12, time:"3:00 AM",  teamA:"Argentina",     teamB:"Austria",        group:"J", venue:"AT&T Stadium",           env:"❄ A/C",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:42, date:"Tue 23 Jun", dateOrder:12, time:"7:00 AM",  teamA:"France",        teamB:"Iraq",           group:"I", venue:"Lincoln Financial",      env:"🔥 HOT",   prediction:"4-0", ou:"⬆ OVER 3.5",   conf:"HIGH", result:null },
  { id:43, date:"Tue 23 Jun", dateOrder:12, time:"10:00 AM", teamA:"Norway",        teamB:"Senegal",        group:"I", venue:"MetLife Stadium",        env:"🔥 HOT",   prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:44, date:"Tue 23 Jun", dateOrder:12, time:"1:00 PM",  teamA:"Jordan",        teamB:"Algeria",        group:"J", venue:"Levi's Stadium",         env:"🌤 MILD",  prediction:"0-1", ou:"⬇ UNDER 1.5",  conf:"MOD",  result:null },
  { id:45, date:"Wed 24 Jun", dateOrder:13, time:"3:00 AM",  teamA:"Portugal",      teamB:"Uzbekistan",     group:"K", venue:"NRG Stadium",            env:"❄ A/C",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:46, date:"Wed 24 Jun", dateOrder:13, time:"6:00 AM",  teamA:"England",       teamB:"Ghana",          group:"L", venue:"Gillette Stadium",       env:"🔥 HOT",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:47, date:"Wed 24 Jun", dateOrder:13, time:"9:00 AM",  teamA:"Panama",        teamB:"Croatia",        group:"L", venue:"BMO Field",              env:"🌤 MILD",  prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:48, date:"Wed 24 Jun", dateOrder:13, time:"12:00 PM", teamA:"Colombia",      teamB:"DR Congo",       group:"K", venue:"Estadio Akron",          env:"🏔 ALT",  prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:49, date:"Thu 25 Jun", dateOrder:14, time:"5:00 AM",  teamA:"Switzerland",   teamB:"Canada",         group:"B", venue:"BC Place",               env:"❄ A/C",   prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:50, date:"Thu 25 Jun", dateOrder:14, time:"5:00 AM",  teamA:"Bosnia & Herz.",teamB:"Qatar",          group:"B", venue:"Lumen Field",            env:"🌤 MILD",  prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:51, date:"Thu 25 Jun", dateOrder:14, time:"8:00 AM",  teamA:"Scotland",      teamB:"Brazil",         group:"C", venue:"Hard Rock Stadium",      env:"🔥 HOT",   prediction:"0-3", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:52, date:"Thu 25 Jun", dateOrder:14, time:"8:00 AM",  teamA:"Morocco",       teamB:"Haiti",          group:"C", venue:"Mercedes-Benz Stadium",  env:"❄ A/C",   prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:53, date:"Thu 25 Jun", dateOrder:14, time:"11:00 AM", teamA:"Czech Republic",teamB:"Mexico",         group:"A", venue:"Estadio Azteca",         env:"🏔 ALT",  prediction:"1-2", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:54, date:"Thu 25 Jun", dateOrder:14, time:"11:00 AM", teamA:"South Africa",  teamB:"South Korea",    group:"A", venue:"Estadio BBVA",           env:"🔥 HOT",   prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"MOD",  result:null },
  { id:55, date:"Fri 26 Jun", dateOrder:15, time:"6:00 AM",  teamA:"Curacao",       teamB:"Ivory Coast",    group:"E", venue:"Lincoln Financial",      env:"🔥 HOT",   prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:56, date:"Fri 26 Jun", dateOrder:15, time:"6:00 AM",  teamA:"Ecuador",       teamB:"Germany",        group:"E", venue:"MetLife Stadium",        env:"🔥 HOT",   prediction:"1-2", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:57, date:"Fri 26 Jun", dateOrder:15, time:"9:00 AM",  teamA:"Japan",         teamB:"Sweden",         group:"F", venue:"AT&T Stadium",           env:"❄ A/C",   prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:58, date:"Fri 26 Jun", dateOrder:15, time:"9:00 AM",  teamA:"Tunisia",       teamB:"Netherlands",    group:"F", venue:"Arrowhead Stadium",      env:"🔥 HOT",   prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:59, date:"Fri 26 Jun", dateOrder:15, time:"12:00 PM", teamA:"Turkey",        teamB:"USA",            group:"D", venue:"SoFi Stadium",           env:"❄ A/C",   prediction:"1-1", ou:"⚠ AVOID 2.5",  conf:"LOW",  result:null },
  { id:60, date:"Fri 26 Jun", dateOrder:15, time:"12:00 PM", teamA:"Paraguay",      teamB:"Australia",      group:"D", venue:"Levi's Stadium",         env:"🌤 MILD",  prediction:"0-1", ou:"⬇ UNDER 1.5",  conf:"MOD",  result:null },
  { id:61, date:"Sat 27 Jun", dateOrder:16, time:"5:00 AM",  teamA:"Norway",        teamB:"France",         group:"I", venue:"Gillette Stadium",       env:"🔥 HOT",   prediction:"1-2", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:62, date:"Sat 27 Jun", dateOrder:16, time:"5:00 AM",  teamA:"Senegal",       teamB:"Iraq",           group:"I", venue:"BMO Field",              env:"🌤 MILD",  prediction:"3-0", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:63, date:"Sat 27 Jun", dateOrder:16, time:"10:00 AM", teamA:"Cape Verde",    teamB:"Saudi Arabia",   group:"H", venue:"NRG Stadium",            env:"❄ A/C",   prediction:"1-1", ou:"⚠ AVOID 2.5",  conf:"LOW",  result:null },
  { id:64, date:"Sat 27 Jun", dateOrder:16, time:"10:00 AM", teamA:"Uruguay",       teamB:"Spain",          group:"H", venue:"Estadio Akron",          env:"🏔 ALT",  prediction:"0-2", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:65, date:"Sat 27 Jun", dateOrder:16, time:"1:00 PM",  teamA:"Egypt",         teamB:"Iran",           group:"G", venue:"Lumen Field",            env:"🌤 MILD",  prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:66, date:"Sat 27 Jun", dateOrder:16, time:"1:00 PM",  teamA:"New Zealand",   teamB:"Belgium",        group:"G", venue:"BC Place",               env:"❄ A/C",   prediction:"0-3", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:67, date:"Sun 28 Jun", dateOrder:17, time:"7:00 AM",  teamA:"Panama",        teamB:"England",        group:"L", venue:"MetLife Stadium",        env:"🔥 HOT",   prediction:"0-3", ou:"⬆ OVER 2.5",   conf:"HIGH", result:null },
  { id:68, date:"Sun 28 Jun", dateOrder:17, time:"7:00 AM",  teamA:"Croatia",       teamB:"Ghana",          group:"L", venue:"Lincoln Financial",      env:"🔥 HOT",   prediction:"2-0", ou:"⬇ UNDER 2.5",  conf:"HIGH", result:null },
  { id:69, date:"Sun 28 Jun", dateOrder:17, time:"9:30 AM",  teamA:"Colombia",      teamB:"Portugal",       group:"K", venue:"Hard Rock Stadium",      env:"🔥 HOT",   prediction:"1-2", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:70, date:"Sun 28 Jun", dateOrder:17, time:"9:30 AM",  teamA:"DR Congo",      teamB:"Uzbekistan",     group:"K", venue:"Mercedes-Benz Stadium",  env:"❄ A/C",   prediction:"1-1", ou:"⚠ AVOID 2.5",  conf:"LOW",  result:null },
  { id:71, date:"Sun 28 Jun", dateOrder:17, time:"12:00 PM", teamA:"Algeria",       teamB:"Austria",        group:"J", venue:"Arrowhead Stadium",      env:"🔥 HOT",   prediction:"2-1", ou:"⬆ OVER 2.5",   conf:"MOD",  result:null },
  { id:72, date:"Sun 28 Jun", dateOrder:17, time:"12:00 PM", teamA:"Jordan",        teamB:"Argentina",      group:"J", venue:"AT&T Stadium",           env:"❄ A/C",   prediction:"0-4", ou:"⬆ OVER 3.5",   conf:"HIGH", result:null },
];

const GROUP_COLORS = { A:"#7c3aed",B:"#0369a1",C:"#047857",D:"#b45309",E:"#be123c",F:"#0e7490",G:"#65a30d",H:"#d97706",I:"#6d28d9",J:"#059669",K:"#dc2626",L:"#2563eb" };
const CONF_COLORS  = { HIGH:"#1a6b3c", MOD:"#1565c0", LOW:"#c65911" };

function parseScore(s) {
  if (!s||!s.includes("-")) return null;
  const [a,b]=s.split("-").map(Number);
  return isNaN(a)||isNaN(b)?null:{a,b};
}
function getAccuracy(pred,result) {
  const p=parseScore(pred),r=parseScore(result);
  if (!p||!r) return null;
  if (pred===result) return "exact";
  const po=p.a>p.b?"W":p.a<p.b?"L":"D", ro=r.a>r.b?"W":r.a<r.b?"L":"D";
  return po===ro?"direction":"wrong";
}

export default function App() {
  const [fixtures,setFixtures]=useState(INITIAL_FIXTURES);
  const [editId,setEditId]=useState(null);
  const [inputVal,setInputVal]=useState("");
  const [loading,setLoading]=useState(null);
  const [aiUpdated,setAiUpdated]=useState({});
  const [showGuide,setShowGuide]=useState(false);

  const played  = fixtures.filter(f=>f.result).length;
  const exact   = fixtures.filter(f=>getAccuracy(f.prediction,f.result)==="exact").length;
  const correct = fixtures.filter(f=>getAccuracy(f.prediction,f.result)==="direction").length;
  const scorePct= played>0?Math.round(((exact+correct*0.5)/played)*100):null;

  const dateGroups=[];
  const seen={};
  fixtures.forEach(f=>{
    if (!seen[f.date]){seen[f.date]=true;dateGroups.push({date:f.date,order:f.dateOrder,items:[]});}
    dateGroups.find(d=>d.date===f.date).items.push(f);
  });
  dateGroups.sort((a,b)=>a.order-b.order);

  const submitResult=useCallback(async(id)=>{
    const val=inputVal.trim();
    if (!val.match(/^\d+-\d+$/)) return;
    setFixtures(prev=>prev.map(f=>f.id===id?{...f,result:val}:f));
    setEditId(null);setInputVal("");setLoading(id);
    const done=fixtures.filter(f=>f.result&&f.id!==id).map(f=>`${f.teamA} vs ${f.teamB} (Grp ${f.group}): actual ${f.result}, predicted ${f.prediction}`);
    const thisF=fixtures.find(f=>f.id===id);
    const allResults=[...done,`${thisF.teamA} vs ${thisF.teamB} (Grp ${thisF.group}): actual ${val}, predicted ${thisF.prediction}`];
    const upcoming=fixtures.filter(f=>!f.result&&f.id!==id).slice(0,12).map(f=>`ID:${f.id}|${f.teamA} vs ${f.teamB}|Grp ${f.group}|${f.env}|Pred:${f.prediction}|O/U:${f.ou}`);
    if (!upcoming.length){setLoading(null);return;}
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          messages:[{role:"user",content:`World Cup 2026 prediction engine. Update upcoming predictions based on actual results only where meaningful.\n\nACTUAL RESULTS:\n${allResults.join("\n")}\n\nUPCOMING:\n${upcoming.join("\n")}\n\nRespond ONLY with raw JSON array. Each: {"id":number,"prediction":"X-Y","ou":"string","conf":"HIGH|MOD|LOW","reason":"one sentence"}. Only include changed predictions. If none return [].`}]})});
      const data=await res.json();
      const text=data.content?.map(i=>i.text||"").join("").replace(/```json|```/g,"").trim();
      const updates=JSON.parse(text||"[]");
      if (updates.length>0){
        const ids={};
        setFixtures(prev=>prev.map(f=>{const u=updates.find(x=>x.id===f.id);if(u){ids[f.id]=u.reason||"Updated";return{...f,prediction:u.prediction||f.prediction,ou:u.ou||f.ou,conf:u.conf||f.conf};}return f;}));
        setAiUpdated(prev=>({...prev,...ids}));
      }
    } catch(e){console.error(e);}
    setLoading(null);
  },[fixtures,inputVal]);

  return (
    <div style={{minHeight:"100vh",background:"#0a0e1a",fontFamily:"'Trebuchet MS',sans-serif",color:"#e8eaf0"}}>
      <div style={{background:"linear-gradient(135deg,#0d1b2a,#1a2744,#0d1b2a)",borderBottom:"2px solid #d4af37",padding:"18px 16px 14px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:22,fontWeight:700,color:"#d4af37",letterSpacing:2,textTransform:"uppercase"}}>⚽ World Cup 2026</div>
              <div style={{fontSize:13,color:"#d4af37",marginTop:2,fontWeight:600,letterSpacing:1}}>by William Knott</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
                {[{l:"Played",v:played,c:"#d4af37"},{l:"Exact ✓",v:exact,c:"#22c55e"},{l:"Direction",v:correct,c:"#60a5fa"},scorePct!==null?{l:"Score %",v:scorePct+"%",c:"#f59e0b"}:null].filter(Boolean).map(s=>(
                  <div key={s.l} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"5px 10px",textAlign:"center"}}>
                    <div style={{fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div>
                    <div style={{fontSize:9,color:"#8899aa",textTransform:"uppercase",letterSpacing:1}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:"#8899aa",letterSpacing:1}}>Built by William Knott</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:700,margin:"0 auto",padding:"12px 12px 4px"}}>
        <div style={{background:"rgba(212,175,55,0.07)",border:"1px solid rgba(212,175,55,0.25)",borderRadius:10,padding:"10px 14px",marginBottom:10,cursor:"pointer"}} onClick={()=>setShowGuide(g=>!g)}>
          <div style={{fontWeight:700,fontSize:13,color:"#d4af37",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span>ℹ️ HOW TO USE THIS TRACKER</span>
            <span style={{fontSize:11,color:"#8899aa"}}>{showGuide?"▲ hide":"▼ show"}</span>
          </div>
          {showGuide&&(
            <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:11}}>
              {[
                {badge:<div style={{background:"rgba(255,255,255,0.1)",borderRadius:6,padding:"3px 10px",fontWeight:700,fontSize:14,color:"#e8eaf0",minWidth:46,textAlign:"center"}}>2-0</div>,title:"PRED — My Score Prediction",desc:"My predicted final score (Team A – Team B), based on form, injuries, venue and altitude research."},
                {badge:<div style={{background:"rgba(212,175,55,0.15)",border:"1px dashed rgba(212,175,55,0.4)",color:"#d4af37",borderRadius:6,padding:"4px 9px",fontSize:11,fontWeight:600}}>+ Result</div>,title:"+ Result — Enter the Actual Score",desc:"Once played, tap this and type the real score e.g. 2-1 then press Enter. Tap the score again to correct it. Card turns green (exact), blue (right direction) or red (wrong)."},
                {badge:<div style={{display:"flex",gap:4}}><div style={{background:"rgba(26,107,60,0.4)",color:"#4ade80",borderRadius:5,padding:"2px 6px",fontSize:10,fontWeight:700}}>⬆ OVER</div><div style={{background:"rgba(21,101,192,0.4)",color:"#93c5fd",borderRadius:5,padding:"2px 6px",fontSize:10,fontWeight:700}}>⬇ UNDER</div></div>,title:"Over/Under Recommendation",desc:"OVER = more goals than the line. UNDER = fewer goals. The number (e.g. 2.5) is the betting line. ⚠ AVOID = too close to call."},
                {badge:<div style={{display:"flex",gap:4}}><div style={{background:"rgba(26,107,60,0.4)",color:"#4ade80",borderRadius:5,padding:"2px 6px",fontSize:10,fontWeight:700}}>HIGH</div><div style={{background:"rgba(21,101,192,0.4)",color:"#93c5fd",borderRadius:5,padding:"2px 6px",fontSize:10,fontWeight:700}}>MOD</div><div style={{background:"rgba(198,89,17,0.4)",color:"#fb923c",borderRadius:5,padding:"2px 6px",fontSize:10,fontWeight:700}}>LOW</div></div>,title:"Confidence Level",desc:"HIGH = very confident. MOD = fairly confident. LOW = could go either way — be careful."},
                {badge:<div style={{display:"flex",gap:5,fontSize:11,color:"#8899aa"}}><span>🏔 ALT</span><span>🔥 HOT</span><span>❄ A/C</span><span>🌤 MILD</span></div>,title:"Venue Conditions",desc:"ALT = high altitude. HOT = extreme heat/humidity. A/C = air-conditioned. MILD = comfortable. All factored into predictions."},
              ].map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <div style={{flexShrink:0,paddingTop:2}}>{item.badge}</div>
                  <div><div style={{fontSize:12,fontWeight:700,color:"#e8eaf0",marginBottom:2}}>{item.title}</div><div style={{fontSize:11,color:"#8899aa",lineHeight:1.6}}>{item.desc}</div></div>
                </div>
              ))}
              <div style={{padding:"8px 12px",background:"rgba(239,68,68,0.08)",borderRadius:8,border:"1px solid rgba(239,68,68,0.2)",fontSize:11,color:"#fca5a5",lineHeight:1.6}}>
                ⚠️ <strong>Disclaimer:</strong> Personal predictions for entertainment only. Not guaranteed. Bet at your own risk. Please gamble responsibly.
              </div>
            </div>
          )}
        </div>

        {dateGroups.map(dg=>(
          <div key={dg.date} style={{marginBottom:16}}>
            <div style={{background:"linear-gradient(90deg,#d4af37,#b8962e)",borderRadius:8,padding:"7px 14px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontWeight:700,fontSize:14,color:"#0a0e1a",letterSpacing:1}}>{dg.date}</span>
              <span style={{fontSize:11,color:"#0a0e1a",opacity:0.7}}>{dg.items.length} match{dg.items.length!==1?"es":""}</span>
            </div>
            {dg.items.map(f=>{
              const acc=getAccuracy(f.prediction,f.result);
              const isEditing=editId===f.id;
              const isLoading=loading===f.id;
              const wasUpdated=aiUpdated[f.id];
              const borderCol=f.result?(acc==="exact"?"rgba(34,197,94,0.4)":acc==="direction"?"rgba(96,165,250,0.4)":"rgba(239,68,68,0.4)"):wasUpdated?"rgba(251,191,36,0.4)":"rgba(255,255,255,0.08)";
              const bgCol=f.result?(acc==="exact"?"rgba(34,197,94,0.07)":acc==="direction"?"rgba(96,165,250,0.07)":"rgba(239,68,68,0.07)"):"rgba(255,255,255,0.03)";
              return (
                <div key={f.id} style={{background:bgCol,border:`1px solid ${borderCol}`,borderRadius:10,marginBottom:7,padding:"11px 13px",transition:"all 0.3s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                    <div style={{background:GROUP_COLORS[f.group],color:"white",borderRadius:4,padding:"2px 7px",fontSize:11,fontWeight:700,flexShrink:0}}>{f.group}</div>
                    <div style={{color:"#8899aa",fontSize:11,flexShrink:0}}>{f.time}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,flex:1,flexWrap:"wrap"}}>
                      <span style={{fontWeight:700,fontSize:14}}>{f.teamA}</span>
                      <span style={{color:"#445",fontSize:12}}>vs</span>
                      <span style={{fontWeight:700,fontSize:14}}>{f.teamB}</span>
                    </div>
                    <div style={{fontSize:11,color:"#556"}}>{f.env}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap"}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:50,flexShrink:0}}>
                      <div style={{fontSize:9,color:"#667",marginBottom:2}}>PRED</div>
                      <div style={{background:"rgba(255,255,255,0.1)",borderRadius:6,padding:"3px 10px",fontWeight:700,fontSize:15,letterSpacing:1,color:wasUpdated?"#fbbf24":"#e8eaf0"}}>{f.prediction}</div>
                      {wasUpdated&&<div style={{fontSize:8,color:"#fbbf24",marginTop:1}}>✦ UPDATED</div>}
                    </div>
                    <div style={{minWidth:76,flexShrink:0}}>
                      {f.result&&!isEditing?(
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                          <div style={{fontSize:9,color:"#667",marginBottom:2}}>RESULT</div>
                          <div onClick={()=>{setEditId(f.id);setInputVal(f.result);}} title="Tap to edit"
                            style={{borderRadius:6,padding:"3px 10px",fontWeight:700,fontSize:15,letterSpacing:1,cursor:"pointer",borderBottom:"1px dashed rgba(255,255,255,0.3)",
                              background:acc==="exact"?"rgba(34,197,94,0.3)":acc==="direction"?"rgba(96,165,250,0.25)":"rgba(239,68,68,0.25)",
                              color:acc==="exact"?"#4ade80":acc==="direction"?"#93c5fd":"#f87171"}}>{f.result}</div>
                          <div style={{fontSize:8,marginTop:1,color:acc==="exact"?"#4ade80":acc==="direction"?"#93c5fd":"#f87171"}}>
                            {acc==="exact"?"✓ EXACT":acc==="direction"?"↗ CORRECT":"✗ WRONG"}
                          </div>
                        </div>
                      ):isEditing?(
                        <div style={{display:"flex",gap:4}}>
                          <input autoFocus value={inputVal} onChange={e=>setInputVal(e.target.value)}
                            onKeyDown={e=>{if(e.key==="Enter")submitResult(f.id);if(e.key==="Escape"){setEditId(null);setInputVal("");}}}
                            placeholder="2-1" style={{width:50,background:"rgba(255,255,255,0.1)",border:"1px solid #d4af37",borderRadius:6,color:"white",padding:"4px 6px",fontSize:13,fontWeight:700,textAlign:"center"}}/>
                          <button onClick={()=>submitResult(f.id)} style={{background:"#d4af37",color:"#0a0e1a",border:"none",borderRadius:6,padding:"4px 8px",fontWeight:700,cursor:"pointer",fontSize:12}}>✓</button>
                        </div>
                      ):(
                        <button onClick={()=>{setEditId(f.id);setInputVal("");}}
                          style={{background:"rgba(212,175,55,0.15)",border:"1px dashed rgba(212,175,55,0.4)",color:"#d4af37",borderRadius:6,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>+ Result</button>
                      )}
                    </div>
                    <div style={{borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:700,textAlign:"center",
                      background:f.ou.includes("OVER")?"rgba(26,107,60,0.4)":f.ou.includes("UNDER")?"rgba(21,101,192,0.4)":"rgba(109,76,65,0.4)",
                      color:f.ou.includes("OVER")?"#4ade80":f.ou.includes("UNDER")?"#93c5fd":"#d4a574"}}>{f.ou}</div>
                    <div style={{borderRadius:6,padding:"3px 7px",fontSize:10,fontWeight:700,textAlign:"center",
                      background:CONF_COLORS[f.conf]+"44",
                      color:f.conf==="HIGH"?"#4ade80":f.conf==="MOD"?"#93c5fd":"#fb923c"}}>{f.conf}</div>
                    {isLoading&&<div style={{fontSize:11,color:"#fbbf24",animation:"pulse 1s infinite"}}>🤖 Updating…</div>}
                  </div>
                  {wasUpdated&&<div style={{marginTop:5,fontSize:10,color:"#fbbf24",opacity:0.8}}>✦ {wasUpdated}</div>}
                </div>
              );
            })}
          </div>
        ))}

        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"14px 16px",textAlign:"center",marginTop:8}}>
          <div style={{fontSize:14,fontWeight:700,color:"#d4af37",marginBottom:7}}>⚽ Built by William Knott</div>
          <div style={{fontSize:11,color:"#8899aa",lineHeight:1.7,maxWidth:600,margin:"0 auto"}}>
            <span style={{color:"#e8eaf0",fontWeight:600}}>⚠️ DISCLAIMER:</span> These predictions are my own personal opinions and are <span style={{color:"#e8eaf0"}}>not guaranteed to be correct</span>. All scores and over/under recommendations are for <span style={{color:"#e8eaf0"}}>entertainment purposes only</span>. <span style={{color:"#f87171",fontWeight:600}}>If you choose to bet, you do so entirely at your own risk.</span> Please gamble responsibly.
          </div>
          <div style={{marginTop:8,fontSize:11,color:"#445"}}>World Cup 2026</div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} button:hover{opacity:0.85} input:focus{outline:none}`}</style>
    </div>
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
