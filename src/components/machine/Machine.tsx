'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { machineParts } from '@/data/machine';

export function Machine() {
  const [active, setActive] = useState(0);
  const part = machineParts[active];
  return <section id="machine" className="machine section-pad">
    <ChapterLabel number="02">The machine / Every detail matters</ChapterLabel>
    <div className="section-heading"><h2 className="display" data-reveal>NOTHING<br />BY <em>CHANCE.</em></h2><p className="body-copy" data-reveal>Thousands of decisions.<br />One uncompromising whole.<br /><span className="mono">SELECT A POINT TO EXPLORE ↓</span></p></div>
    <div className="machine-stage">
      <div className="machine-visual"><Image src="/media/w11/machine/engineering.webp" alt="Elevated front view of the racing car with seven selectable engineering points" fill sizes="(max-width: 900px) 100vw, 75vw" />
        <div className="machine-dimmer" style={{ background:`radial-gradient(ellipse 22% 28% at ${part.x}% ${part.y}%, transparent, rgba(0,0,0,.52))` }} />
        <svg className="machine-lines" viewBox="0 0 100 56.25" aria-hidden="true"><path key={active} d={`M ${part.x} ${part.y*.5625} L ${Math.min(95,part.x+12)} ${Math.max(3,part.y*.5625-8)} L 97 ${Math.max(3,part.y*.5625-8)}`} /></svg>
        {machineParts.map((p,i) => <button key={p.name} className={`hotspot ${active===i?'active':''}`} style={{left:`${p.x}%`,top:`${p.y}%`}} onClick={()=>setActive(i)} onMouseEnter={()=>{if(matchMedia('(hover: hover)').matches)setActive(i);}} onFocus={()=>setActive(i)} aria-label={`Explore ${p.name}`} aria-pressed={active===i}><span>{String(i+1).padStart(2,'0')}</span></button>)}
        <span className="technical-corner tl" /><span className="technical-corner br" />
      </div>
      <div className="machine-detail" aria-live="polite"><span className="detail-number">0{active+1}</span><p className="eyebrow accent">{part.system}</p><h3>{part.name}</h3><p className="body-copy">{part.copy}</p><span className="mono muted">ILLUSTRATIVE RECONSTRUCTION / NOT TO SCALE</span></div>
    </div>
    <div className="part-selector" aria-label="Select a car component">{machineParts.map((p,i)=><button key={p.name} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{p.name}</button>)}</div>
  </section>;
}
