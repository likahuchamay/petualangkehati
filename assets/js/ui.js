/* Helper tampilan: dekorasi hidup (kupu-kupu terbang, tanaman bergoyang), tilt 3D, bintang, kartu hasil. */
(() => {
  const { h, art } = { h: PK.h, art: PK.art };

  /* Lapisan dekorasi di belakang konten halaman */
  PK.ambient = (el, plants = ['pohon', 'bunga', 'padi', 'kelapa']) => {
    const [a, b, c, d] = plants, corners = plants.length > 0;
    const d1 = h(`<div class="ambient" aria-hidden="true">
      <span class="amb fly f1">${art('kupu')}</span><span class="amb fly f2">${art('burung')}</span><span class="amb fly f3">${art('kupu')}</span>
      ${corners ? `<span class="amb corner l1">${art(a)}</span><span class="amb corner l2">${art(b)}</span><span class="amb corner r1">${art(d)}</span><span class="amb corner r2">${art(c)}</span>` : ''}</div>`);
    el.insertBefore(d1, el.querySelector('.page, .m-wrap') || null);
  };

  /* Efek miring 3D mengikuti pointer untuk elemen .tilt */
  PK.tilt = (root) => {
    root.addEventListener('pointermove', (e) => {
      const t = e.target.closest('.tilt'); if (!t || e.pointerType === 'touch') return;
      const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      t.style.transform = `perspective(700px) rotateX(${(-y * 9).toFixed(1)}deg) rotateY(${(x * 11).toFixed(1)}deg) translateY(-3px)`;
    });
    root.addEventListener('pointerout', (e) => { const t = e.target.closest('.tilt'); if (t && !t.contains(e.relatedTarget)) t.style.transform = ''; });
  };

  /* Deretan bintang (n dari total) */
  PK.stars = (n, total = 3, size = '1.4em') => Array.from({ length: total }, (_, i) => `<span style="font-size:${size}">${art(i < n ? 'bintang' : 'bintang-kosong')}</span>`).join('');
  PK.totalStars = () => Object.values(PK.state.stars || {}).reduce((a, b) => a + b, 0);

  /* Kartu hasil misi: bintang muncul satu per satu. Mengembalikan promise saat tombol ditekan. */
  PK.missionResult = (title, n, text) => new Promise((res) => {
    const bg = h(`<div class="modal-bg" role="dialog" aria-modal="true"><div class="modal paper" style="min-width:min(420px,92vw)">
      <div class="float" style="font-size:5rem;line-height:1">${art('piala')}</div><h2 class="font-head text-3xl mt-1">Misi Berhasil!</h2><p class="font-bold opacity-70">${title}</p>
      <div class="flex justify-center gap-1 my-3" id="st">${[0, 1, 2].map(() => `<span style="font-size:3.4rem" class="star-slot">${art('bintang-kosong')}</span>`).join('')}</div>
      <p class="font-semibold">${text}</p><div class="mt-4"><button class="btn btn-leaf btn-lg" id="ok">Lanjut ➜</button></div></div></div>`);
    PK.$('#overlay').append(bg);
    bg.querySelectorAll('.star-slot').forEach((s, i) => { if (i < n) setTimeout(() => { s.innerHTML = art('bintang'); s.classList.add('pop'); PK.sfx('ok'); PK.confetti(8, ['bintang']); }, 500 + i * 450); });
    const ok = PK.$('#ok', bg); ok.focus(); ok.onclick = () => { bg.remove(); res(); };
  });

  /* Kartu pengantar sebelum misi dimulai */
  PK.briefing = (pos) => new Promise((res) => {
    const bg = h(`<div class="modal-bg" role="dialog" aria-modal="true"><div class="modal paper" style="width:min(520px,94vw)">
      <div class="float sprite-shadow hide-short" style="font-size:5.5rem;line-height:1">${art(pos.art)}</div><span class="chip mt-1 hide-short">Pos ${pos.id}</span><h2 class="font-head text-3xl my-1">${pos.judul}</h2>
      <ol class="text-left grid gap-2 my-3">${pos.how.map((t, i) => `<li class="flex gap-3 items-start p-2.5 rounded-2xl bg-[#fbe9bd] pop" style="animation-delay:${150 + i * 120}ms"><span class="shrink-0 w-7 h-7 rounded-full bg-leaf text-white font-head grid place-items-center">${i + 1}</span><span class="font-bold">${t}</span></li>`).join('')}</ol>
      <button class="btn btn-leaf btn-lg" id="bgo">Mulai Misi ▶</button></div></div>`);
    PK.$('#overlay').append(bg); const b = PK.$("#bgo", bg); b.focus(); b.onclick = () => { bg.remove(); PK.sfx("ok"); res(); };
  });
})();
