'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { chapters } from '@/data/navigation';
import { registerScroll } from '@/lib/scroll/controller';

gsap.registerPlugin(ScrollTrigger);

export function Experience({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        document.querySelectorAll('.chapter-rail a').forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}` ? 'location' : 'false'));
      }
    }, { rootMargin: '-25% 0px -45% 0px' });
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ duration: 1.05, anchors: true, prevent: (node) => node.tagName === 'DIALOG' });
      const releaseScroll = registerScroll(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      const onDialog = () => document.querySelector('dialog[open]') ? lenis.stop() : lenis.start();
      const dialogObserver = new MutationObserver(onDialog);
      const dialog = document.querySelector('dialog');
      if (dialog) dialogObserver.observe(dialog, { attributes: true, attributeFilter: ['open'] });
      const ctx = gsap.context(() => {
        const entry = gsap.timeline({ defaults: { ease: 'power2.out' } });
        entry.from('.hero-visual', { opacity: 0, scale: 1.055, duration: 1.8 })
          .from('.hero-title', { y: 45, opacity: 0, duration: 1.15 }, 0.25)
          .from('.hero-meta, .hero-bottom', { opacity: 0, y: 12, duration: 0.8 }, 0.8);
        const desktop = window.matchMedia('(min-width: 900px)').matches;
        gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
          .to('.hero-visual', { scale: desktop ? 1.12 : 1.035, xPercent: desktop ? 3 : 0, ease: 'none' }, 0)
          .to('.hero-title', { yPercent: -35, opacity: 0.1, ease: 'none' }, 0)
          .to('.hero-meta, .hero-bottom', { opacity: 0, ease: 'none' }, 0);
        gsap.to(progress.current, { scaleY: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
        gsap.fromTo('.cockpit-visual', { scale:1 }, { scale:desktop?1.075:1.025, ease:'none', scrollTrigger:{trigger:'.cockpit-stage',start:'top bottom',end:'bottom top',scrub:1} });
        gsap.to('.legacy-image', { opacity:0, ease:'none', scrollTrigger:{trigger:'.legacy',start:'top top',end:'bottom bottom',scrub:1.5} });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
          gsap.from(el, { y: 32, opacity: 0, duration: 0.9, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
        });
      }, root);
      return () => { ctx.revert(); dialogObserver.disconnect(); gsap.ticker.remove(raf); releaseScroll(); lenis.destroy(); };
    });
    return () => { mm.revert(); observer.disconnect(); };
  }, []);
  return <div ref={root}>{children}<aside className="chapter-rail" aria-label="Chapter progress"><div className="rail-line"><div ref={progress} /></div>{chapters.map(([id, name], i) => <a href={`#${id}`} aria-label={`Chapter ${i + 1}: ${name}`} key={id}><span>{String(i + 1).padStart(2, '0')}</span><i /></a>)}</aside></div>;
}
