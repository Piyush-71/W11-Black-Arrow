'use client';

import { useState } from 'react';
import { ChapterLabel } from '@/components/ui/ChapterLabel';

export function DAS() {
  const [travel, setTravel] = useState(0);
  const toe = 12 * (1 - travel / 100);
  return <section id="das" className="das section-pad">
    <ChapterLabel number="03">DAS / A different axis of thinking</ChapterLabel>
    <div className="das-header"><h2 className="display" data-reveal>ONE STEERING WHEEL.<br /><em>TWO AXES.</em></h2><p className="body-copy" data-reveal>Innovation doesn’t always turn.<br />Sometimes, it moves in an entirely new direction.</p></div>
    <div className="das-lab">
      <div className="das-type"><span className="outline-type" aria-hidden="true">DAS</span><h3>DUAL<br />AXIS<br />STEERING</h3><p className="body-copy">The steering wheel moves along its column. That movement changes the front wheels’ toe angle, giving the driver another way to manage tyre behaviour.</p><a href="https://www.formula1.com/en/latest/article/das-explained-what-we-know-so-far-about-mercedes-trick-new-steering-system.4vgDQ6cc20xUfhdZGT0ejB" className="text-link" target="_blank" rel="noreferrer">EXPLORE THE ENGINEERING ↗</a></div>
      <div className="das-diagram">
        <div className="diagram-top mono"><span>FRONT AXLE / PLAN VIEW</span><span className="accent">LIVE INPUT</span></div>
        <svg viewBox="0 0 700 480" role="img" aria-label={`Simplified DAS diagram: ${travel>85?'front wheels aligned':'front wheels toe out'}, steering column ${travel}% pulled toward the driver`}>
          <defs><pattern id="das-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" fill="none" stroke="#252b2f" strokeWidth=".6" /></pattern></defs>
          <rect width="700" height="480" fill="url(#das-grid)" />
          <path d="M350 25 V445 M70 196 H630" stroke="#56636b" strokeDasharray="4 8" strokeWidth=".8" />
          <path d="M315 45 L305 235 L285 370 Q350 400 415 370 L395 235 L385 45 Z" fill="#101719" stroke="#5e6a70" strokeWidth="1" />
          <path d="M175 175 L315 270 M175 215 L305 250 M525 175 L385 270 M525 215 L395 250" stroke="#657078" strokeWidth="2" fill="none" />
          <path d="M175 196 H525" stroke="#00a19c" strokeWidth="2" />
          <path d={`M350 196 V${350+travel*.55}`} stroke="#00a19c" strokeWidth="4" />
          {[{x:175,a:-toe},{x:525,a:toe}].map(({x,a})=><g key={x} transform={`rotate(${a} ${x} 196)`}>
            <rect x={x-32} y="127" width="64" height="138" rx="12" fill="#11181b" stroke="#a9b6bb" strokeWidth="2" />
            <rect x={x-21} y="137" width="42" height="118" rx="8" fill="none" stroke="#3b484e" />
            <path d={`M${x} 90 V300`} stroke="#00a19c" strokeWidth="1.5" strokeDasharray="5 5" />
          </g>)}
          <g transform={`translate(0 ${travel*.55})`}><path d="M298 330 Q350 308 402 330 L415 364 Q400 382 383 365 L380 350 H320 L317 365 Q300 382 285 364 Z" fill="#0a0f11" stroke="#c7d1d4" strokeWidth="2" /><rect x="332" y="328" width="36" height="20" rx="2" fill="#00a19c" opacity=".5" /></g>
          <path d="M450 327 V404 M443 397 L450 405 L457 397" stroke="#00a19c" fill="none" />
          <text x="469" y="370" className="svg-label">PULL</text><text x="350" y="465" textAnchor="middle" className="svg-label">DRIVER</text>
          <text x="350" y="22" textAnchor="middle" className="svg-label">DIRECTION OF TRAVEL ↑</text>
        </svg>
        <div className="das-controls"><div className="input-endpoints"><button onClick={()=>setTravel(0)} aria-pressed={travel===0}>↑ PUSH <span>TOE OUT</span></button><button onClick={()=>setTravel(100)} aria-pressed={travel===100}>PULL ↓ <span>ALIGNED</span></button></div><label className="sr-only" htmlFor="das-travel">Steering wheel push to pull position</label><input id="das-travel" type="range" min="0" max="100" value={travel} onChange={e=>setTravel(Number(e.target.value))} aria-valuetext={`${travel}% pulled; ${travel>85?'wheels aligned':'toe out'}`} /><div className="diagram-bottom mono"><span>DRAG TO MOVE THE STEERING COLUMN</span><output aria-live="polite">{travel>85?'WHEELS ALIGNED':travel<15?'TOE OUT':'ALIGNMENT CHANGING'}</output></div></div>
        <p className="technical-note">Conceptual demonstration. Angles and travel exaggerated for clarity.</p>
      </div>
    </div>
  </section>;
}
