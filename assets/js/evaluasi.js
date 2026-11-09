/* Evaluasi akhir: 10 soal, umpan balik langsung, hasil bintang. Terbuka setelah semua pos selesai. */
PK.scenes.evaluasi = (el) => {
  const { $, emo, shuffle } = PK;
  if (!PK.allDone()) { PK.toast(`${emo('1f512')} Selesaikan semua pos dulu ya!`, 'bad'); return PK.go('menu'); }
  const qs = shuffle(PK.data.kuis).map(([q, o, a, why]) => { const opts = shuffle(o.map((t, i) => [t, i === a])); return { q, opts, why }; });
  let i = 0, score = 0;
  el.innerHTML = `<div class="bg-fill bg-blur" style="background-image:url(assets/img/bg-gunung.jpg)"></div><div class="bg-fill bg-dim"></div><div class="page" id="ev"></div>`;
  const root = $('#ev', el); PK.ambient(el, ['pohon', 'taman', 'padi', 'kelapa']); PK.tilt(el);
  const head = (t) => `<div class="flex items-center justify-between gap-3"><button class="btn btn-wood btn-sm" data-act="menu">◀ Menu</button><h1 class="wood sign-title text-xl sm:text-3xl px-5 py-2">${emo('1f4dd')} ${t}</h1><span class="w-24 hidden sm:block"></span></div>`;
  const ask = () => {
    const { q, opts } = qs[i];
    root.innerHTML = `${head('Evaluasi Petualang Kehati')}<div class="page-body paper p-4 sm:p-6 flex flex-col gap-3 max-w-3xl w-full mx-auto">
      <div class="flex items-center gap-3"><span class="chip">Soal ${i + 1}/${qs.length}</span><div class="flex-1 h-4 rounded-full bg-[#e9c98a] overflow-hidden border-2 border-[#c89a5b]"><div class="h-full bg-leaf transition-all" style="width:${i / qs.length * 100}%"></div></div><span class="chip">${emo('2b50')} ${score}</span></div>
      <div class="flex items-center gap-3 pop"><div class="shrink-0 float sprite-shadow" style="width:clamp(56px,12vh,96px)">${PK.art('burung-hantu')}</div><h2 class="font-head text-lg sm:text-2xl paper !rounded-2xl p-3 flex-1">${q}</h2></div>
      <div class="grid gap-2 sm:grid-cols-2">${opts.map(([t, ok], n) => `<button class="opt tilt paper !rounded-2xl p-3 text-left font-bold flex gap-3 items-center" data-ok="${ok ? 1 : 0}"><span class="shrink-0 w-9 h-9 rounded-full bg-sun border-2 border-woodd font-head grid place-items-center">${'ABCD'[n]}</span>${t}</button>`).join('')}</div>
      <div id="fb"></div></div>`;
  };
  const result = () => {
    const nilai = Math.round(score / qs.length * 100), star = nilai >= 90 ? 3 : nilai >= 70 ? 2 : nilai >= 50 ? 1 : 0;
    PK.state.evaluasi = Math.max(PK.state.evaluasi || 0, nilai); PK.save(); PK.sfx(star ? 'win' : 'bad'); if (star) PK.confetti(40);
    const msg = star === 3 ? 'Luar biasa! Kamu Penjaga Kehati sejati!' : star === 2 ? 'Bagus sekali! Sedikit lagi sempurna.' : star === 1 ? 'Lumayan! Pelajari materi lagi, ya.' : 'Jangan menyerah! Yuk baca materi dan coba lagi.';
    root.innerHTML = `${head('Hasil Evaluasi')}<div class="page-body paper p-6 text-center flex flex-col items-center justify-center gap-2 max-w-xl w-full mx-auto pop">
      <div class="text-7xl float">${emo(star >= 2 ? 'piala' : 'buku')}</div><h2 class="font-head text-2xl">${PK.state.nama || 'Petualang'}, ${msg}</h2>
      <div class="flex gap-2 text-5xl">${[1, 2, 3].map((n) => `<span style="${n <= star ? '' : 'filter:grayscale(1);opacity:.3'}" class="${n <= star ? 'float' : ''}">${emo('2b50')}</span>`).join('')}</div>
      <p class="font-head text-5xl text-leaf">${nilai}</p><p class="font-bold">${score} dari ${qs.length} soal benar</p>
      <div class="flex gap-3 flex-wrap justify-center mt-2"><button class="btn btn-leaf" data-act="again">↺ Ulangi Evaluasi</button><button class="btn btn-wood" data-act="materi">${emo('1f4d6')} Baca Materi</button><button class="btn" data-act="menu">Menu Utama</button></div></div>`;
  };
  root.addEventListener('click', (e) => {
    const a = e.target.closest('[data-act]'), o = e.target.closest('.opt');
    if (a) { const k = a.dataset.act; return k === 'again' ? (i = 0, score = 0, qs.sort(() => Math.random() - .5), ask()) : PK.go(k); }
    if (!o || o.disabled) return; const ok = o.dataset.ok === '1'; root.querySelectorAll('.opt').forEach((b) => { b.disabled = true; if (b.dataset.ok === '1') b.classList.add('ok-glow'); });
    if (!ok) { o.style.boxShadow = '0 0 0 4px #d64545'; o.classList.add('shake'); } else score++; PK.sfx(ok ? 'ok' : 'bad');
    $('#fb', root).innerHTML = `<div class="pop flex items-center gap-3 flex-wrap p-3 rounded-2xl ${ok ? 'bg-[#d6f5d9]' : 'bg-[#fde1de]'}"><b class="font-head text-lg">${emo(ok ? '2705' : '274c')} ${ok ? 'Benar!' : 'Belum tepat.'}</b><span class="font-semibold flex-1">${qs[i].why}</span>
      <button class="btn btn-leaf btn-sm" id="nx">${i === qs.length - 1 ? 'Lihat Hasil ➜' : 'Lanjut ➜'}</button></div>`;
    $('#nx', root).focus(); $('#nx', root).onclick = () => { i++; i < qs.length ? ask() : result(); };
  });
  ask();
};
