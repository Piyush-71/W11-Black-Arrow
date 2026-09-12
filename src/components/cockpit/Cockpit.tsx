'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';

const controls=[
  {name:'Gear display',x:51,y:43,copy:'The central display brings gear selection and essential information into the driver’s sightline. Try the gear controls below.',tag:'DRIVER INFORMATION'},
  {name:'DRS',x:69,y:40,copy:'Activates the rear-wing flap when DRS is permitted, reducing aerodynamic drag. Availability depends on the session and race conditions.',tag:'DRAG REDUCTION SYSTEM'},
  {name:'Radio',x:35,y:42,copy:'A direct link to the race engineer. Strategy, tyre information and feedback travel through a single button.',tag:'TEAM COMMUNICATION'},
  {name:'Brake balance',x:36,y:60,copy:'Adjusts the distribution of braking force between the front and rear axles as fuel load, tyres and corner demands change.',tag:'BRAKING CONTROL'},
  {name:'Differential',x:58,y:68,copy:'Changes how the rear wheels work together through different phases of a corner, helping the driver manage rotation and traction.',tag:'CORNERING BALANCE'},
  {name:'Energy management',x:50,y:66,copy:'Lets the driver select how electrical energy is harvested and deployed, working with the car’s control systems and the team’s strategy.',tag:'HYBRID STRATEGY'},
];

export function Cockpit(){
  const [active,setActive]=useState(0);
  const [gear,setGear]=useState(4);
  return <section id="cockpit" className="cockpit section-pad">
    <ChapterLabel number="06">Cockpit / The human interface</ChapterLabel>
    <div className="section-heading"><h2 className="display" data-reveal>ENTER<br />THE <em>COCKPIT.</em></h2><p className="body-copy" data-reveal>A thousand decisions at your fingertips.<br />No room for hesitation.</p></div>
    <div className="cockpit-stage"><div className="cockpit-visual"><Image src="/media/w11/cockpit/driver-view.webp" alt="Detailed carbon-fibre Formula One steering wheel inside the halo" fill sizes="100vw" /><div className="cockpit-screen" aria-hidden="true"><span className="screen-label">GEAR</span><strong>{gear}</strong><span className="screen-mode">DEMO / W11</span></div>{controls.map((c,i)=><button className={`hotspot ${active===i?'active':''}`} key={c.name} style={{left:`${c.x}%`,top:`${c.y}%`}} onClick={()=>setActive(i)} aria-label={`Explain ${c.name}`} aria-pressed={active===i}><span>0{i+1}</span></button>)}</div><div className="cockpit-caption mono"><span>THE DRIVER’S WORKSPACE</span><span>ILLUSTRATIVE CONTROL POSITIONS</span></div></div>
    <div className="cockpit-bottom"><div className="cockpit-select">{controls.map((c,i)=><button onClick={()=>setActive(i)} aria-pressed={active===i} key={c.name}><span>0{i+1}</span>{c.name}</button>)}</div><div className="cockpit-detail" aria-live="polite"><p className="eyebrow accent">{controls[active].tag}</p><h3>{controls[active].name}</h3><p className="body-copy">{controls[active].copy}</p></div><div className="gear-control"><span className="mono muted">TRY THE GEAR DISPLAY</span><div><button aria-label="Downshift demo gear" disabled={gear===1} onClick={()=>setGear(g=>Math.max(1,g-1))}>−</button><output aria-live="polite" aria-label="Demo gear">{gear}</output><button aria-label="Upshift demo gear" disabled={gear===8} onClick={()=>setGear(g=>Math.min(8,g+1))}>+</button></div><span className="mono muted">INTERACTIVE DEMO / 8 GEARS</span></div></div>
  </section>;
}
