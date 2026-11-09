/* Pos 1 — Pemburu Jejak: temukan makhluk hidup di pemandangan (ketuk). Butuh 5 dari 8, ada pengecoh benda mati & tombol petunjuk. */
PK.missions.m1 = {
  mount(game, ctx) {
    const { art, emo, h } = PK, NEED = 5; let hints = 3;
    // [sprite, nama, x%, y%, lebar%, hidup?, keterangan, gerak]
    const items = [
      ['rusa', 'Rusa', 72, 64, 13, 1, 'Rusa bernapas, makan rumput, dan berkembang biak.'], ['kelinci', 'Kelinci', 46, 82, 9, 1, 'Kelinci tumbuh besar dan beranak. Ia makhluk hidup!'],
      ['kupu', 'Kupu-kupu', 28, 36, 7, 1, 'Kupu-kupu berkembang dari ulat. Itu ciri makhluk hidup.', 'drift'], ['burung', 'Burung', 78, 24, 9, 1, 'Burung bernapas dan bertelur untuk berkembang biak.', 'drift'],
      ['katak', 'Katak', 22, 72, 8, 1, 'Katak bernapas dan makan serangga.'], ['kura', 'Kura-kura', 57, 68, 10, 1, 'Kura-kura tumbuh perlahan dan bertelur.'],
      ['ikan', 'Ikan', 40, 56, 8.5, 1, 'Ikan bernapas dengan insang dan berkembang biak.'], ['bunga', 'Bunga', 9, 82, 8, 1, 'Bunga tumbuh dan berkembang biak lewat biji.'],
      ['batu', 'Batu', 63, 86, 8, 0, 'Batu tidak bernapas dan tidak tumbuh — benda mati.'], ['awan', 'Awan', 17, 14, 13, 0, 'Awan tidak bernapas dan tidak berkembang biak — benda mati.'],
      ['ember', 'Ember', 89, 82, 7, 0, 'Ember buatan manusia, tidak tumbuh — benda mati.']
    ];
    const live = items.filter((i) => i[5]), found = new Set();
    game.innerHTML = `<div class="flex-1 min-w-0 relative rounded-3xl overflow-hidden border-4 border-woodd shadow-2xl" id="sc" style="background:url(assets/img/bg-gunung.jpg) center/cover">
        <div class="absolute top-2 left-2 chip z-10">${emo('kaca')} Ketuk makhluk hidup yang kamu temukan!</div>
        <button class="btn btn-sm absolute top-2 right-2 z-10" id="hint">${emo('lampu')} Petunjuk <b id="hc">${hints}</b></button>
        ${items.map(([c, n, x, y, w, l, , mv], i) => `<button class="absolute fillart sprite-shadow" data-i="${i}" aria-label="${n}" style="left:${x}%;top:${y}%;width:${w}%;aspect-ratio:1;translate:-50% -50%"><span class="${mv || 'float'} block w-full h-full" style="animation-delay:${i * -.7}s">${art(c)}</span></button>`).join('')}</div>
      <aside class="paper w-36 sm:w-52 p-2 sm:p-3 flex flex-col gap-2 overflow-y-auto"><h2 class="font-head text-center leading-tight text-sm sm:text-base">Koleksi Makhluk Hidup</h2><ul id="list" class="grid grid-cols-2 gap-1.5">
        ${live.map(([c, n]) => `<li data-n="${n}" class="silhouette grid place-items-center p-1 rounded-xl bg-[#fbe9bd] text-[11px] sm:text-xs font-extrabold text-center"><span class="text-3xl sm:text-4xl">${art(c)}</span><span>???</span></li>`).join('')}</ul></aside>`;
    ctx.progress(0, NEED, 'Ditemukan');
    const sc = game.querySelector('#sc');
    game.querySelector('#hint').onclick = () => {
      if (!hints) return ctx.say('Petunjuk sudah habis. Coba cari lebih teliti!');
      const t = items.map((it, i) => [it, i]).find(([it, i]) => it[5] && !found.has(String(i))); if (!t) return;
      hints--; game.querySelector('#hc').textContent = hints; PK.sfx('pop'); const b = game.querySelector(`[data-i="${t[1]}"]`); b.append(h('<i class="ring-burst"></i>')); setTimeout(() => b.querySelector('.ring-burst')?.remove(), 800);
      ctx.say(`${emo('lampu')} Petunjuk: cari <b>makhluk hidup</b> di sekitar sini!`);
    };
    game.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]'); if (!b || found.has(b.dataset.i)) return;
      const [c, name, , , , lv, info] = items[b.dataset.i];
      if (!lv) { PK.sfx('bad'); ctx.mistake(); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return ctx.say(`${emo('silang')} ${info}`); }
      found.add(b.dataset.i); PK.sfx('ok'); b.classList.add('hop'); b.append(h('<i class="ring-burst"></i>')); b.insertAdjacentHTML('beforeend', `<span class="absolute -top-2 -right-2 w-7 h-7 rounded-full grid place-items-center text-white font-bold" style="background:#2f9e44;border:2px solid #fff">✔</span>`);
      const r = b.getBoundingClientRect(), s = sc.getBoundingClientRect(); sc.append(h(`<span class="floaty-text" style="left:${r.left - s.left + r.width / 2 - 14}px;top:${r.top - s.top}px">+1</span>`));
      const li = game.querySelector(`#list [data-n="${name}"]`); li.classList.remove('silhouette'); li.lastElementChild.textContent = name; li.classList.add('pop', 'ok-glow');
      ctx.progress(Math.min(found.size, NEED), NEED, 'Ditemukan'); ctx.say(`${emo('centang')} <b>${name}</b> — ${info}`);
      if (found.size === NEED) ctx.done();
    });
  }
};
