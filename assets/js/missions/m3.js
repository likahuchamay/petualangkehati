/* Pos 3 — Rahasia Alam: Profesor Hantu memberi 5 teka-teki; pilih tingkat keanekaragaman hayati yang tepat. */
PK.missions.m3 = {
  mount(game, ctx) {
    const { emo, art } = PK;
    const opts = { gen: ['dna', 'Tingkat Gen', 'Perbedaan ciri dalam satu jenis'], jenis: ['jejak', 'Tingkat Jenis', 'Perbedaan antarjenis makhluk hidup'], eko: ['globe', 'Tingkat Ekosistem', 'Perbedaan tempat hidup & lingkungannya'] };
    const riddles = [
      ['gen', [['mawar-merah', 'Merah'], ['mawar-pink', 'Pink'], ['mawar-putih', 'Putih']], 'Aku punya bunga berwarna merah, pink, dan putih. Semuanya tetap bunga mawar. Tingkat apakah aku?', 'Satu jenis (mawar) dengan warna berbeda = variasi gen.'],
      ['jenis', [['kucing', 'Kucing'], ['ayam', 'Ayam'], ['kupu', 'Kupu-kupu']], 'Kucing, ayam, dan kupu-kupu hidup di sekitar rumah kita, tetapi bentuk dan cirinya berbeda-beda. Termasuk tingkat apa?', 'Berbagai jenis makhluk hidup yang berbeda = keanekaragaman jenis.'],
      ['eko', [['eko-hutan', 'Hutan'], ['eko-sawah', 'Sawah'], ['eko-laut', 'Laut']], 'Hutan, sawah, dan laut memiliki tanah, air, cahaya, dan penghuni yang berbeda. Termasuk tingkat apa?', 'Perbedaan tempat hidup beserta lingkungannya = keanekaragaman ekosistem.'],
      ['gen', [['padi', 'Rojolele'], ['padi', 'Pandanwangi'], ['padi', 'IR64']], 'Padi Rojolele, Pandanwangi, dan IR64 sama-sama padi, tetapi rasa dan aroma berasnya berbeda. Tingkat apakah ini?', 'Masih satu jenis (padi) tetapi berbeda sifat = tingkat gen.'],
      ['jenis', [['pohon', 'Pohon mangga'], ['kelapa', 'Pohon kelapa'], ['bunga', 'Bunga sepatu']], 'Pohon mangga, pohon kelapa, dan bunga sepatu tumbuh di halaman. Mereka tumbuhan yang berbeda jenis. Tingkat apa?', 'Tumbuhan berbeda jenis di satu tempat = keanekaragaman jenis.']
    ];
    let i = 0, solved = 0;
    ctx.progress(0, riddles.length, 'Terpecahkan');
    const show = () => {
      const [ans, pic, q, why] = riddles[i];
      game.innerHTML = `<div class="m3 paper flex-1 min-w-0 p-3 sm:p-5 overflow-y-auto pop flex flex-col gap-3 items-center">
        <div class="flex items-center gap-3 w-full max-w-3xl"><div class="shrink-0 float sprite-shadow" style="width:clamp(64px,13vh,110px)">${art('burung-hantu')}</div>
          <div class="paper !rounded-2xl p-3 relative flex-1"><span class="chip mb-1">Teka-teki ${i + 1} dari ${riddles.length}</span><p class="font-bold text-sm sm:text-xl">${q}</p></div></div>
        <div class="flex gap-2 sm:gap-5 justify-center">${pic.map(([c, t], n) => `<figure class="tilt paper !rounded-3xl p-2 sm:p-3 grid place-items-center"><span class="text-6xl sm:text-7xl card-art float" style="animation-delay:${n * -.6}s">${art(c)}</span><figcaption class="text-xs sm:text-sm font-extrabold">${t}</figcaption></figure>`).join('')}</div>
        <div class="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-3xl">${Object.entries(opts).map(([k, [ic, t, d]]) => `<button data-k="${k}" class="tilt paper !rounded-2xl p-2 sm:p-4 text-center"><div class="text-4xl sm:text-5xl mx-auto card-art" style="width:1em">${art(ic)}</div><b class="font-head sm:text-xl leading-tight block">${t}</b><small class="font-bold hidden sm:block">${d}</small></button>`).join('')}</div>
        <button class="btn btn-leaf" id="nx" style="display:none">${i === riddles.length - 1 ? 'Selesai' : 'Teka-teki berikutnya ➜'}</button></div>`;
      ctx.say('Profesor Hantu bertanya: pilih tingkat yang paling tepat!');
      game.onclick = (e) => {
        const b = e.target.closest('[data-k]'); if (!b || b.disabled) return;
        if (b.dataset.k !== ans) { PK.sfx('bad'); ctx.mistake(); b.disabled = true; b.style.opacity = .45; b.classList.add('shake'); return ctx.say(`${emo('tanya')} Belum tepat. Apakah itu perbedaan <i>dalam satu jenis</i>, <i>antarjenis</i>, atau <i>tempat hidup</i>?`); }
        PK.sfx('ok'); game.querySelectorAll('[data-k]').forEach((x) => { x.disabled = true; }); b.style.opacity = 1; b.classList.add('ok-glow', 'pop'); solved++; ctx.progress(solved, riddles.length, 'Terpecahkan');
        ctx.say(`${emo('centang')} Benar! ${why}`); game.onclick = null;
        if (solved === riddles.length) return ctx.done();
        const nx = game.querySelector('#nx'); nx.style.display = ''; nx.focus(); nx.onclick = () => { i++; show(); };
      };
    };
    show();
  }
};
