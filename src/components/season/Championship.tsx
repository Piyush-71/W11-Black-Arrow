import Image from 'next/image';

export function Championship(){
  return <div className="championship">
    <section className="title-moment imola" aria-labelledby="imola-title"><div className="title-moment-inner"><p className="eyebrow" data-reveal>IMOLA, ITALY / 01 NOVEMBER 2020</p><h2 id="imola-title" data-reveal>SEVEN<span>.</span></h2><p className="championship-sub" data-reveal>CONSECUTIVE CONSTRUCTORS’<br />WORLD CHAMPIONSHIPS.</p><div className="championship-years" data-reveal>{[2014,2015,2016,2017,2018,2019,2020].map(y=><span key={y} className={y===2020?'accent':''}><i />{y}</span>)}</div><p className="body-copy" data-reveal>One team. Seven seasons at the summit.<br />A new benchmark in Formula One.</p></div></section>
    <section className="title-moment istanbul" aria-labelledby="istanbul-title"><Image src="/media/w11/hero/black-arrow.webp" alt="" fill sizes="100vw" className="championship-image" /><div className="title-moment-inner"><p className="eyebrow" data-reveal>ISTANBUL, TURKEY / 15 NOVEMBER 2020</p><span className="championship-44" aria-hidden="true" data-reveal>44</span><h2 id="istanbul-title" data-reveal>7× WORLD<br /><span>CHAMPION.</span></h2><p className="championship-sub" data-reveal>LEWIS HAMILTON</p><p className="body-copy" data-reveal>In the rain. Against the odds.<br />A drive that belonged to history.</p></div></section>
  </div>;
}
