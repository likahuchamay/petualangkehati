/* Pos 4 — Detektif Ekosistem: cari 2 makhluk yang salah tempat di sawah & laut (pakai kaca pembesar), lalu simpulkan alasannya. */
PK.missions.m4 = {
  mount(game, ctx) {
    const { emo, art, h } = PK, pic = PK.pic;
    // [sprite, nama, x%, y%, salah?, keterangan]
    const rounds = [
      { nama: 'Ekosistem Sawah', sawah: 1, items: [
        ['katak', 'Katak', 24, 70, 0], ['belalang', 'Belalang', 50, 60, 0], ['padi', 'Padi', 72, 74, 0], ['ular', 'Ular', 86, 56, 0],
        ['hiu', 'Hiu', 18, 42, 1, 'Hiu hidup di laut, bukan di sawah.'], ['gurita', 'Gurita', 58, 86, 1, 'Gurita membutuhkan air laut yang asin.']] },
      { nama: 'Ekosistem Laut', items: [
        ['ikan-badut', 'Ikan badut', 24, 38, 0], ['penyu', 'Penyu', 72, 34, 0], ['kepiting', 'Kepiting', 46, 82, 0], ['karang', 'Terumbu karang', 86, 72, 0],
        ['ayam', 'Ayam', 52, 52, 1, 'Ayam hidup di darat dan tidak bisa bernapas di bawah air.'], ['gajah', 'Gajah', 14, 74, 1, 'Gajah hidup di daratan, tidak di laut.']] }
    ];
    const scene = (R) => `<div class="absolute inset-0" style="background:url(assets/img/${R.sawah ? 'bg-sawah' : 'bg-laut'}.jpg) center/cover"></div><div class="absolute inset-0" style="background:rgba(0,0,0,.08)"></div>`;
    let r = 0, found = 0, total = 0;
    ctx.progress(0, 5, 'Bukti');
    const round = () => {
      const R = rounds[r]; found = 0;
      game.innerHTML = `<div class="flex-1 min-w-0 relative rounded-3xl overflow-hidden border-4 border-woodd shadow-2xl" id="sc" style="cursor:none;touch-action:manipulation">${scene(R)}
        <div class="absolute top-2 left-2 right-2 flex items-center gap-2 z-10 flex-wrap"><span class="chip">${emo('kaca')} ${R.nama}: temukan 2 makhluk yang SALAH TEMPAT</span><span class="slot" id="s0"></span><span class="slot" id="s1"></span></div>
        ${R.items.map(([c, n, x, y], i) => `<button class="absolute fillart sprite-shadow" data-i="${i}" aria-label="${n}" style="left:${x}%;top:${y}%;width:clamp(58px,11%,110px);aspect-ratio:1;translate:-50% -50%"><span class="float block w-full h-full" style="animation-delay:${i * -.7}s">${pic(c)}</span><small class="absolute left-1/2 -bottom-3 chip !py-0 !px-2 text-[11px] whitespace-nowrap" style="translate:-50% 0">${n}</small></button>`).join('')}
        <div class="lens" id="lens" style="display:none">${art('kaca')}</div></div>`;
      ctx.say(`${emo('kaca')} Amati ${R.nama.toLowerCase()}. Ketuk makhluk yang <b>tidak seharusnya</b> hidup di sini!`);
      const sc = game.querySelector('#sc'), lens = game.querySelector('#lens');
      sc.onpointermove = (e) => { if (e.pointerType === 'touch') return; const b = sc.getBoundingClientRect(); lens.style.display = ''; lens.style.left = e.clientX - b.left + 'px'; lens.style.top = e.clientY - b.top + 'px'; };
      sc.onpointerleave = () => { lens.style.display = 'none'; }; sc.onpointerdown = () => lens.classList.add('on'); sc.onpointerup = () => lens.classList.remove('on');
      game.onclick = (e) => {
        const b = e.target.closest('[data-i]'); if (!b || b.dataset.done) return; const it = R.items[b.dataset.i];
        if (!it[4]) { PK.sfx('bad'); ctx.mistake(); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return ctx.say(`${emo('tanya')} ${it[1]} memang hidup di ${R.nama.toLowerCase()}. Cari yang lain!`); }
        b.dataset.done = 1; PK.sfx('ok'); b.append(h('<i class="ring-burst"></i>')); b.insertAdjacentHTML('beforeend', '<span class="absolute -top-2 -right-2 w-8 h-8 grid place-items-center">' + art('silang') + '</span>');
        game.querySelector('#s' + found).innerHTML = pic(it[0]); game.querySelector('#s' + found).classList.add('full', 'pop'); found++; total++; ctx.progress(total, 5, 'Bukti'); ctx.say(`${emo('centang')} Betul! ${it[5]}`);
        if (found === 2) setTimeout(() => (r === 0 ? (r = 1, round()) : question()), 1500);
      };
    };
    const question = () => {
      game.innerHTML = `<div class="paper flex-1 p-4 sm:p-6 pop flex flex-col items-center justify-center gap-3 text-center overflow-y-auto"><div class="flex gap-3" style="font-size:4.2rem">${pic('eko-sawah')}${pic('eko-laut')}</div>
        <h2 class="font-head text-xl sm:text-2xl max-w-xl">Kesimpulan Detektif: Mengapa makhluk hidup di sawah berbeda dengan di laut?</h2>
        <div class="grid gap-2 w-full max-w-xl">${[['Karena kondisi lingkungannya berbeda', 1], ['Karena semua makhluk hidup sama', 0], ['Karena bentuk tanahnya sama', 0]].map(([t, ok], i) => `<button class="tilt paper !rounded-2xl p-3 font-bold" data-ok="${ok}"><span class="font-head mr-2">${'ABC'[i]}.</span>${t}</button>`).join('')}</div></div>`;
      ctx.say('Satu pertanyaan terakhir, Detektif!');
      game.onclick = (e) => {
        const b = e.target.closest('[data-ok]'); if (!b || b.disabled) return;
        if (b.dataset.ok !== '1') { PK.sfx('bad'); ctx.mistake(); b.disabled = true; b.style.opacity = .45; b.classList.add('shake'); return ctx.say(`${emo('tanya')} Pikirkan lagi: air, tanah, dan cahaya di sawah dan laut apakah sama?`); }
        game.onclick = null; b.classList.add('ok-glow'); ctx.progress(5, 5, 'Bukti'); ctx.say(`${emo('centang')} Tepat! Setiap ekosistem punya kondisi berbeda sehingga penghuninya pun berbeda.`); ctx.done();
      };
    };
    round();
  }
};
