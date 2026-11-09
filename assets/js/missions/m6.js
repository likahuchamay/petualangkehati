/* Pos 6 — Penjaga Kehati: geser keranjang, tangkap 8 aksi baik, hindari aksi merusak (3 nyawa). */
PK.missions.m6 = {
  easy: 0, ok: 2,
  mount(game, ctx) {
    const { emo, art, h } = PK, NEED = 8, LIVES = 3;
    const good = [['bibit', 'Menanam pohon'], ['tong', 'Buang sampah pada tempatnya'], ['daur', 'Daur ulang'], ['air', 'Hemat air'], ['penyu', 'Lindungi penyu'], ['taman', 'Rawat taman'], ['lebah', 'Jaga lebah']];
    const bad = [['kapak', 'Menebang liar'], ['api', 'Membakar hutan'], ['jaring', 'Berburu satwa langka'], ['sampah', 'Sampah ke sungai']];
    game.innerHTML = `<div class="flex-1 min-w-0 relative rounded-3xl overflow-hidden border-4 border-woodd shadow-2xl" id="play" style="background:url(assets/img/bg-hutan.jpg) center/cover;touch-action:none;cursor:ew-resize">
      <div class="absolute inset-0" style="background:linear-gradient(rgba(190,230,255,.25),rgba(20,70,25,.35))"></div>
      ${[[0, 10, 12], [-20, 22, 9]].map(([x, y, w], i) => `<span class="absolute cloud-drift" style="left:${x}%;top:${y}%;width:${w}%;animation-delay:${i * -17}s;opacity:.85">${art('awan')}</span>`).join('')}
      <div class="absolute top-2 left-2 right-2 flex justify-between items-center gap-2 z-10"><span class="chip hide-short">${emo('panah')} Geser / tekan ◀ ▶ untuk menangkap aksi baik</span>
        <div class="flex-1 h-4 rounded-full overflow-hidden border-2 border-woodd bg-white/50 mx-2 max-w-xs"><div id="bar" class="h-full bg-leaf transition-all" style="width:0%"></div></div><span class="chip" id="hp"></span></div>
      <div id="basket" class="absolute sprite-shadow" style="left:0;bottom:6px;width:92px;height:92px;z-index:5">${art('keranjang')}</div>
      ${[[-1, '◀', 'left:10px'], [1, '▶', 'right:10px']].map(([d, s, p]) => `<button class="btn btn-wood pad absolute select-none" data-d="${d}" style="${p};bottom:8px;z-index:6;width:68px;height:68px;font-size:1.6rem;touch-action:none" aria-label="Geser keranjang">${s}</button>`).join('')}
      <div id="over" class="absolute inset-0 grid place-items-center z-20" style="background:rgba(30,15,5,.55)"><div class="paper p-5 text-center max-w-sm pop"><div class="mx-auto float hide-short" style="font-size:4.5rem;width:1em">${art('keranjang')}</div><h2 class="font-head text-2xl mb-1">Siap menjaga alam?</h2><p class="font-semibold mb-3">Tangkap <b>${NEED}</b> aksi baik <span style="color:#2f9e44">✔</span>. Hindari aksi merusak <span style="color:#d64545">✖</span>. Nyawamu ${LIVES}.</p><button class="btn btn-leaf btn-lg" id="go">Mulai ▶</button></div></div></div>`;
    const play = game.querySelector('#play'), basket = game.querySelector('#basket'), over = game.querySelector('#over'), hp = game.querySelector('#hp'), bar = game.querySelector('#bar');
    let items = [], got = 0, lives = LIVES, bx = 0, running = false, raf = 0, last = 0, spawn = 0, keys = 0, W = 0, H = 0;
    const draw = () => { hp.innerHTML = Array.from({ length: LIVES }, (_, i) => art(i < lives ? 'hati' : 'hati-kosong')).join(''); hp.style.fontSize = '1.4rem'; };
    const setX = (x) => { bx = Math.max(0, Math.min(W - 92, x)); basket.style.translate = `${bx}px 0`; };
    const pop = (x, y, txt) => { const f = h(`<span class="floaty-text" style="left:${x}px;top:${y}px">${txt}</span>`); play.append(f); setTimeout(() => f.remove(), 900); };
    const reset = () => { items.forEach((i) => i.el.remove()); items = []; got = 0; lives = LIVES; spawn = 0; W = play.clientWidth; H = play.clientHeight; setX(W / 2 - 46); draw(); bar.style.width = '0%'; ctx.progress(0, NEED, 'Aksi baik'); };
    const add = () => {
      const g = Math.random() < .62, [c, t] = (g ? good : bad)[Math.floor(Math.random() * (g ? good.length : bad.length))], w = 118;
      const el = h(`<div class="absolute grid place-items-center text-center" style="left:0;top:0;width:${w}px;z-index:4"><span class="sprite-shadow" style="width:64px;height:64px">${art(c)}</span><b class="chip !text-[13px] !py-0.5 !px-2 whitespace-normal leading-tight" style="background:${g ? '#2f7d32' : '#9b2c2c'}">${g ? '✔' : '✖'} ${t}</b></div>`);
      play.append(el); items.push({ el, x: 8 + Math.random() * (W - w - 16), y: -100, vy: 110 + Math.random() * 60 + got * 8, g, t, w });
    };
    const end = (win) => {
      running = false; cancelAnimationFrame(raf);
      if (win) return ctx.done();
      over.style.display = ''; over.innerHTML = `<div class="paper p-5 text-center max-w-sm pop"><h2 class="font-head text-2xl mb-1">Ayo coba lagi!</h2><p class="font-semibold mb-3">Nyawamu habis. Ingat: tangkap aksi baik, hindari aksi merusak alam.</p><button class="btn btn-leaf btn-lg" id="go">Coba lagi ↺</button></div>`; over.querySelector('#go').onclick = start;
    };
    const tick = (t) => {
      if (!running) return; const dt = Math.min((t - last) / 1000, .05); last = t; spawn -= dt; if (keys) setX(bx + keys * 560 * dt);
      if (spawn <= 0) { add(); spawn = .85 + Math.random() * .5; }
      const by = H - 100;
      items = items.filter((i) => {
        i.y += i.vy * dt; i.el.style.transform = `translate(${i.x}px,${i.y}px)`;
        const hit = i.y + 70 > by && i.y < by + 60 && i.x + i.w - 24 > bx && i.x + 24 < bx + 92;
        if (hit) {
          i.el.remove();
          if (i.g) { got++; PK.sfx('ok'); bar.style.width = got / NEED * 100 + '%'; ctx.progress(got, NEED, 'Aksi baik'); pop(i.x + 40, by - 20, '+1'); basket.classList.add('hop'); setTimeout(() => basket.classList.remove('hop'), 600); ctx.say(`${emo('centang')} <b>${i.t}</b> — aksi hebat untuk menjaga kehati!`); }
          else { lives--; ctx.mistake(); PK.sfx('bad'); draw(); play.classList.add('shake'); setTimeout(() => play.classList.remove('shake'), 400); pop(i.x + 40, by - 20, '−1'); ctx.say(`${emo('silang')} <b>${i.t}</b> merusak alam! Hindari ya.`); }
          if (got >= NEED) end(true); else if (lives <= 0) end(false);
          return false;
        }
        if (i.y > H) { i.el.remove(); return false; } return true;
      });
      raf = requestAnimationFrame(tick);
    };
    const start = () => { reset(); over.style.display = 'none'; running = true; last = performance.now(); raf = requestAnimationFrame(tick); };
    over.querySelector('#go').onclick = start;
    play.onpointermove = (e) => { if (running) setX(e.clientX - play.getBoundingClientRect().left - 46); };
    play.onpointerdown = play.onpointermove;
    game.querySelectorAll('.pad').forEach((b) => { // tombol ◀ ▶ (tahan) untuk layar sentuh
      ['pointermove', 'pointerdown'].forEach((ev) => b.addEventListener(ev, (e) => e.stopPropagation()));
      b.onpointerdown = (e) => { e.stopPropagation(); keys = +b.dataset.d; b.setPointerCapture?.(e.pointerId); };
      b.onpointerup = b.onpointercancel = b.onlostpointercapture = () => { keys = 0; };
    });
    const kd = (e) => { if (e.key === 'ArrowLeft') keys = -1; if (e.key === 'ArrowRight') keys = 1; }, ku = (e) => { if (['ArrowLeft', 'ArrowRight'].includes(e.key)) keys = 0; };
    const rs = () => { W = play.clientWidth; H = play.clientHeight; setX(bx); };
    addEventListener('resize', rs); addEventListener('keydown', kd); addEventListener('keyup', ku); reset();
    return () => { running = false; cancelAnimationFrame(raf); removeEventListener('resize', rs); removeEventListener('keydown', kd); removeEventListener('keyup', ku); };
  }
};
