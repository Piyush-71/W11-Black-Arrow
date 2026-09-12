'use client';

import { useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { useVisible } from '@/lib/animation/useVisible';

const systems=[
  {id:'ice',name:'1.6L V6',sub:'INTERNAL COMBUSTION',x:25,y:26,copy:'Six cylinders. One compact, turbocharged engine. The combustion engine supplies mechanical power to the drivetrain.'},
  {id:'turbo',name:'TURBO',sub:'EXHAUST ENERGY',x:68,y:26,copy:'Exhaust gases drive a turbine connected to the compressor. More air in the cylinders makes more combustion power possible.'},
  {id:'h',name:'MGU-H',sub:'HEAT ENERGY RECOVERY',x:68,y:51,copy:'Connected to the turbo shaft, the MGU-H can recover electrical energy or use electricity to help control turbo speed.'},
  {id:'store',name:'ENERGY STORE',sub:'ELECTRICAL RESERVOIR',x:68,y:80,copy:'The battery stores recovered energy and supplies it when needed. Control electronics coordinate energy use throughout the lap.'},
  {id:'k',name:'MGU-K',sub:'KINETIC ENERGY RECOVERY',x:25,y:64,copy:'Connected to the drivetrain, the MGU-K recovers energy under braking and adds electrical power during acceleration.'},
];

export function Power(){
  const [mode,setMode]=useState<'harvest'|'deploy'>('deploy');
  const [active,setActive]=useState(0);
  const {ref,visible}=useVisible();
  return <section id="power" className="power section-pad">
    <ChapterLabel number="05">Power / Two sources. One system.</ChapterLabel>
    <div className="power-heading"><h2 className="display" data-reveal>POWER IS NOTHING<br />WITHOUT <em>CONTROL.</em></h2><p className="eyebrow">MERCEDES-AMG<br />M11 EQ PERFORMANCE</p></div>
    <div className="power-lab"><div className="power-spec" data-reveal><strong>1.6<span>L</span></strong><h3>V6 TURBO<br />HYBRID</h3><p className="body-copy">Energy is too valuable to use only once.</p><div className="mode-toggle" aria-label="Hybrid energy mode"><button aria-pressed={mode==='harvest'} onClick={()=>setMode('harvest')}>↙ HARVEST</button><button aria-pressed={mode==='deploy'} onClick={()=>setMode('deploy')}>↗ DEPLOY</button></div><p className="mode-explanation" aria-live="polite">{mode==='harvest'?'Recover energy from braking and the turbo shaft, returning electricity to the energy store.':'Send stored electrical energy to the MGU-K to support acceleration, and to the MGU-H to control turbo speed.'}</p></div>
      <div className="power-diagram-wrap"><div className={`power-diagram ${mode}`} ref={ref}>
        <div className="power-diagram-title mono">ENERGY PATHWAYS <span>SELECT A COMPONENT</span></div>
        <svg viewBox="0 0 600 440" aria-hidden="true" preserveAspectRatio="none"><path d="M150 114 H408 M150 114 V282 M408 114 V224 M408 224 V352 H300 V282 H150" className="power-static" /><path d="M150 282 H300 V352 H408 V224" className="energy-pulse" style={{animationPlayState:visible?'running':'paused'}} /><path d="M408 114 V224" className="energy-pulse secondary" style={{animationPlayState:visible?'running':'paused'}} /></svg>
        {systems.map((s,i)=><button className={`power-node ${active===i?'active':''}`} key={s.id} onClick={()=>setActive(i)} aria-pressed={active===i} style={{left:`${s.x}%`,top:`${s.y}%`}}><strong>{s.name}</strong><span>{s.sub}</span></button>)}
      </div><div className="power-detail" aria-live="polite"><span className="mono accent">0{active+1} / {systems[active].name}</span><p>{systems[active].copy}</p></div><p className="technical-note">Simplified energy pathways. This is an explanation, not a real-time engine simulation.</p></div>
    </div>
  </section>;
}
