'use client';

import { useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';

const drivers=[
  {number:'44',first:'LEWIS',last:'HAMILTON',country:'UNITED KINGDOM',rank:'01',points:'347',wins:'11',podiums:'14',line:'Instinct. Precision. History.',copy:'Eleven wins in 2020. A record-equalling seventh world title, secured with a masterclass in the rain at Istanbul.'},
  {number:'77',first:'VALTTERI',last:'BOTTAS',country:'FINLAND',rank:'02',points:'223',wins:'2',podiums:'11',line:'Quiet resolve. Relentless speed.',copy:'Victory in the opening round. Another in Sochi. Eleven podiums and second in the championship, helping deliver a seventh consecutive team title.'},
];

export function Drivers(){
  const [active,setActive]=useState(0);
  const driver=drivers[active];
  return <section id="drivers" className="drivers section-pad">
    <ChapterLabel number="07">Drivers / The difference is human</ChapterLabel>
    <div className="section-heading"><h2 className="display" data-reveal>THE MACHINE.<br /><span className="muted">THE MIND.</span></h2><p className="body-copy">Engineering creates the possibility.<br />The driver finds its limit.</p></div>
    <div className="driver-split">{drivers.map((d,i)=><button className={`driver-panel ${active===i?'active':''}`} key={d.number} onClick={()=>setActive(i)} onMouseEnter={()=>{if(matchMedia('(hover: hover)').matches)setActive(i);}} onFocus={()=>setActive(i)} aria-pressed={active===i} aria-label={`Explore ${d.first} ${d.last}`}><span className="driver-country mono"><i className={i===0?'flag-gb':'flag-fi'} />{d.country}</span><span className="driver-number">{d.number}</span><span className="driver-name">{d.first}<br /><strong>{d.last}</strong></span><span className="driver-position mono">2020 CHAMPIONSHIP <span>P{d.rank}</span></span><span className="driver-plus">↗</span></button>)}</div>
    <div className="driver-detail" aria-live="polite"><div><h3>{driver.line}</h3><p className="body-copy">{driver.copy}</p></div><dl><div><dt>POINTS</dt><dd>{driver.points}</dd></div><div><dt>WINS</dt><dd>{driver.wins}</dd></div><div><dt>PODIUMS</dt><dd>{driver.podiums}</dd></div></dl></div>
    <p className="driver-footnote mono">ALSO AT THE WHEEL: GEORGE RUSSELL STOOD IN FOR HAMILTON AT THE SAKHIR GRAND PRIX.</p>
  </section>;
}
