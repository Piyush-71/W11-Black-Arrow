import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const sizes = [[1440,900],[1920,1080],[1024,768],[768,1024],[430,932],[390,844]];
for(const [width,height] of sizes){
  test(`all chapters render without overflow at ${width}×${height}`,async({page})=>{
    const errors:string[]=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    await page.setViewportSize({width,height});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('/');
    await page.getByRole('heading',{level:1}).waitFor();
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`artifacts/hero-${width}.png`});
    for(const id of ['origin','machine','das','aerodynamics','power','cockpit','drivers','season','legacy']){
      const section=page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id).toBe(true);
      await expect(page.locator('[data-nextjs-dialog]')).toHaveCount(0);
      if(width===1440||width===390){
        await page.evaluate(id=>{const e=document.getElementById(id);if(e)window.scrollTo(0,e.getBoundingClientRect().top+scrollY);},id);
        await page.screenshot({path:`artifacts/${id}-${width}.png`});
      }
    }
    for(const img of await page.locator('img').all()){
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate((i:HTMLImageElement)=>i.complete&&i.naturalWidth>0)).toBe(true);
    }
    expect(errors).toEqual([]);
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
  });
}

test('engineering controls, drivers, race picker and audio work',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.getByRole('button',{name:'Explore Rear wing',exact:true}).click();
  await expect(page.locator('.machine-detail h3')).toHaveText('Rear wing');
  await page.getByRole('button',{name:'PULL ↓ ALIGNED',exact:true}).click();
  await expect(page.locator('#das output')).toHaveText('WHEELS ALIGNED');
  await page.locator('#das-travel').focus();
  await page.keyboard.press('Home');
  await expect(page.locator('#das output')).toHaveText('TOE OUT');
  await page.getByRole('button',{name:'Ⅱ PAUSE FLOW',exact:true}).click();
  await expect(page.locator('.flow-particle').first()).toHaveCSS('animation-play-state','paused');
  await page.getByRole('button',{name:'02 / FLOOR & DIFFUSER ↗',exact:true}).click();
  await expect(page.locator('.aero-explainer h3')).toHaveText('Make the floor work');
  await page.getByRole('button',{name:'↙ HARVEST',exact:true}).click();
  await expect(page.locator('.mode-explanation')).toContainText('Recover energy');
  await page.getByRole('button',{name:'MGU-K KINETIC ENERGY RECOVERY',exact:true}).click();
  await expect(page.locator('.power-detail')).toContainText('drivetrain');
  await page.getByRole('button',{name:'Upshift demo gear',exact:true}).click();
  await expect(page.locator('.gear-control output')).toHaveText('5');
  await page.getByRole('button',{name:'Explore VALTTERI BOTTAS',exact:true}).click();
  await expect(page.locator('.driver-detail')).toContainText('223');
  await page.selectOption('#race-select','13');
  await expect(page.locator('.race-spotlight h3')).toHaveText('A seventh world title.');
  await page.getByRole('button',{name:'Next race',exact:true}).click();
  await expect(page.locator('.race-spotlight')).toContainText('The thirteenth victory.');
  const audio = page.locator('audio');
  expect(await audio.evaluate((element:HTMLAudioElement)=>element.paused)).toBe(true);
  await page.getByRole('button',{name:'Play racing ambience',exact:true}).click();
  await expect(page.getByRole('button',{name:'Mute racing ambience'})).toHaveAttribute('aria-pressed','true');
  await expect.poll(()=>audio.evaluate((element:HTMLAudioElement)=>element.currentTime)).toBeGreaterThan(0);
  expect(await audio.evaluate((element:HTMLAudioElement)=>element.loop)).toBe(true);
  await page.getByRole('button',{name:'Mute racing ambience'}).click();
  await expect(page.getByRole('button',{name:'Play racing ambience'})).toHaveAttribute('aria-pressed','false');
  expect(await audio.evaluate((element:HTMLAudioElement)=>element.paused)).toBe(true);
});

test('menu traps focus, Escape restores focus, links reach chapters',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const menu=page.getByRole('button',{name:'MENU +',exact:true});
  await menu.click();
  const dialog=page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for(let i=0;i<13;i++){
    await page.keyboard.press('Tab');
    expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await dialog.getByRole('link',{name:/Aerodynamics/}).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#aerodynamics$/);
  expect(await page.locator('#aerodynamics').evaluate(el=>Math.abs(el.getBoundingClientRect().top)<150)).toBe(true);
});

test('desktop season scroll, keyboard jumps and reduced-motion cleanup',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  await page.selectOption('#race-select','12');
  await expect(page.locator('.race-spotlight h3')).toHaveText('Seven. Together.');
  await expect.poll(()=>page.locator('.season-pin').evaluate(el=>Math.abs(el.getBoundingClientRect().top))).toBeLessThan(3);
  await page.screenshot({path:'artifacts/season-pinned-desktop.png'});
  await page.getByRole('button',{name:'Next race',exact:true}).click();
  await expect(page.locator('.race-spotlight h3')).toHaveText('A seventh world title.');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  expect(await page.locator('.season-track').evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).isIdentity)).toBe(true);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('no serious accessibility violations',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(results.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});

test('core story is readable without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await context.newPage();
  await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000');
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.locator('#legacy')).toContainText('THE BLACK ARROW.');
  await expect(page.locator('.race-stop')).toHaveCount(17);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await context.close();
});

for(const [width,height] of [[1024,768],[430,932]]){
  test(`animated navigation and timeline at ${width}×${height}`,async({page})=>{
    await page.setViewportSize({width,height});
    await page.goto('/');
    await expect(page.locator('.hero-visual')).toHaveCSS('opacity','1');
    await page.getByRole('button',{name:'MENU +',exact:true}).click();
    await page.getByRole('dialog').getByRole('link',{name:/Aerodynamics/}).click();
    await expect.poll(()=>page.locator('#aerodynamics').evaluate(el=>Math.abs(el.getBoundingClientRect().top-64))).toBeLessThan(30);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.locator('#race-select').selectOption('13');
    await expect(page.locator('.race-spotlight h3')).toHaveText('A seventh world title.');
    await page.screenshot({path:`artifacts/animated-season-${width}.png`});
    if(width>=900){
      const lastLink=page.locator('.season-source');
      expect(await lastLink.evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight)).toBe(true);
    }else await expect(page.locator('.pin-spacer')).toHaveCount(0);
  });
}
