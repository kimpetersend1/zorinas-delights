import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { afterSignatureReveal } from '../src/scripts/preloader.js';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const html = read('index.html');
const bootstrap = html.match(/<script>\s*(\(\(\) => \{[\s\S]*?\}\)\(\);)\s*<\/script>/)[1];
const css = read('src/styles/preloader.css');
const key = 'zorinas.signature-reveal.v1';

function boot({storage = new Map(), reduced = false, blocked = false} = {}) {
  const classes = new Set();
  const doc = new EventTarget();
  doc.documentElement = {classList:{add:(...items)=>items.forEach(x=>classes.add(x)),remove:(...items)=>items.forEach(x=>classes.delete(x)),contains:x=>classes.has(x)}};
  const window = new EventTarget();
  const media = new EventTarget(); media.matches = reduced;
  let timer;
  window.matchMedia = () => media;
  window.setTimeout = (callback, ms) => {timer = {callback, ms}; return 1;};
  window.clearTimeout = () => {timer = undefined;};
  const sessionStorage = {getItem(k){if(blocked)throw Error('blocked');return storage.get(k)??null;},setItem(k,v){storage.set(k,v);}};
  runInNewContext(bootstrap,{document:doc,window,sessionStorage,Event});
  const emit=(type,props={})=>{const event=new Event(type); for(const [name,value] of Object.entries(props)) Object.defineProperty(event,name,{value}); doc.dispatchEvent(event);};
  return {classes,doc,window,media,emit,storage,get timer(){return timer;}};
}
const overlay = {id:'signature-reveal'};

test('plays once per session, separate sessions start independently, refresh skips',()=>{
  const first=boot(); assert.equal(first.storage.get(key),'1'); assert.ok(first.classes.has('signature-active')); assert.ok(first.classes.has('signature-hold'));
  assert.equal(boot({storage:first.storage}).classes.size,0);
  assert.ok(boot().classes.has('signature-active'));
});
test('hero releases at fade start; overlay dismisses at exit end and cancels watchdog',()=>{
  const b=boot(); let calls=0;
  afterSignatureReveal(()=>calls++,b.doc); assert.equal(calls,0);
  b.emit('animationstart',{animationName:'signature-write',target:overlay}); assert.equal(calls,0);
  b.emit('animationstart',{animationName:'signature-exit',target:overlay}); assert.equal(calls,1); assert.ok(b.classes.has('signature-active')); assert.ok(!b.classes.has('signature-hold'));
  b.emit('animationend',{animationName:'signature-exit',target:overlay}); assert.equal(b.classes.size,0); assert.equal(b.timer,undefined); assert.equal(calls,1);
  afterSignatureReveal(()=>calls++,b.doc); assert.equal(calls,2);
});
test('reduced-motion and inaccessible session storage skip the introduction',()=>{
  for(const opt of [{reduced:true},{blocked:true}]) {const b=boot(opt); assert.equal(b.classes.size,0); assert.equal(b.timer,undefined); assert.equal(b.storage.size,0);}
});
test('watchdog releases hero even if animation or main module fails',()=>{
  const b=boot(); let calls=0; afterSignatureReveal(()=>calls++,b.doc);
  assert.equal(b.timer.ms,3000); b.timer.callback(); assert.equal(b.classes.size,0); assert.equal(calls,1);
});
test('Tab, Escape, pagehide and reduced-motion changes dismiss the overlay',()=>{
  for(const k of ['Tab','Escape']){const b=boot(); b.emit('keydown',{key:k}); assert.equal(b.classes.size,0);}
  const a=boot(); a.window.dispatchEvent(new Event('pagehide')); assert.equal(a.classes.size,0);
  const b=boot(); b.media.dispatchEvent(Object.assign(new Event('change'),{matches:true})); assert.equal(b.classes.size,0);
});
test('preserves every approved compound vector subpath; mask-only animation, no new dependency',()=>{
  const original=read('public/branding/logo-primary.svg');
  const paths=(s)=>[...s.matchAll(/<path fill="(#[A-Fa-f0-9]+)" fill-rule="evenodd"(?: mask="[^"]+")? d="([^"]+)"/g)].flatMap(m=>[...m[2].matchAll(/M[^M]+/g)].map(p=>m[1]+p[0].trim())).sort();
  assert.equal(paths(original).length,23); assert.deepEqual(paths(html),paths(original));
  assert.match(css,/signature-exit\s+\.6s\s+2s/); assert.match(css,/animation-play-state: paused/);
  assert.match(html,/id="signature-reveal" class="signature-reveal" hidden aria-hidden="true"/);
  assert.match(read('src/main.js'),/afterSignatureReveal\(initAnimations\)/);
  assert.doesNotMatch(read('branding/index.html'),/signature-reveal|preloader/);
  assert.deepEqual(Object.keys(JSON.parse(read('package.json')).devDependencies),['vite']);
});
