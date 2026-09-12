import Image from 'next/image';
import { ChapterLabel } from '@/components/ui/ChapterLabel';

export function Origin() {
  return <section id="origin" className="origin section-pad">
    <ChapterLabel number="01">Origin / A new standard</ChapterLabel>
    <div className="origin-intro"><h2 className="display" data-reveal>A MACHINE<br />BUILT FOR<br /><span className="muted">A DIFFERENT LEVEL.</span></h2><div className="origin-context" data-reveal><span className="origin-year">2020</span><p className="body-copy">A season unlike any other. A car that made its own rules. The culmination of years of relentless evolution, made visible in black.</p></div></div>
    <div className="stat-line" data-reveal><div><strong>13</strong><span>RACE WINS</span></div><div><strong>15</strong><span>POLE POSITIONS</span></div><div><strong>7<span>×</span></strong><span>CONSECUTIVE<br />CONSTRUCTORS’ CHAMPIONSHIPS</span></div></div>
    <div className="origin-image"><Image src="/media/w11/machine/side-profile.webp" alt="Side profile of a black W11-inspired racing car" fill sizes="100vw" /></div>
    <div className="origin-manifesto"><p className="eyebrow accent">MORE THAN A CHANGE OF COLOUR</p><div><h3 data-reveal>THIS WASN’T JUST<br />ANOTHER FORMULA ONE CAR.</h3><p className="body-copy">Mercedes raced in black as a commitment to diversity and a stand against racism. A new identity, carrying a purpose beyond the stopwatch.</p></div><a className="text-link" href="https://www.mercedesamgf1.com/news/5-questions-about-our-new-2020-f1-livery-answered" target="_blank" rel="noreferrer">THE STORY BEHIND THE LIVERY ↗</a></div>
  </section>;
}
