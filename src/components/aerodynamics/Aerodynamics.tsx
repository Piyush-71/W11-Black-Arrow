'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { useVisible } from '@/lib/animation/useVisible';

const zones = [
  {title:'Shape the arrival',label:'01 / FRONT WING',copy:'The front wing sets the conditions for everything behind it, generating load while directing air around the exposed front tyres.'},
  {title:'Make the floor work',label:'02 / FLOOR & DIFFUSER',copy:'Flow around the sidepods and along the floor feeds the rear diffuser. The whole car works together to manage pressure and create downforce.'},
  {title:'Finish the conversation',label:'03 / REAR WING',copy:'Rear surfaces balance the car’s aerodynamic load. DRS opens a wing flap to reduce drag when the rules permit.'},
];
const paths = [
  'M-50 280 C100 280 110 270 180 275 S260 350 340 330 S510 295 620 310 S810 355 1060 315',
  'M-50 315 C80 315 90 310 135 305 S170 220 225 222 S290 292 360 290 S480 220 600 217 S785 215 855 183 S960 165 1060 160',
  'M-50 350 C100 350 105 338 155 341 S215 377 285 366 S470 353 665 351 S820 350 860 331 S960 300 1060 290',
  'M-50 370 C135 370 170 373 270 376 S560 381 760 365 S860 345 1060 340',
  'M-50 198 C200 198 235 210 315 202 S415 161 490 155 S570 139 655 165 S815 194 870 163 S960 142 1060 140',
  'M-50 240 C120 240 140 174 215 171 S300 257 380 236 S425 179 525 183 S730 202 820 181 S960 197 1060 180',
];

export function Aerodynamics() {
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const {ref,visible}=useVisible();
  return <section id="aerodynamics" className="aero section-pad">
    <ChapterLabel number="04">Aerodynamics / The invisible advantage</ChapterLabel>
    <h2 className="display" data-reveal>YOU CAN’T SEE AIR.<br /><span className="muted">BUT YOU CAN</span> <em>CONTROL IT.</em></h2>
    <div className="airflow-stage" ref={ref}>
      <Image src="/media/w11/machine/side-profile.webp" alt="Side-profile car beneath a conceptual airflow visualization" fill sizes="100vw" />
      <svg viewBox="0 0 1000 562.5" aria-hidden="true" className="airflow-svg" style={{animationPlayState:visible&&!paused?'running':'paused'}}>
        {paths.map((d,i)=><g key={d} className={active===1?(i>=2&&i<=3?'flow-emphasis':'flow-muted'):active===2?(i>=4?'flow-emphasis':'flow-muted'):(i<2?'flow-emphasis':'flow-muted')}><path d={d} className="flow-track" /><path d={d} className="flow-particle" style={{animationDuration:`${5+i*.7}s`,animationPlayState:visible&&!paused?'running':'paused'}} /></g>)}
      </svg>
      <div className="airflow-top mono"><span>FLOW DIRECTION →</span><button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'▶ RESUME FLOW':'Ⅱ PAUSE FLOW'}</button></div>
      <span className="airflow-caption mono">ILLUSTRATIVE FLOW / NOT CFD DATA</span>
    </div>
    <div className="aero-bottom"><div className="aero-select">{zones.map((z,i)=><button key={z.label} aria-pressed={active===i} onClick={()=>setActive(i)}><span>{z.label}</span><span>↗</span></button>)}</div><div className="aero-explainer" aria-live="polite"><h3>{zones[active].title}</h3><p className="body-copy">{zones[active].copy}</p></div></div>
  </section>;
}
