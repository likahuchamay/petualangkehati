/* Kerangka halaman misi: kartu pengantar, header, area game, maskot + balon bicara, progres, bintang & hasil. */
PK.scenes.misi = (el, { id = 1 } = {}) => {
  const { $, emo, art } = { ...PK }, pos = PK.data.pos[id - 1], mission = PK.missions['m' + id];
  if (!pos || !mission) return PK.go('peta');
  if (id > PK.state.done.length + 1) { PK.toast(`${emo('gembok')} Pos ini masih terkunci`, 'bad'); return PK.go('peta'); }
  el.innerHTML = `<div class="bg-fill bg-blur" style="background-image:url(assets/img/${pos.bg})"></div><div class="bg-fill bg-dim"></div>
    <div class="m-wrap">
      <header class="m-head">
        <button class="btn btn-wood btn-sm" id="back" aria-label="Kembali ke peta">◀ Peta</button>
        <div class="wood m-badge flex items-center gap-2"><span class="inline-flex" style="width:1.4em;height:1.4em">${art('peta')}</span> Pos ${id}</div>
        <div class="wood px-4 py-1.5 min-w-0 flex-1 sm:flex-none"><h1 class="sign-title text-lg sm:text-2xl leading-tight truncate">${pos.judul}</h1><p class="text-xs sm:text-sm font-semibold opacity-90 truncate">${pos.sub}</p></div>
        <button class="btn btn-sm btn-wood hidden sm:inline-flex" id="how" aria-label="Lihat petunjuk misi">${emo('lampu')} Petunjuk</button>
      </header>
      <div class="m-main" id="game"></div>
      <footer class="m-foot">
        <img class="mascot" src="assets/img/ui/maskot.png" alt="Maskot petualang">
        <div class="say paper" id="say" aria-live="polite"></div>
        <span class="chip shrink-0" id="prog">${emo('bintang')} <span>0/0</span></span>
        <button class="btn btn-leaf btn-lg shrink-0" id="next" disabled>Selesai ➜</button>
      </footer></div>`;
  PK.ambient(el, []); PK.tilt(el);
  let finished = false, mistakes = 0, closing = false;
  const stars = () => (mistakes <= (mission.easy ?? 1) ? 3 : mistakes <= (mission.ok ?? 4) ? 2 : 1);
  const finish = async () => {
    if (closing) return; closing = true; $('#next', el).disabled = true;
    const n = stars(), first = !PK.state.done.includes(id);
    PK.state.stars[id] = Math.max(PK.state.stars[id] || 0, n); PK.save();
    await PK.missionResult(pos.judul, n, n === 3 ? 'Sempurna! Kamu hebat sekali, tanpa banyak salah.' : n === 2 ? 'Bagus! Sedikit lagi kamu bisa meraih tiga bintang.' : 'Berhasil! Ulangi misi ini nanti untuk bintang lebih banyak.');
    await PK.celebrate();
    PK.complete(id) && first ? PK.go('peta', { justDone: id }) : PK.go('peta');
  };
  const ctx = {
    say: (t) => { const s = $('#say', el); s.innerHTML = t; s.classList.remove('pop'); void s.offsetWidth; s.classList.add('pop'); },
    progress: (n, total, label = '') => { $('#prog span', el).textContent = `${label ? label + ' ' : ''}${n}/${total}`; },
    mistake: () => { mistakes++; },
    done: () => {
      if (finished) return; finished = true; const b = $('#next', el); b.disabled = false; b.classList.add('pulse'); b.onclick = finish;
      PK.sfx('win'); PK.confetti(26); ctx.say(`${emo('bintang')} Misi berhasil! Tunggu sebentar ya...`); setTimeout(finish, 1100);
    }
  };
  $('#back', el).onclick = () => PK.go('peta');
  $('#how', el).onclick = () => PK.briefing(pos);
  ctx.say(`Halo ${PK.state.nama || 'Petualang'}! ${pos.sub}`);
  const cleanup = mission.mount($('#game', el), ctx);
  PK.briefing(pos);
  return cleanup;
};
