/* Pos 2 — Klasifikasi Kehati: seret 9 gambar ke tingkat Gen / Jenis / Ekosistem. */
PK.missions.m2 = {
  mount(game, ctx) {
    const { emo, art, shuffle, h } = PK, pic = PK.pic;
    const zones = { gen: ['dna', 'Tingkat Gen', 'Satu jenis, ciri berbeda', 'linear-gradient(#4fc05a,#2f7d32)'], jenis: ['jejak', 'Tingkat Jenis', 'Jenis berbeda-beda', 'linear-gradient(#ffbe57,#e8830f)'], eko: ['globe', 'Tingkat Ekosistem', 'Tempat hidup berbeda', 'linear-gradient(#58b4f0,#1f6fb8)'] };
    const hint = { gen: 'Warna berbeda tetapi masih satu jenis (mawar) → <b>Gen</b>.', jenis: 'Makhluk hidup yang berbeda jenis → <b>Jenis</b>.', eko: 'Tempat hidup beserta lingkungannya → <b>Ekosistem</b>.' };
    const cards = [['gen', 'mawar-merah', 'Mawar merah'], ['gen', 'mawar-putih', 'Mawar putih'], ['gen', 'mawar-pink', 'Mawar pink'], ['jenis', 'kucing', 'Kucing'], ['jenis', 'ayam', 'Ayam'], ['jenis', 'kupu', 'Kupu-kupu'],
      ['eko', 'eko-hutan', 'Hutan'], ['eko', 'eko-sawah', 'Sawah'], ['eko', 'eko-laut', 'Laut']];
    const card = ([k, c, n]) => `<div class="drag-item tilt paper !rounded-2xl !border-[3px] p-1.5 text-center select-none grid place-items-center" data-k="${k}" tabindex="0" role="button" aria-label="${n}"><span class="text-5xl sm:text-6xl card-art">${pic(c)}</span><b class="text-xs sm:text-sm">${n}</b></div>`;
    game.innerHTML = `<div class="flex-1 min-w-0 grid grid-cols-3 gap-2 sm:gap-3">${Object.entries(zones).map(([k, [i, t, d, bg]]) => `
        <section class="paper flex flex-col overflow-hidden !p-0"><header class="text-white text-center p-2" style="background:${bg}"><div class="text-5xl mx-auto card-art" style="width:1em">${art(i)}</div><h2 class="font-head text-sm sm:text-lg leading-tight">${t}</h2><p class="text-[10px] sm:text-xs font-bold opacity-95">${d}</p></header>
        <div class="drop-zone flex-1 m-2 rounded-2xl border-4 border-dashed border-[#c89a5b] grid grid-cols-1 sm:grid-cols-2 auto-rows-min gap-1.5 p-1.5 content-start" data-z="${k}"><p class="col-span-full text-center text-xs font-bold opacity-50 py-3 empty">Seret gambar ke sini</p></div></section>`).join('')}</div>
      <aside class="paper w-36 sm:w-60 p-2 sm:p-3 overflow-y-auto"><h2 class="font-head text-center mb-2">Daftar Gambar</h2><div id="tray" class="grid grid-cols-2 sm:grid-cols-3 gap-2">${shuffle(cards).map(card).join('')}</div></aside>`;
    let n = 0; ctx.progress(0, 9, 'Benar');
    PK.dnd({ root: game, itemSel: '.drag-item', zoneSel: '.drop-zone', onDrop: (it, z) => {
      if (it.dataset.k !== z.dataset.z) { PK.sfx('bad'); ctx.mistake(); z.classList.add('shake'); setTimeout(() => z.classList.remove('shake'), 400); ctx.say(`${emo('tanya')} Belum tepat. ${hint[it.dataset.k]}`); return false; }
      z.querySelector('.empty')?.remove(); it.classList.add('placed', 'pop', 'ok-glow'); it.classList.remove('tilt'); it.style.cssText = 'pointer-events:none'; z.append(it); it.style.position = 'relative'; it.append(h('<i class="ring-burst"></i>'));
      PK.sfx('ok'); n++; ctx.progress(n, 9, 'Benar'); ctx.say(`${emo('centang')} Tepat! ${hint[it.dataset.k]}`);
      if (n === 9) ctx.done(); return true;
    } });
  }
};
