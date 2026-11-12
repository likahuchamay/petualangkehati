/* Scene non-misi: cover, intro, menu, profil, tujuan, cara, materi. */
(() => {
  const { $, emo } = PK;
  const D = PK.data, S = PK.scenes;
  const bgLayer = (img, blur = true) => `<div class="bg-fill ${blur ? 'bg-blur' : ''}" style="background-image:url(assets/img/${img})"></div><div class="bg-fill bg-dim"></div>`;
  const next = { profil: 'tujuan', tujuan: 'cara', cara: 'materi', materi: 'peta' };

  /* Kerangka halaman info: judul kayu, tombol kembali & lanjut */
  const shell = (el, { id, title, ico, bg = 'bg-gunung.jpg', body }) => {
    el.innerHTML = `${bgLayer(bg)}<div class="page">
      <div class="flex items-center justify-between gap-3">
        <button class="btn btn-wood btn-sm" data-go="menu">◀ Menu</button>
        <h1 class="wood sign-title text-xl sm:text-3xl px-5 py-2 flex items-center gap-3">${emo(ico)} ${title}</h1>
        <span class="w-24 hidden sm:block"></span>
      </div>
      <div class="page-body paper p-4 sm:p-6">${body}</div>
      <div class="flex justify-end">${next[id] ? `<button class="btn btn-leaf btn-lg" data-go="${next[id]}">${next[id] === 'menu' ? 'Ke Menu' : 'Lanjut'} ➜</button>` : ''}</div></div>`;
    PK.ambient(el); PK.tilt(el);
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-go]'); if (b) PK.go(b.dataset.go); });
    return $('.page-body', el);
  };

  /* ---------- Cover ---------- */
  S.cover = (el) => {
    el.innerHTML = `<video class="absolute inset-0 w-full h-full object-cover" src="assets/video/cover.mp4" poster="assets/img/cover-poster.jpg" muted playsinline autoplay></video>
      <div class="absolute left-3 top-3 flex gap-2 z-10"><img src="assets/img/logo-umm.jpg" alt="Logo Universitas Muhammadiyah Malang" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#c89a5b] bg-white"><img src="assets/img/logo-pgsd.jpg" alt="Logo PGSD" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#c89a5b] bg-white"></div>
      <div class="absolute inset-x-0 bottom-[7%] flex flex-col items-center gap-3">
        <button id="mulai" class="btn btn-leaf btn-lg pulse">${emo('25b6')} Mulai Petualangan</button>
        <span class="chip">${emo('1f9ed')} IPAS Kelas 4 SD • Keanekaragaman Hayati</span></div>`;
    $('video', el).play().catch(() => {});
    $('#mulai', el).onclick = () => { if (PK.state.musik) PK.musik(true); PK.sfx('ok'); PK.go('intro'); };
    $('#mulai', el).focus();
  };

  /* ---------- Intro: video perkenalan + nama ---------- */
  S.intro = (el) => {
    const T = D.tokoh;
    el.innerHTML = `<div class="absolute inset-0 overflow-hidden bg-black"><video class="absolute inset-0 w-full h-full object-cover" src="assets/video/intro.mp4" poster="assets/img/intro-poster.jpg" playsinline autoplay></video></div>
      <div class="absolute left-3 top-3 flex gap-2 z-10"><span class="chip">${emo('1f9d2')} ${T.cewek}</span><span class="chip">${emo('1f9d2')} ${T.cowok}</span></div>
      <button id="lewati" class="btn btn-wood btn-sm absolute top-3 right-3 z-10">Lewati ➜</button>
      <div id="form" class="absolute inset-x-0 bottom-6 flex justify-center px-3"></div>`;
    const v = $('video', el); PK.duck(true);
    const form = () => {
      $('#lewati', el).style.display = 'none';
      $('#form', el).innerHTML = `<form class="paper pop p-5 max-w-md w-full text-center" autocomplete="off"><h2 class="font-head text-2xl mb-1">Halo, Petualang! ${emo('1f44b')}</h2>
        <p class="mb-3 font-semibold">Kami ${T.cewek} dan ${T.cowok}. Siapa namamu? Ayo jelajahi keanekaragaman hayati bersama!</p>
        <input id="nama" maxlength="24" class="w-full rounded-xl border-4 border-[#c89a5b] bg-white px-4 py-2 text-lg font-bold text-center outline-none focus:border-sun" placeholder="Tulis namamu" value="${PK.state.nama.replace(/"/g, '')}" aria-label="Nama">
        <button class="btn btn-leaf btn-lg mt-4 w-full">Masuk Peta Petualangan ➜</button></form>`;
      const f = $('form', el), i = $('#nama', el); i.focus();
      f.onsubmit = (e) => { e.preventDefault(); PK.state.nama = i.value.trim().slice(0, 24) || 'Petualang'; PK.save(); PK.go('menu'); };
    };
    v.onended = form; v.onerror = form; v.play().catch(() => { v.muted = true; v.play().catch(form); });
    $('#lewati', el).onclick = () => { v.pause(); form(); };
    return () => PK.duck(false);
  };

  /* ---------- Menu utama: hotspot di atas poster Peta Petualangan ---------- */
  S.menu = (el) => {
    const W = 1216, H = 704, pct = (x, y, w, hh) => `left:${x / W * 100}%;top:${y / H * 100}%;width:${w / W * 100}%;height:${hh / H * 100}%`;
    const lockEv = !PK.allDone();
    const items = [['profil', 'Profil Pengembang', 97, 217, 216, 123], ['cara', 'Cara Penggunaan', 341, 217, 216, 123], ['tujuan', 'Tujuan Pembelajaran', 587, 217, 210, 123],
      ['materi', 'Materi dan Video Pembelajaran', 97, 362, 216, 126], ['peta', 'Misi Petualang', 341, 362, 216, 126], ['evaluasi', 'Evaluasi', 587, 362, 210, 126], ['cover', 'Menu Utama', 343, 620, 207, 42]];
    el.innerHTML = `<div class="bg-fill bg-blur" style="background-image:url(assets/img/menu-poster.jpg)"></div>
      <div class="stage" style="--ar:${W / H}"><img src="assets/img/menu-poster.jpg" class="w-full h-full" alt="Peta Petualangan">
        <video class="w-full h-full" style="left:0;top:0" src="assets/video/menu.mp4" poster="assets/img/menu-poster.jpg" muted playsinline autoplay></video>
        <div style="${pct(250, 470, 410, 150)};background:url(assets/img/menu-bersih.jpg) ${250 / (W - 410) * 100}% ${470 / (H - 150) * 100}%/${W / 410 * 100}% ${H / 150 * 100}%;-webkit-mask-image:radial-gradient(ellipse at center,#000 60%,transparent 100%);mask-image:radial-gradient(ellipse at center,#000 60%,transparent 100%);pointer-events:none"></div>
        ${items.map(([id, t, x, y, w, hh]) => `<button class="hot" data-go="${id}" aria-label="${t}" style="${pct(x, y, w, hh)}">${id === 'evaluasi' && lockEv ? `<span class="tag">${emo('1f512')} Selesaikan misi</span>` : ''}</button>`).join('')}
        <div class="absolute left-[2%] top-[2%] flex gap-2 flex-wrap"><span class="chip">${emo('1f464')} ${PK.state.nama || 'Petualang'}</span><span class="chip">${emo('2b50')} Pos ${PK.state.done.length}/${D.pos.length}</span></div></div>`;
    $('video', el).play().catch(() => {});
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-go]'); if (!b) return; const id = b.dataset.go;
      if (id === 'evaluasi' && lockEv) { PK.sfx('bad'); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return PK.toast(`${emo('1f512')} Selesaikan semua pos di Peta Misi dulu ya!`); }
      PK.sfx('pop'); PK.go(id);
    });
  };

  /* ---------- Profil ---------- */
  S.profil = (el) => {
    const p = D.pengembang, row = (ico, k, v) => `<div class="flex gap-3 items-start p-3 rounded-2xl bg-[#fbe9bd]"><span class="text-2xl">${emo(ico)}</span><div><small class="font-bold uppercase tracking-wide opacity-70">${k}</small><div class="font-bold text-lg leading-tight">${v}</div></div></div>`;
    shell(el, { id: 'profil', title: 'Profil Pengembang', ico: '1f464', body: `<div class="grid md:grid-cols-[240px_1fr] gap-5 items-center max-w-4xl mx-auto">
      <div class="text-center"><img src="assets/img/profil.jpg" alt="Foto ${p.nama}" class="mx-auto w-44 h-44 md:w-52 md:h-52 rounded-full object-cover object-top border-8 border-[#c89a5b] shadow-xl float">
        <h2 class="font-head text-xl mt-3">${p.nama}</h2><p class="font-bold opacity-70">Pengembang Media</p>
        <div class="flex justify-center gap-3 mt-3"><img src="assets/img/logo-umm.jpg" alt="Logo UMM" class="w-16 h-16 rounded-full border-4 border-[#c89a5b]"><img src="assets/img/logo-pgsd.jpg" alt="Logo PGSD" class="w-16 h-16 rounded-full border-4 border-[#c89a5b]"></div></div>
      <div class="grid sm:grid-cols-2 gap-3">${row('1f4db', 'Nama', p.nama)}${row('1f194', 'NIM', p.nim)}${row('1f4da', 'Program Studi', p.prodi)}${row('1f3eb', 'Fakultas', p.fakultas)}<div class="sm:col-span-2">${row('1f393', 'Universitas', p.univ)}</div></div></div>` });
  };

  /* ---------- Tujuan: CP, TP, Indikator (tab) ---------- */
  S.tujuan = (el) => {
    const tabs = [['tujuan', 'Tujuan', '1f3af'], ['cp', 'CP', '1f4d8'], ['tp', 'TP', '1f4cc'], ['ind', 'Indikator', '2705']];
    const cards = (arr) => arr.map((t, i) => `<li class="flex gap-3 items-start p-3 rounded-2xl bg-[#fbe9bd] pop" style="animation-delay:${i * 80}ms"><span class="shrink-0 w-9 h-9 rounded-full bg-leaf text-white font-head grid place-items-center">${i + 1}</span><span class="font-semibold text-lg">${t}</span></li>`).join('');
    const view = {
      tujuan: () => `<div class="flex gap-4 items-start"><img src="assets/img/ui/maskot.png" alt="" class="hidden sm:block w-28 float"><div><h2 class="font-head text-2xl mb-2">Tujuan Pembelajaran</h2><p class="text-xl leading-relaxed font-semibold">${D.tujuan}</p></div></div>`,
      cp: () => `<h2 class="font-head text-2xl mb-2">Capaian Pembelajaran (CP)</h2><p class="text-sm font-bold opacity-70 mb-2">IPAS • Fase B (Kelas 4 SD)</p><p class="text-xl leading-relaxed font-semibold">${D.cp}</p>`,
      tp: () => `<h2 class="font-head text-2xl mb-3">Tujuan Pembelajaran (TP)</h2><ol class="grid gap-3">${cards(D.tp)}</ol>`,
      ind: () => `<h2 class="font-head text-2xl mb-3">Indikator Pencapaian</h2><ol class="grid gap-3">${D.indikator.map(([k, t, pos], i) => `<li class="flex gap-3 items-center p-3 rounded-2xl bg-[#fbe9bd] pop" style="animation-delay:${i * 60}ms"><span class="shrink-0 px-3 py-1 rounded-full bg-leaf text-white font-head">${k}</span><span class="font-semibold flex-1">${t}</span><span class="chip shrink-0">${pos}</span></li>`).join('')}</ol>`
    };
    const body = shell(el, { id: 'tujuan', title: 'Tujuan Pembelajaran', ico: '1f3af', body: `<div role="tablist" class="flex gap-1 flex-wrap -mb-1">${tabs.map(([k, t, i], n) => `<button role="tab" class="tab" data-t="${k}" aria-selected="${n === 0}">${emo(i)} ${t}</button>`).join('')}</div><div id="tp" class="border-4 border-[#c89a5b] rounded-b-2xl rounded-tr-2xl p-4 bg-white/60" role="tabpanel"></div>` });
    const show = (k) => { $('#tp', body).innerHTML = view[k](); body.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', b.dataset.t === k)); };
    body.addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) { PK.sfx('pop'); show(b.dataset.t); } }); show('tujuan');
  };

  /* ---------- Cara penggunaan ---------- */
  S.cara = (el) => {
    const hud = (ico) => `<span class="hud-btn !relative grid place-items-center">${PK.art(ico)}</span>`;
    const demo = { // tampilan tombol asli sebagai contoh
      mulai: `<span class="btn btn-leaf btn-sm">${emo('25b6')} START</span>`, lewati: '<span class="btn btn-wood btn-sm">Lewati ➜</span>', menu: '<span class="btn btn-wood btn-sm">◀ Menu</span>',
      lanjut: '<span class="btn btn-leaf btn-sm">Lanjut ➜</span>', prev: '<span class="inline-flex gap-1"><span class="btn btn-wood btn-sm">◀</span><span class="btn btn-wood btn-sm">▶</span></span>',
      suara: hud('suara'), beranda: hud('beranda'), pos: `<span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sun border-4 border-woodd text-2xl">${PK.art('gembok-buka')}</span>`,
      ulang: '<span class="btn btn-wood btn-sm">↺ Ulangi</span>', bintang: `<span class="chip">${PK.art('bintang', 'emo')} 3</span>`
    };
    const body = shell(el, { id: 'cara', title: 'Petunjuk Penggunaan', ico: '1f4d6', bg: 'bg-air-terjun.jpg', body: `<p class="text-center font-bold mb-2">Sebelum memulai petualangan, simak petunjuk berikut, ya!</p>
      <div role="tablist" class="flex gap-1 flex-wrap -mb-1">${[['alur', 'Langkah Belajar', '1f463'], ['tombol', 'Fungsi Tombol', '1f518']].map(([k, t, i], n) => `<button role="tab" class="tab" data-t="${k}" aria-selected="${n === 0}">${emo(i)} ${t}</button>`).join('')}</div>
      <div class="border-4 border-[#c89a5b] rounded-b-2xl rounded-tr-2xl p-3 bg-white/60" role="tabpanel"><div id="tp"></div></div>` });
    const view = {
      alur: () => `<ol class="cara-list grid sm:grid-cols-2 lg:grid-cols-4 gap-3">${D.cara.map(([i, t, d], n) => `<li class="relative p-4 pt-6 rounded-2xl bg-[#fbe9bd] tilt pop" style="animation-delay:${n * 70}ms">
        <span class="absolute -top-3 -left-2 w-9 h-9 rounded-full bg-sun border-4 border-woodd font-head text-lg grid place-items-center">${n + 1}</span>
        <div class="text-5xl mb-1 card-art">${emo(i)}</div><h3 class="font-head text-lg leading-tight">${t}</h3><p class="text-sm font-semibold mt-1">${d}</p></li>`).join('')}</ol>`,
      tombol: () => `<ol class="grid md:grid-cols-2 gap-3">${D.tombol.map(([k, t, d], n) => `<li class="flex items-center gap-3 p-3 rounded-2xl bg-[#fbe9bd] pop" style="animation-delay:${n * 50}ms">
        <span class="shrink-0 w-8 h-8 rounded-full bg-leaf text-white font-head grid place-items-center">${n + 1}</span><span class="shrink-0 w-32 grid place-items-center">${demo[k]}</span>
        <span class="leading-tight"><b class="font-head block">${t}</b><span class="text-sm font-semibold">${d}</span></span></li>`).join('')}</ol>`
    };
    const show = (k) => { $('#tp', body).innerHTML = view[k](); body.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', b.dataset.t === k)); };
    body.addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) { PK.sfx('pop'); show(b.dataset.t); } }); show('alur');
  };

  /* ---------- Materi + video ---------- */
  S.materi = (el) => {
    const body = shell(el, { id: 'materi', title: 'Materi & Video Pembelajaran', ico: '1f4d6', bg: 'bg-air-terjun.jpg', body: `<div class="two grid lg:grid-cols-2 gap-4 h-full">
      <section><h2 class="font-head text-xl mb-2">${emo('1f3ac')} Video Animasi Pembelajaran</h2><div id="vbox" class="rounded-2xl overflow-hidden bg-black aspect-video relative border-4 border-woodd shadow-lg">
        <video id="vid" class="w-full h-full" poster="assets/img/bg-air-terjun.jpg" controls playsinline preload="metadata"></video></div>
        <div id="vlist" class="flex flex-wrap gap-2 mt-2">${D.videoMateri.map(([, t], n) => `<button class="btn btn-wood btn-sm" data-v="${n}">${n + 1}. ${t}</button>`).join('')}</div></section>
      <section class="flex flex-col"><h2 class="font-head text-xl mb-2">${emo('1f4da')} Ringkasan Materi</h2><div id="slide" class="flex-1"></div>
        <div class="flex items-center justify-between mt-3"><button class="btn btn-wood btn-sm" id="prev">◀</button><div id="dots" class="flex gap-2"></div><button class="btn btn-wood btn-sm" id="nxt">▶</button></div></section></div>` });
    const vid = $('#vid', body); let vi = 0; PK.duck(true);
    const play = (n, auto) => { // putar klip ke-n; bila berkas belum ada, tampilkan petunjuk
      vi = n; $('.nofile', body)?.remove(); vid.src = 'assets/video/' + D.videoMateri[n][0];
      body.querySelectorAll('[data-v]').forEach((b) => b.classList.toggle('btn-leaf', +b.dataset.v === n)); auto && vid.play().catch(() => {});
    };
    vid.onerror = () => $('#vbox', body).insertAdjacentHTML('beforeend', `<div class="nofile absolute inset-0 grid place-items-center text-center text-cream p-4 bg-black/70 pointer-events-none"><div><div class="text-5xl mb-2">${emo('1f3ac')}</div><p class="font-head text-lg">Video "${D.videoMateri[vi][1]}" belum ditambahkan</p><p class="text-sm opacity-80">Letakkan <b>${D.videoMateri[vi][0]}</b> di folder assets/video</p></div></div>`);
    vid.onended = () => vi < D.videoMateri.length - 1 && play(vi + 1, true); // lanjut otomatis ke klip berikutnya
    $('#vlist', body).onclick = (e) => { const b = e.target.closest('[data-v]'); if (b) { PK.sfx('pop'); play(+b.dataset.v, true); } }; play(0);
    let i = 0;
    const draw = () => {
      const m = D.materi[i];
      $('#slide', body).innerHTML = `<div class="pop h-full rounded-2xl bg-[#fbe9bd] p-4 text-center flex flex-col items-center justify-center gap-2"><div class="text-5xl card-art float">${emo(m.ico)}</div><h3 class="font-head text-2xl">${m.judul}</h3>
        <p class="font-semibold text-lg leading-snug">${m.teks}</p><div class="flex gap-3 flex-wrap justify-center">${m.contoh.map(([c, t], n) => `<figure class="tilt paper !rounded-2xl p-2 grid place-items-center" style="animation-delay:${n * .3}s"><span class="text-6xl card-art">${PK.pic(c) || emo(c)}</span><figcaption class="text-sm font-extrabold">${t}</figcaption></figure>`).join('')}</div>${m.ex ? `<p class="chip">${m.ex}</p>` : ''}</div>`;
      $('#dots', body).innerHTML = D.materi.map((_, n) => `<button aria-label="Materi ${n + 1}" data-n="${n}" class="w-3.5 h-3.5 rounded-full border-2 border-woodd ${n === i ? 'bg-sun scale-125' : 'bg-white'}"></button>`).join('');
    };
    const set = (n) => { i = (n + D.materi.length) % D.materi.length; PK.sfx('pop'); draw(); };
    $('#prev', body).onclick = () => set(i - 1); $('#nxt', body).onclick = () => set(i + 1);
    $('#dots', body).onclick = (e) => { const b = e.target.closest('[data-n]'); if (b) set(+b.dataset.n); }; draw();
    return () => PK.duck(false);
  };
})();
