import Image from 'next/image';

export function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-visual"><Image src="/media/w11/hero/black-arrow.webp" alt="Black and turquoise 2020-style Formula One car revealed by studio rim lighting" fill preload sizes="(max-width: 600px) 185vw, 100vw" className="hero-photo" /></div>
    <div className="hero-shade" />
    <div className="hero-meta"><span>MERCEDES-AMG PETRONAS<br />FORMULA ONE TEAM</span><span>F1 W11<br />EQ PERFORMANCE</span></div>
    <h1 className="hero-title" id="hero-title"><span className="hero-the">THE BLACK ARROW</span><span className="hero-w11">W11<span className="title-period">.</span></span></h1>
    <div className="hero-year mono"><span>2020</span><span className="vertical-line" /><span>CHAMPIONSHIP / 07</span></div>
    <div className="hero-bottom"><a href="#origin" className="scroll-cue"><span className="scroll-arrow">↓</span><span>SCROLL TO<br />EXPLORE</span></a><p>ENGINEERED<br /><span>TO DOMINATE.</span></p><span className="hero-index mono">01 — 09<br /><span className="muted">THE DEFINING MACHINE</span></span></div>
    <div className="hero-footer-line" />
  </section>;
}
