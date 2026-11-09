/* Inti aplikasi: helper, state, router, audio, modal, toast, efek. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const emo = (...a) => PK.emo(...a);
  PK.emo = () => ''; // diganti sprites-core.js (ilustrasi SVG buatan sendiri)
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  Object.assign(PK, { $, h, shuffle, wait });

  /* ---------- State (localStorage aman) ---------- */
  const KEY = 'pk_state';
  const def = { nama: '', done: [], tokenAt: 0, evaluasi: null, musik: true, stars: {} };
  PK.state = { ...def };
  try { Object.assign(PK.state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* tanpa penyimpanan */ }
  PK.save = () => { try { localStorage.setItem(KEY, JSON.stringify(PK.state)); } catch (e) { /* abaikan */ } };
  PK.reset = () => { PK.state = { ...def, nama: PK.state.nama, musik: PK.state.musik }; PK.save(); };
  PK.unlocked = () => Math.min(PK.state.done.length + 1, PK.data.pos.length); // pos terbuka terakhir
  PK.allDone = () => PK.state.done.length >= PK.data.pos.length;
  PK.complete = (id) => { if (!PK.state.done.includes(id)) { PK.state.done.push(id); PK.state.done.sort((a, b) => a - b); PK.save(); return true; } return false; };

  /* ---------- Audio ---------- */
  const musik = $('#musik'); musik.volume = 0.3;
  let ctx;
  const tone = (f, t0, d, type = 'sine', v = 0.15) => {
    const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.value = f; o.connect(g); g.connect(ctx.destination);
    const t = ctx.currentTime + t0; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + d); o.start(t); o.stop(t + d);
  };
  const SFX = { ok: [[660, 0, .12], [880, .1, .2]], bad: [[220, 0, .18, 'sawtooth'], [165, .12, .25, 'sawtooth']], win: [[523, 0, .15], [659, .13, .15], [784, .26, .15], [1047, .4, .4]],
    pop: [[740, 0, .08, 'triangle']], unlock: [[400, 0, .1], [600, .1, .1], [800, .2, .1], [1200, .3, .35]], step: [[300, 0, .05, 'triangle', .08]] };
  PK.sfx = (n) => {
    if (!PK.state.musik) return;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); (SFX[n] || []).forEach((s) => tone(...s)); } catch (e) { /* abaikan */ }
  };
  PK.musik = (on) => { musik.play().catch(() => {}); if (!on) musik.pause(); };
  PK.duck = (on) => { musik.volume = on ? 0.06 : 0.3; };
  const syncMusik = () => { $('#btnMusik').innerHTML = PK.art(PK.state.musik ? 'suara' : 'senyap'); $('#btnMusik').setAttribute('aria-pressed', !PK.state.musik); $('#btnHome').innerHTML = PK.art('beranda'); $('#hudStar').innerHTML = PK.art('bintang', 'emo') + ' ' + PK.totalStars(); };
  $('#btnMusik').onclick = () => { PK.state.musik = !PK.state.musik; PK.save(); syncMusik(); PK.state.musik ? musik.play().catch(() => {}) : musik.pause(); };
  $('#btnHome').onclick = () => PK.go('menu');

  /* ---------- Router ---------- */
  let cleanup = null, current = null;
  PK.go = (name, params = {}) => {
    if (cleanup) { try { cleanup(); } catch (e) { /* abaikan */ } cleanup = null; }
    $('#overlay').innerHTML = '';
    const el = h('<section class="scene"></section>'); $('#scene').replaceChildren(el);
    current = name; $('#hud').classList.toggle('on', name !== 'cover' && name !== 'intro'); syncMusik();
    try { cleanup = PK.scenes[name](el, params) || null; } catch (e) { console.error(e); el.innerHTML = `<div class="p-8 text-cream">Terjadi kesalahan memuat halaman. <button class="btn btn-sm" onclick="PK.go('menu')">Ke menu</button></div>`; }
  };
  PK.current = () => current;

  /* ---------- Modal, toast, efek ---------- */
  PK.modal = (html, actions = [{ label: 'Oke', cls: '' }]) => new Promise((res) => {
    const bg = h(`<div class="modal-bg" role="dialog" aria-modal="true"><div class="modal paper">${html}<div class="flex gap-3 justify-center flex-wrap mt-4"></div></div></div>`);
    actions.forEach((a, i) => { const b = h(`<button class="btn ${a.cls || ''}">${a.label}</button>`); b.onclick = () => { bg.remove(); res(i); }; $('.flex', bg).append(b); });
    $('#overlay').append(bg); const f = $('button', bg); f && f.focus();
  });
  PK.toast = (text, kind = 'wood') => {
    const t = h(`<div class="toast ${kind === 'bad' ? 'paper' : 'wood'}" role="status">${text}</div>`); $('#overlay').append(t); setTimeout(() => t.remove(), 2400);
  };
  PK.confetti = (n = 36, codes = ['2b50', '1f389', '1f33a', '1f98b']) => {
    const o = $('#overlay');
    for (let i = 0; i < n; i++) {
      const p = h(`<div class="particle">${emo(codes[i % codes.length])}</div>`); const x = innerWidth / 2, y = innerHeight / 2;
      p.style.cssText = `left:${x}px;top:${y}px`; o.append(p);
      const dx = (Math.random() - .5) * innerWidth * .9, dy = -Math.random() * innerHeight * .5 - 60;
      p.firstChild.style.cssText = 'width:100%;height:100%';
      p.animate([{ transform: 'translate(0,0) scale(.4)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) scale(1.2) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: .55 },
        { transform: `translate(${dx * 1.15}px,${innerHeight * .5}px) scale(.9) rotate(720deg)`, opacity: 0 }], { duration: 1500 + Math.random() * 900, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => p.remove();
    }
  };
  /* Video "Jawaban kamu Benar!" sebagai perayaan, lalu callback */
  PK.celebrate = (onEnd) => new Promise((res) => {
    PK.sfx('win'); PK.duck(true);
    const bg = h(`<div class="modal-bg" style="background:#000;z-index:10"><video class="w-full h-full object-cover absolute inset-0" src="assets/video/benar.mp4" autoplay playsinline></video>
      <button class="btn btn-leaf btn-lg absolute bottom-6 right-6" style="display:none">Lanjut ➜</button></div>`);
    const v = $('video', bg), b = $('button', bg); $('#overlay').append(bg);
    const end = () => { if (!bg.isConnected) return; bg.remove(); PK.duck(false); res(); };
    v.onended = end; v.onerror = end; b.onclick = end; setTimeout(() => { b.style.display = ''; b.focus(); }, 1500);
    v.play().catch(end);
  });

  PK.start = () => PK.go('cover');
})();
