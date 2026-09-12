'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChapterLabel } from '@/components/ui/ChapterLabel';
import { races } from '@/data/season';
import { scrollToPosition } from '@/lib/scroll/controller';

gsap.registerPlugin(ScrollTrigger);

export function Season(){
  const [active,setActive]=useState(0);
  const root=useRef<HTMLElement>(null);
  const track=useRef<HTMLDivElement>(null);
  const viewport=useRef<HTMLDivElement>(null);
  const trigger=useRef<ScrollTrigger|null>(null);
  const current=useRef(0);
  useEffect(()=>{
    const mm=gsap.matchMedia();
    mm.add('(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',()=>{
      const tween=gsap.to(track.current,{x:()=>-Math.max(0,(track.current?.scrollWidth??0)-(viewport.current?.clientWidth??0)),ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'+=3000',pin:'.season-pin',scrub:.6,invalidateOnRefresh:true,onUpdate:self=>{const index=Math.round(self.progress*(races.length-1));if(index!==current.current){current.current=index;setActive(index);}}}});
      trigger.current=tween.scrollTrigger??null;
      return ()=>{tween.scrollTrigger?.kill();tween.revert();trigger.current=null;};
    });
    return ()=>mm.revert();
  },[]);
  function select(index:number){
    const next=Math.max(0,Math.min(races.length-1,index));
    current.current=next;setActive(next);
    const t=trigger.current;
    if(t) scrollToPosition(t.start+(t.end-t.start)*(next/(races.length-1)));
    else {
      const node=track.current?.children[next] as HTMLElement|undefined;
      if(node&&viewport.current) viewport.current.scrollTo({left:Math.max(0,node.offsetLeft-viewport.current.clientWidth/2+node.clientWidth/2),behavior:'instant'});
    }
  }
  const race=races[active];
  return <section id="season" className="season" ref={root}><div className="season-pin section-pad">
    <ChapterLabel number="08">Season / Seventeen Sundays</ChapterLabel>
    <div className="season-heading"><h2 className="display">A SEASON<br />FOR THE <em>AGES.</em></h2><div><strong>2020</strong><p className="mono muted">17 RACES / 13 VICTORIES</p></div></div>
    <div className="season-navigation"><p className="mono muted">SCROLL THE JOURNEY · OR SELECT A ROUND</p><div><button onClick={()=>select(active-1)} aria-label="Previous race" disabled={active===0}>←</button><span className="mono">{String(active+1).padStart(2,'0')} / 17</span><button onClick={()=>select(active+1)} aria-label="Next race" disabled={active===16}>→</button><label className="sr-only" htmlFor="race-select">Jump to a race</label><select id="race-select" value={active} onChange={e=>select(Number(e.target.value))}>{races.map((r,i)=><option key={r.name} value={i}>{String(i+1).padStart(2,'0')} / {r.name}</option>)}</select></div></div>
    <div className="season-viewport" ref={viewport}><div className="season-track" ref={track}>{races.map((r,i)=><button className={`race-stop ${active===i?'active':''} ${r.mercedes?'mercedes-win':''}`} key={r.name} onClick={()=>select(i)} onFocus={()=>{if(current.current!==i)select(i);}} aria-label={`Round ${i+1}: ${r.name}`} aria-pressed={active===i}><span className="mono">{r.date} / {String(i+1).padStart(2,'0')}</span><span className="race-name">{r.name}</span><span className="race-line"><i /></span><span className="mono race-winner">{r.mercedes?'◆':'○'} {r.winner}</span></button>)}</div></div>
    <div className="race-spotlight"><div><span className="eyebrow accent">ROUND {String(active+1).padStart(2,'0')} / {race.venue}</span><h3>{race.headline}</h3></div><p className="body-copy">{race.detail}</p><span className="race-result mono">WINNER<br /><strong>{race.winner}</strong></span></div>
    <a className="text-link season-source" href="https://www.formula1.com/en/results/2020/races" target="_blank" rel="noreferrer">OFFICIAL 2020 RACE RESULTS ↗</a>
  </div></section>;
}
