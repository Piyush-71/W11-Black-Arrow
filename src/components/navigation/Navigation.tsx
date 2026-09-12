'use client';

import { useEffect, useRef, useState } from 'react';
import { chapters } from '@/data/navigation';

export function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) { void audio.current?.suspend(); setSound(false); } };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { document.removeEventListener('visibilitychange', onVisibility); void audio.current?.close(); };
  }, []);

  function close() { dialog.current?.close(); }
  async function toggleSound() {
    if (!audio.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = 0.018;
      gain.connect(ctx.destination);
      [55, 82.4, 110].forEach((frequency) => {
        const oscillator = ctx.createOscillator();
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        oscillator.connect(gain);
        oscillator.start();
      });
      audio.current = ctx;
    }
    if (sound) await audio.current.suspend(); else await audio.current.resume();
    setSound(!sound);
  }

  return <>
    <a className="skip-link" href="#origin">Skip introduction</a>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="W11 — back to beginning">W11<span className="wordmark-slash" /></a>
      <span className="header-edition">A SEASON. A MACHINE. A LEGACY.</span>
      <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="chapter-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>MENU <span>+</span></button>
    </header>
    <dialog id="chapter-menu" ref={dialog} className="chapter-menu" onClose={() => { setOpen(false); menuButton.current?.focus({preventScroll:true}); }} onKeyDown={event=>{
      if(event.key!=='Tab')return;
      const items=dialog.current?.querySelectorAll<HTMLElement>('button, a[href]');
      if(!items?.length)return;
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }} aria-label="Explore the chapters">
      <div className="menu-top"><span className="wordmark">W11</span><button className="menu-toggle" onClick={close}>CLOSE <span>×</span></button></div>
      <div className="menu-layout"><div className="menu-intro"><p className="eyebrow">THE BLACK ARROW / 2020</p><p>Every detail.<br />One purpose.</p><span className="muted">An exploration in nine chapters.</span></div>
        <nav aria-label="Chapters">{chapters.map(([id, title], i) => <a key={id} href={`#${id}`} onClick={close}><span className="mono">0{i + 1}</span>{title}<span className="nav-arrow">↗</span></a>)}</nav>
      </div>
      <p className="menu-disclaimer mono">INDEPENDENT FAN EXPERIENCE — NOT AFFILIATED WITH MERCEDES-BENZ OR FORMULA 1.</p>
    </dialog>
    <button className="sound-toggle" onClick={() => void toggleSound()} aria-pressed={sound} aria-label={`${sound ? 'Mute' : 'Play'} quiet synthesized ambient sound`}>SOUND <span className={sound ? 'sound-dot on' : 'sound-dot'} /> {sound ? 'ON' : 'OFF'}</button>
  </>;
}
