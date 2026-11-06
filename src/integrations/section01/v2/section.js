import { F, bz, ARRIVE } from './courbes.js';

// Export propre à la section 01. Aucun état ni nettoyage global du site consommateur.
const mounted = new WeakMap();
let instance = 0;
const DEPART = 22 * F;
const GROUPS = ['fond-carte', 'titre', 'date', 'compteur', 'ligne-relance-facture', 'ligne-tri-support', 'ligne-maj-crm', 'ligne-rapport-semaine', 'ligne-posts-reseaux', 'ajouter'];
const BLUE = [0, .3804, 1];
const RAMP = bz(.5, 0, 1, .75);
const lin = (f, [f0,v0,f1,v1]) => f <= f0 ? v0 : f >= f1 ? v1 : v0+(v1-v0)*(f-f0)/(f1-f0);
const rampUp = (i,n,o) => RAMP(Math.min(Math.max((i+.5-o/100*n)/n,0),1));
const square = (i,n,start) => Math.max(0,Math.min(i+1,n)-Math.max(i,start/100*n));
function wiggle(seed,t) {
 const h = k => { const x=Math.sin(k*127.1+seed*311.7)*43758.5453; return x-Math.floor(x); };
 const k=Math.floor(t),u=t-k,s=u*u*(3-2*u);
 return (h(k)*(1-s)+h(k+1)*s)*2-1;
}

export function mountSection01(root, { gsap, ScrollTrigger, mode = 'scroll' } = {}) {
 if (!root?.matches('[data-va-section01]')) throw new Error('Section 01 : élément racine absent.');
 if (mounted.has(root)) throw new Error('Section 01 déjà montée : appeler destroy avant de remonter.');
 if (!gsap || (mode === 'scroll' && !ScrollTrigger)) throw new Error('Section 01 : GSAP et ScrollTrigger requis en mode scroll.');
 if (!['scroll','manual'].includes(mode)) throw new Error('Mode inconnu.');
 if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
 const original = root.innerHTML;
 const prefix = `va01-${++instance}-`;
 // Préfixe également les références defs, clipPath, mask, use, sans toucher aux noms de groupes.
 const base = original.replace(/\sid="([^"]+)"/g, ` id="${prefix}$1"`)
   .replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`)
   .replace(/href="#([^"]+)"/g, `href="#${prefix}$1"`);
 const media = window.matchMedia('(prefers-reduced-motion: reduce)');
 let ctx, phrase, cards = [], tick, wait = null, watcher, dead = false, renderPhrase;
 // Mémoriser les révélations pendant la vie de cette instance, même après changement de préférence.
 let phraseRevealed = false, cardRevealed = false;
 const clearWait = () => { wait?.kill(); wait = null; };
 function cleanup() {
   clearWait();
   if (tick) gsap.ticker.remove(tick);
   ctx?.revert();
   root.innerHTML = base;
   phrase = null; cards = []; tick = null; watcher = null;
 }
 function setup() {
   cleanup();
   const words = [...root.querySelectorAll('.va01-word')];
   renderPhrase = (time, done = false) => {
     const fin = getComputedStyle(root).color.match(/[\d.]+/g).slice(0,3).map(Number);
     const f = time/F, n = words.length;
     words.forEach((w,i) => {
       const a1=rampUp(i,n,lin(f,[0,-98,30,100])),a2=Math.min(square(i,n,lin(f,[3,0,20,100])),1);
       w.style.transform=a1 ? `translateX(${350/93*a1}em)` : '';
       w.style.opacity=String(1-a1);
       w.style.color=done ? '' : `rgb(${BLUE.map((b,j)=>Math.round(fin[j]+(255*b-fin[j])*a2))})`;
     });
   };
   if (media.matches) { phraseRevealed = true; cardRevealed = true; renderPhrase(36*F,true); return; }
   ctx = gsap.context(() => {
     phrase=gsap.timeline({paused:true,onUpdate:()=>renderPhrase(phrase.time()),onComplete:()=>renderPhrase(phrase.duration(),true)});
     phrase.set({}, {}, 36*F); renderPhrase(0);
     // Même timing et même rebond que v3 et son report Portfolio, sans modifier les sources.
     for (const variant of root.querySelectorAll('.va01-variant')) {
       const phone=variant.dataset.size === 'phone';
       const lines=GROUPS.slice(4,-1).filter(id => variant.querySelector(`[data-va-id="${id}"]`));
       const entries=[['fond-carte',22,40,8],['titre',26,24,6],['date',28,24,6],['compteur',30,24,6],...lines.map((id,i)=>[id,30+i*3,24,6]),['ajouter',30+lines.length*3,24,6]];
       const tl=gsap.timeline({paused:true,defaults:{immediateRender:false}}), springs=[];
       for (const [id,frame,distance,frames] of entries) {
         const el=variant.querySelector(`[data-va-id="${id}"]`);
         if (!el) throw new Error(`Groupe SVG manquant : ${id}`);
         const inner=document.createElementNS('http://www.w3.org/2000/svg','g');
         while(el.firstChild) inner.appendChild(el.firstChild);
         el.appendChild(inner);
         const d=frames*F, at=frame*F-DEPART;
         tl.fromTo(el,{y:distance,autoAlpha:0},{y:0,autoAlpha:1,duration:d,ease:ARRIVE},at);
         springs.push({e:inner,start:at+d,amp:-distance/d*.36*.06});
         gsap.set(el,{y:distance,autoAlpha:0});
       }
       const render=()=>{const t=tl.time(); for(const s of springs){const u=t-s.start,v=u>0&&u<.8?s.amp*Math.sin(1.8*u*2*Math.PI)/Math.exp(5*u):0;s.e.setAttribute('transform',`translate(0 ${v})`);}};
       tl.eventCallback('onUpdate',render); render();
       cards.push({tl,render,phone});
     }
     const blobs=[...root.querySelectorAll('.va01-blob')];
     tick=()=>{const t=gsap.ticker.time,amp=300/1920*root.clientWidth;blobs.forEach((b,i)=>gsap.set(b,{x:wiggle(i+1,t)*amp,y:wiggle(i+11,t)*amp}));};
     if(mode === 'scroll') {
       watcher=ScrollTrigger.create({trigger:root,start:'top bottom',end:'bottom top',onToggle:self=>self.isActive?gsap.ticker.add(tick):gsap.ticker.remove(tick)});
       if(watcher.isActive) gsap.ticker.add(tick);
       if (phraseRevealed) { phrase.progress(1); renderPhrase(phrase.duration(),true); }
       else ScrollTrigger.create({trigger:root.querySelector('.va01-line'),start:'top 70%',once:true,onEnter:()=>{phraseRevealed=true;phrase.play();}});
       const card=root.querySelector('.va01-card');
       if (cardRevealed) cards.forEach(({tl,render})=>{tl.progress(1);render();});
       else ScrollTrigger.create({trigger:card,start:()=>`top+=${card.offsetHeight*(window.matchMedia('(min-width: 640px)').matches?.47:.64)} bottom`,invalidateOnRefresh:true,once:true,
         onEnter:()=>{cardRevealed=true;clearWait();const remaining=phrase.isActive()&&!phrase.reversed()?Math.max(0,DEPART-phrase.time()):0;wait=gsap.delayedCall(remaining,()=>cards.forEach(({tl})=>tl.play()));}});
     }
   },root);
 }
 const apply = fn => { if(!dead && !media.matches) fn(); };
 const api={
   play(){apply(()=>{clearWait();phrase.play();const remaining=Math.max(0,DEPART-phrase.time());wait=gsap.delayedCall(remaining,()=>cards.forEach(({tl})=>tl.play()));});},
   pause(){apply(()=>{clearWait();phrase.pause();cards.forEach(({tl})=>tl.pause());});},
   seek(seconds){apply(()=>{if(!Number.isFinite(seconds))throw new Error('Temps invalide.');clearWait();const t=Math.max(0,Math.min(seconds,51*F));phrase.pause().time(Math.min(t,36*F),false);renderPhrase(phrase.time(),phrase.time()>=phrase.duration());cards.forEach(({tl,render})=>{tl.pause().time(Math.max(0,t-DEPART),false);render();});});},
   reset(){this.seek(0);},
   finish(){this.seek(51*F);},
   setTheme(theme){if(!['light','dark'].includes(theme))throw new Error('Thème inconnu.');if(dead)return;root.dataset.theme=theme;if(phrase)renderPhrase(phrase.time(),phrase.time()>=phrase.duration());},
   destroy(){if(dead)return;dead=true;media.removeEventListener('change',preferenceChanged);cleanup();root.innerHTML=original;mounted.delete(root);}
 };
 function preferenceChanged(){if(!dead)setup();}
 try { setup(); } catch(error){cleanup();root.innerHTML=original;throw error;}
 media.addEventListener('change',preferenceChanged);
 mounted.set(root,api);
 return api;
}
