/* Peta petualangan: gembok per pos, karakter berjalan antar pos, trofi. Koordinat dalam ruang gambar 1280x713. */
PK.scenes.peta = (el, { justDone = 0 } = {}) => {
  const { $, emo, wait } = PK, D = PK.data.pos, W = 1280, H = 713, N = D.length;
  const pct = (x, y) => `left:${x / W * 100}%;top:${y / H * 100}%`;
  const spot = [[520, 432], ...D.map((p) => [p.node[0] - 66, p.node[1] + 36]), [1118, 585]]; // 0=start, 1..N=pos, N+1=trofi
  let dead = false, busy = true;

  el.innerHTML = `<div class="bg-fill bg-blur" style="background-image:url(assets/img/peta.jpg)"></div>
    <div class="stage" id="stage" style="--ar:${W / H}"><img src="assets/img/peta.jpg" class="w-full h-full" alt="Peta Petualangan Kehati">
      <svg id="svg" viewBox="0 0 ${W} ${H}" class="w-full h-full" style="left:0;top:0;pointer-events:none"></svg>
      ${D.map((p, i) => `<div class="plate" id="pl${i + 1}" style="${pct(...p.plate)}"></div><button class="node" id="n${i + 1}" style="${pct(...p.node)}"></button>`).join('')}
      <button class="trophy-hot" id="trophy" aria-label="Trofi penghargaan" style="left:88.5%;top:60%;width:10.5%;height:36%"></button>
      <span class="amb fly f1" style="z-index:7">${PK.art('kupu')}</span><span class="amb fly f2" style="z-index:7">${PK.art('burung')}</span>
      <div class="token" id="token"><img src="assets/img/ui/petualang-cewek.png" alt="Anin"><img src="assets/img/ui/petualang-cowok.png" alt="Fino"></div>
      <div class="absolute left-[1.5%] top-[2%] flex gap-2 flex-wrap items-center z-10"><span class="chip" id="prog"></span><button class="btn btn-wood btn-sm" id="reset" aria-label="Ulangi dari awal">↺ Ulangi</button></div>
      <div class="absolute left-1/2 -translate-x-1/2 bottom-[1.5%] z-10 chip" id="hint"></div></div>`;
  const svg = $('#svg', el), token = $('#token', el), stage = $('#stage', el);

  /* Jalur: satu kurva per segmen + titik-titik jejak yang terungkap saat token lewat */
  const segs = [];
  for (let i = 0; i < N + 1; i++) {
    const [a, b] = [spot[i], spot[i + 1]], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], k = i % 2 ? .22 : -.22;
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', `M${a} Q${mx - dy * k},${my + dx * k} ${b}`); svg.append(p);
    const len = p.getTotalLength(), dots = [];
    for (let l = 18; l < len - 10; l += 20) {
      const q = p.getPointAtLength(l), c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', q.x); c.setAttribute('cy', q.y); c.setAttribute('r', 4.5); c.setAttribute('fill', '#fff'); c.style.cssText = 'opacity:.28;transition:opacity .3s;filter:drop-shadow(0 0 3px #fff)'; svg.append(c); dots.push([l, c]);
    }
    p.setAttribute('fill', 'none'); segs.push({ p, len, dots });
  }
  const place = (x, y) => { token.style.cssText = pct(x, y); };
  const lit = (i, upto = Infinity) => segs[i].dots.forEach(([l, c]) => { if (l <= upto) c.style.opacity = 1; });

  /* Tampilan node sesuai status */
  const paint = (i, st, anim = false) => {
    const n = $(`#n${i}`, el), pl = $(`#pl${i}`, el), ico = st === 'locked' ? 'gembok' : st === 'open' ? 'gembok-buka' : 'bintang';
    n.className = `node ${st}${anim ? ' opening' : ''}`; n.setAttribute('aria-label', `Pos ${i}: ${D[i - 1].short} — ${st === 'locked' ? 'terkunci' : st === 'open' ? 'terbuka' : 'selesai'}`);
    n.innerHTML = `<span class="ring"></span><span class="num">${i}</span>${PK.art(ico, 'ico')}`;
    pl.innerHTML = `<b>${D[i - 1].short}</b><small>${st === 'locked' ? 'TERKUNCI' : st === 'open' ? '▶ MULAI!' : `<span class="inline-flex gap-px align-middle">${PK.stars(PK.state.stars[i] || 1, 3, '1.5em')}</span>`}</small>`;
  };
  const hint = (t) => { $('#hint', el).innerHTML = t; };
  const prog = () => { $('#prog', el).innerHTML = `${emo('bintang')} Pos selesai: ${PK.state.done.length}/${N} • Bintang ${PK.totalStars()}`; };

  const walk = (i) => new Promise((res) => { // token berjalan dari spot[i] ke spot[i+1]
    const s = segs[i], dur = Math.max(1600, s.len * 7); token.classList.add('walk'); const t0 = performance.now(); let last = 0;
    const tick = (t) => {
      if (dead) return res();
      const f = Math.min((t - t0) / dur, 1), e = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2, l = e * s.len, q = s.p.getPointAtLength(l);
      place(q.x, q.y); lit(i, l); if (t - last > 330) { PK.sfx('step'); last = t; }
      f < 1 ? requestAnimationFrame(tick) : (token.classList.remove('walk'), res());
    };
    requestAnimationFrame(tick);
  });

  const trophyShow = async () => {
    $('#trophy', el).classList.add('glow'); hint(`${emo('1f3c6')} Hebat! Semua misi selesai — ketuk trofi!`);
    if (!PK.state.trophy) { PK.state.trophy = true; PK.save(); PK.sfx('win'); PK.confetti(50); await wait(900); trophyModal(); }
  };
  const trophyModal = async () => {
    const done = PK.state.evaluasi != null;
    const a = await PK.modal(`<div class="text-6xl">${emo('1f3c6')}</div><h2 class="font-head text-3xl my-1">Selamat, ${PK.state.nama || 'Petualang'}!</h2><p class="font-semibold text-lg">Kamu telah menyelesaikan semua misi dan resmi menjadi <b>Penjaga Kehati</b>! ${done ? `Nilai evaluasimu: <b>${PK.state.evaluasi}</b>.` : 'Sekarang buktikan pemahamanmu di evaluasi.'}</p>`,
      [{ label: done ? 'Lihat Evaluasi' : 'Kerjakan Evaluasi ➜', cls: 'btn-leaf' }, { label: 'Tutup', cls: 'btn-wood' }]);
    if (a === 0) PK.go('evaluasi');
  };

  /* Urutan animasi saat masuk peta */
  (async () => {
    const done = new Set(PK.state.done); justDone && done.delete(justDone);
    let at = Math.min(PK.state.tokenAt, N + 1);
    for (let i = 1; i <= N; i++) paint(i, done.has(i) ? 'done' : i === at ? 'open' : 'locked');
    for (let i = 0; i < at; i++) lit(i); place(...spot[at]); prog();
    const target = PK.allDone() ? N + 1 : PK.unlocked();
    if (justDone) { // gembok pos yang baru selesai terbuka -> jadi bintang
      hint(`${emo('1f513')} Gembok terbuka!`); paint(justDone, 'open', true); PK.sfx('unlock'); await wait(1000); if (dead) return;
      paint(justDone, 'done'); PK.confetti(18); prog(); await wait(500);
    }
    if (at < target) hint(`${emo('1f463')} ${PK.state.nama || 'Petualang'} berjalan ke pos berikutnya...`);
    while (at < target && !dead) {
      await walk(at); if (dead) return; at++; PK.state.tokenAt = at; PK.save();
      if (at <= N && !done.has(at)) { paint(at, 'open', true); PK.sfx('unlock'); await wait(700); }
    }
    if (dead) return; busy = false;
    if (PK.allDone()) return trophyShow();
    hint(`${emo('1f449')} Ketuk pos yang terbuka untuk memulai misi`);
  })();

  el.addEventListener('click', (e) => {
    const n = e.target.closest('.node'), t = e.target.closest('#trophy');
    if (t) return PK.allDone() && !busy ? trophyModal() : (PK.sfx('bad'), PK.toast(`${emo('1f512')} Selesaikan semua pos untuk meraih trofi!`));
    if (!n || busy) return;
    const i = +n.id.slice(1);
    if (n.classList.contains('locked')) { PK.sfx('bad'); n.classList.add('shake'); setTimeout(() => n.classList.remove('shake'), 400); return PK.toast(`${emo('1f512')} Selesaikan Pos ${PK.state.done.length + 1} dulu ya!`); }
    PK.sfx('pop'); PK.go('misi', { id: i });
  });
  $('#reset', el).onclick = async () => {
    if (await PK.modal('<h2 class="font-head text-2xl">Ulangi dari awal?</h2><p class="font-semibold">Semua progres pos dan nilai evaluasi akan dihapus.</p>', [{ label: 'Batal', cls: 'btn-wood' }, { label: 'Ya, ulangi', cls: 'btn-leaf' }]) === 1) { PK.reset(); PK.go('peta'); }
  };
  return () => { dead = true; };
};
