/* Pos 5 — Manfaat Alam: tarik garis dari kekayaan alam ke manfaatnya (pointer; atau ketuk-ketuk). */
PK.missions.m5 = {
  mount(game, ctx) {
    const { emo, art, shuffle } = PK, pic = PK.pic, NS = 'http://www.w3.org/2000/svg';
    const pairs = [['padi', 'Padi', 'nasi', 'Makanan pokok (pangan)', 'Beras dari padi menjadi nasi, makanan pokok kita.'], ['pohon-jati', 'Pohon jati', 'rumah', 'Bahan rumah & furnitur (papan)', 'Kayu jati kuat untuk rumah dan perabot.'],
      ['kapas', 'Tanaman kapas', 'baju', 'Bahan pakaian (sandang)', 'Serat kapas dipintal menjadi kain.'], ['jahe', 'Jahe & kunyit', 'obat', 'Obat tradisional', 'Jahe dan kunyit dipakai sebagai jamu.'],
      ['mangrove', 'Hutan mangrove', 'ombak', 'Menahan abrasi & rumah ikan', 'Akar mangrove menahan ombak dan jadi rumah ikan.'], ['karang', 'Terumbu karang', 'selam', 'Wisata bahari & mata pencaharian', 'Terumbu karang indah, menarik wisatawan, dan menjadi tempat ikan.']];
    const side = (arr, k) => arr.map(([i, c, t]) => `<div class="it ${k} paper !rounded-2xl p-1.5 sm:p-2 flex items-center gap-2 relative" data-p="${i}" tabindex="0" role="button" aria-label="${t}" style="touch-action:none;flex-direction:${k === 'L' ? 'row' : 'row-reverse'}">
      <span class="text-4xl card-art shrink-0">${pic(c)}</span><b class="font-head text-sm sm:text-lg leading-tight flex-1 ${k === 'R' ? 'text-right' : ''}">${t}</b><i class="dot absolute top-1/2 w-5 h-5 rounded-full bg-woodd border-2 border-cream" style="${k === 'L' ? 'right:-12px' : 'left:-12px'};transform:translateY(-50%)"></i></div>`).join('');
    const L = pairs.map((p, i) => [i, p[0], p[1]]), R = shuffle(pairs.map((p, i) => [i, p[2], p[3]]));
    game.innerHTML = `<div class="paper flex-1 min-w-0 p-3 sm:p-4 relative overflow-y-auto" id="box"><p class="text-center font-bold mb-2 text-sm hide-short">${emo('panah')} Tarik garis dari kekayaan alam (kiri) ke manfaatnya (kanan), atau ketuk keduanya.</p>
      <svg id="ln" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index:3"></svg>
      <div class="grid grid-cols-[1fr_minmax(40px,18%)_1fr] gap-y-1.5 sm:gap-y-2 items-stretch"><div class="grid gap-1.5 sm:gap-2">${side(L, 'L')}</div><div></div><div class="grid gap-1.5 sm:gap-2">${side(R, 'R')}</div></div></div>`;
    const box = game.querySelector('#box'), svg = game.querySelector('#ln'), matched = new Map(); let sel = null, drag = null, n = 0;
    ctx.progress(0, pairs.length, 'Terhubung');
    const q = (side, i) => box.querySelector(`.it.${side}[data-p="${i}"]`);
    const pt = (el) => { const b = box.getBoundingClientRect(), r = el.querySelector('.dot').getBoundingClientRect(); return [r.left + r.width / 2 - b.left + box.scrollLeft, r.top + r.height / 2 - b.top + box.scrollTop]; };
    const line = (a, b, col) => { const l = document.createElementNS(NS, 'line'); [['x1', a[0]], ['y1', a[1]], ['x2', b[0]], ['y2', b[1]], ['stroke', col], ['stroke-width', 7], ['stroke-linecap', 'round']].forEach(([k, v]) => l.setAttribute(k, v)); l.style.filter = `drop-shadow(0 0 4px ${col})`; svg.append(l); return l; };
    const redraw = () => { svg.querySelectorAll('.ok').forEach((x) => x.remove()); matched.forEach((_, i) => { line(pt(q('L', i)), pt(q('R', i)), '#2f9e44').classList.add('ok'); }); };
    const clearTmp = () => svg.querySelectorAll('.tmp').forEach((x) => x.remove());
    const attempt = (li, ri) => {
      const a = q('L', li), b = q('R', ri);
      if (li === ri) { matched.set(li, 1); [a, b].forEach((x) => { x.classList.add('ok-glow', 'placed'); x.querySelector('.card-art').classList.add('hop'); }); redraw(); n++; PK.sfx('ok'); ctx.progress(n, pairs.length, 'Terhubung'); ctx.say(`${emo('centang')} ${pairs[li][4]}`); if (n === pairs.length) ctx.done(); return; }
      clearTmp(); ctx.mistake(); const l = line(pt(a), pt(b), '#d64545'); l.classList.add('tmp'); [a, b].forEach((x) => { x.classList.add('shake'); setTimeout(() => x.classList.remove('shake'), 400); }); setTimeout(clearTmp, 600);
      PK.sfx('bad'); ctx.say(`${emo('tanya')} Belum cocok. Pikirkan: untuk apa <b>${pairs[li][1]}</b> dimanfaatkan?`);
    };
    const at = (x, y, side) => document.elementsFromPoint(x, y).map((e) => e.closest('.it.' + side)).find((e) => e && !e.classList.contains('placed'));
    box.onpointerdown = (e) => {
      const a = e.target.closest('.it.L'), r = e.target.closest('.it.R');
      if (r && !r.classList.contains('placed') && sel != null) { const s = sel; sel = null; box.querySelectorAll('.sel').forEach((x) => x.classList.remove('sel', 'ok-glow')); return attempt(s, +r.dataset.p); }
      if (!a || a.classList.contains('placed')) return;
      drag = { i: +a.dataset.p, x: e.clientX, y: e.clientY, moved: false, id: e.pointerId }; box.setPointerCapture?.(e.pointerId);
    };
    box.onpointermove = (e) => {
      if (!drag || e.pointerId !== drag.id) return; if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 8) return; drag.moved = true; clearTmp();
      const b = box.getBoundingClientRect(); line(pt(q('L', drag.i)), [e.clientX - b.left + box.scrollLeft, e.clientY - b.top + box.scrollTop], '#f5a623').classList.add('tmp');
    };
    box.onpointerup = (e) => {
      if (!drag || e.pointerId !== drag.id) return; const d = drag; drag = null; clearTmp();
      if (!d.moved) { box.querySelectorAll('.sel').forEach((x) => x.classList.remove('sel', 'ok-glow')); sel = d.i; q('L', d.i).classList.add('sel', 'ok-glow'); PK.sfx('pop'); return; }
      const r = at(e.clientX, e.clientY, 'R'); if (r) attempt(d.i, +r.dataset.p);
    };
    box.onpointercancel = () => { drag = null; clearTmp(); };
    const onResize = () => redraw(); addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }
};
