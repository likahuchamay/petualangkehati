/* Sprite tumbuhan & ikon ekosistem. a-sway = bergoyang tertiup angin. */
(() => {
  const { def, st, eye, cheek, hi, line, K } = PK.sprite, S = st();
  const leaf = (x, y, rot, c = '#4cb84a') => `<path d="M${x} ${y} q8 -14 22 -12 q-2 14 -22 12Z" fill="${c}" ${st(2)} transform="rotate(${rot} ${x} ${y})"/>`;

  const mawar = (c, d) => `<g class="a-sway" style="transform-origin:50% 100%"><path d="M50 56 L50 96" ${st(2.4)} stroke="#2f8a35" stroke-width="5"/>${leaf(50, 80, -20)}${leaf(50, 72, 200)}
    <circle cx="50" cy="38" r="26" fill="${c}" ${S}/><path d="M28 34 Q50 12 72 34 Q60 22 50 24 Q40 22 28 34Z" fill="${d}" opacity=".45"/><circle cx="50" cy="40" r="17" fill="${c}" stroke="${d}" stroke-width="2"/>
    <path d="M50 40 m-7 0 a7 7 0 1 1 7 7 a11 11 0 1 1 -11 -11 a15 15 0 1 1 15 15" fill="none" stroke="${d}" stroke-width="2.6" stroke-linecap="round"/>${hi(40, 24, 9, 4, -30)}</g>`;
  def('mawar-merah', mawar('#ec3b4d', '#a81a2a'));
  def('mawar-putih', mawar('#ffffff', '#c9c9d9'));
  def('mawar-pink', mawar('#ff8fb8', '#d9548a'));

  def('bunga', `<g class="a-sway" style="transform-origin:50% 100%"><path d="M50 52 L50 96" ${st(2.4)} stroke="#2f8a35" stroke-width="5"/>${leaf(50, 82, -15)}${leaf(50, 72, 195)}
    ${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="50" cy="24" rx="11" ry="17" fill="#ff5d7a" ${S} transform="rotate(${r} 50 40)"/>`).join('')}<circle cx="50" cy="40" r="9" fill="#ffd23f" ${S}/><circle cx="47" cy="37" r="3" fill="#fff" opacity=".6"/></g>`);

  def('taman', `<g class="a-sway" style="transform-origin:50% 70%"><path d="M50 60 L50 38" ${st(2.4)} stroke="#2f8a35" stroke-width="5"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((r) => `<ellipse cx="50" cy="16" rx="6" ry="11" fill="#ffc60a" ${S} transform="rotate(${r} 50 30)"/>`).join('')}<circle cx="50" cy="30" r="9" fill="#8a5a2e" ${S}/></g>
    <path d="M26 62 L74 62 L68 94 L32 94Z" fill="#d9774a" ${S}/><rect x="22" y="56" width="56" height="10" rx="4" fill="#e88a5a" ${S}/>${hi(36, 78, 4, 10)}`);

  const pohon = (c, d) => `<rect x="43" y="56" width="14" height="38" rx="3" fill="#8a5a2e" ${S}/><path d="M50 70 L38 58 M50 76 L62 62" fill="none" ${st(2.6)} stroke="#8a5a2e"/><g class="a-sway" style="transform-origin:50% 100%">
    <circle cx="30" cy="48" r="19" fill="${d}" ${S}/><circle cx="70" cy="48" r="19" fill="${d}" ${S}/><circle cx="50" cy="30" r="25" fill="${c}" ${S}/><circle cx="50" cy="52" r="21" fill="${c}" ${S}/>${hi(40, 22, 11, 5, -25)}${hi(26, 42, 6, 3, -25)}</g>`;
  def('pohon', pohon('#4cc254', '#38a343'));
  def('pohon-jati', pohon('#6fb83a', '#559a2a'));

  def('kelapa', `${line('M46 94 C50 70 54 50 52 30', '#a9733a', 8)}<g class="a-sway" style="transform-origin:52% 36%">${[-70, -35, 0, 35, 70, 160, 200].map((r) => `<path d="M52 30 C70 14 92 18 98 34 C84 28 68 30 52 30Z" fill="#46b94a" ${st(2.2)} transform="rotate(${r - 20} 52 30)"/>`).join('')}
    <circle cx="48" cy="34" r="6" fill="#7a4a22" ${S}/><circle cx="58" cy="35" r="6" fill="#8a5a2e" ${S}/></g>`);

  def('padi', `${[[34, -8, 0], [50, 0, 6], [66, 8, 12]].map(([x, r, d]) => `<g class="a-sway" style="transform-origin:${x}% 100%;animation-delay:-${d / 4}s"><path d="M${x} 96 C${x} 70 ${x + r} 50 ${x + r * 1.4} 24" fill="none" ${st(2.2)} stroke="#4aa63a" stroke-width="4"/>
      ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${x + r * 1.4 + (i % 2 ? 5 : -5)}" cy="${26 + i * 7}" rx="4.2" ry="7" fill="#ffcf40" ${st(1.6)} transform="rotate(${i % 2 ? 25 : -25} ${x + r * 1.4} ${26 + i * 7})"/>`).join('')}</g>`).join('')}
    <path d="M20 96 Q30 80 40 96Z M58 96 Q68 78 80 96Z" fill="#4aa63a" ${st(2)}/>`);

  def('kapas', `<g class="a-sway" style="transform-origin:50% 100%"><path d="M50 96 L50 50" ${st(2.4)} stroke="#2f8a35" stroke-width="5"/>${leaf(50, 86, -20)}${leaf(50, 76, 200)}
    <path d="M26 50 L34 30 L50 40 L66 30 L74 50 L62 58 L38 58Z" fill="#7a4a22" ${S}/>${[[38, 36, 11], [62, 36, 11], [50, 28, 13], [46, 44, 11], [58, 44, 10]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${st(2)}/>`).join('')}${hi(46, 24, 6, 3, -20)}</g>`);

  def('jahe', `${[44, 54].map((x, i) => `<path d="M${x} 52 Q${x - 8 + i * 16} 30 ${x - 14 + i * 28} 16 Q${x + 4} 30 ${x} 52Z" fill="#46b94a" ${st(2.2)} class="a-sway" style="transform-origin:50% 100%"/>`).join('')}
    <path d="M10 76 C6 60 26 56 32 62 C36 46 56 44 60 58 C72 48 94 56 90 72 C90 86 62 92 46 86 C30 92 10 90 10 76Z" fill="#dba35a" ${S}/><path d="M26 62 Q22 76 28 84 M60 60 Q56 74 62 86 M44 52 Q40 60 44 70" fill="none" stroke="#a9763a" stroke-width="2.4" stroke-linecap="round"/>${hi(34, 68, 9, 3.5, -10)}${hi(72, 66, 7, 3, -10)}`);

  def('mangrove', `<path d="M8 90 Q30 84 50 90 T92 90 L92 100 L8 100Z" fill="#4aa3e0" ${st(2)}/>${[[24, 2], [38, 0], [62, 0], [76, 2]].map(([x, d]) => line(`M50 62 Q${x + (x < 50 ? -4 : 4)} 74 ${x} 92`, '#8a5a2e', 4)).join('')}
    <rect x="45" y="40" width="10" height="26" rx="3" fill="#8a5a2e" ${S}/><g class="a-sway" style="transform-origin:50% 100%"><circle cx="30" cy="34" r="16" fill="#2f9a4a" ${S}/><circle cx="70" cy="34" r="16" fill="#2f9a4a" ${S}/><circle cx="50" cy="22" r="20" fill="#3fb85a" ${S}/>${hi(42, 14, 9, 4, -25)}</g>`);

  def('karang', `${line('M50 96 L50 62 M50 78 L30 54 M50 72 L72 48 M30 54 L22 34 M30 54 L40 32 M72 48 L64 28 M72 48 L82 32', '#ff6b81', 8)}${[[22, 34], [40, 32], [64, 28], [82, 32], [50, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#ff9aa9" ${st(2)}/>`).join('')}<ellipse cx="50" cy="96" rx="30" ry="5" fill="#e8c88a" ${S}/>`);

  def('bibit', `<g class="a-sway" style="transform-origin:50% 100%"><path d="M50 74 L50 46" ${st(2.6)} stroke="#2f8a35" stroke-width="5"/><path d="M50 52 C30 52 20 38 22 24 C40 24 50 36 50 52Z" fill="#5fd068" ${S}/><path d="M50 46 C70 46 80 32 78 18 C60 18 50 30 50 46Z" fill="#46b94a" ${S}/><path d="M50 52 Q40 42 28 32" fill="none" stroke="#fff" stroke-width="1.6" opacity=".6"/></g>
    <path d="M14 94 C14 72 86 72 86 94Z" fill="#8a5a2e" ${S}/><path d="M30 84 q4 -3 8 0 M56 82 q4 -3 8 0" fill="none" stroke="#6b4220" stroke-width="2.4" stroke-linecap="round"/>`);

  /* Ikon ekosistem (lencana bulat) */
  def('eko-hutan', `<circle cx="50" cy="50" r="46" fill="#9fdcff" ${S}/><path d="M5 64 Q50 44 95 64 A46 46 0 0 1 5 64Z" fill="#4cb85a" ${S}/>
    ${[[28, 62, 16], [72, 64, 14]].map(([x, y, s]) => `<path d="M${x} ${y - s * 1.4} L${x - s * .8} ${y} L${x + s * .8} ${y}Z M${x} ${y - s * .7} L${x - s} ${y + s * .5} L${x + s} ${y + s * .5}Z" fill="#2c8a4a" ${st(2)}/><rect x="${x - 2}" y="${y + s * .5}" width="4" height="8" fill="#6b4220"/>`).join('')}
    <circle cx="50" cy="52" r="16" fill="#3fb85a" ${S}/><rect x="47" y="64" width="6" height="14" fill="#8a5a2e" ${S}/><circle cx="72" cy="20" r="7" fill="#ffd23f" ${S}/>${hi(44, 46, 6, 3, -25)}`);
  def('eko-sawah', `<circle cx="50" cy="50" r="46" fill="#b8e6ff" ${S}/><circle cx="72" cy="22" r="8" fill="#ffd23f" ${S}/><path d="M6 60 Q50 38 94 60 L94 80 Q50 96 6 80Z" fill="#8bd04a" ${S}/><path d="M12 68 Q50 50 88 68 M14 76 Q50 60 86 76" fill="none" stroke="#5fae2e" stroke-width="3"/>
    ${[26, 40, 54, 68].map((x) => `<path d="M${x} 66 Q${x - 3} 54 ${x + 2} 48" fill="none" stroke="#e8b52e" stroke-width="3" stroke-linecap="round"/>`).join('')}<path d="M10 30 q6 -10 16 -4 q8 -6 14 4Z" fill="#fff" ${st(2)}/>`);
  def('eko-laut', `<circle cx="50" cy="50" r="46" fill="#4db8f0" ${S}/><path d="M6 40 Q20 32 34 40 T62 40 T94 40 L94 50 L6 50Z" fill="#fff" opacity=".35"/><path d="M8 66 Q50 100 92 66 A46 46 0 0 1 8 66Z" fill="#1f86d0"/>
    <g transform="translate(30 44) scale(.4)"><path d="M68 50 L97 26 Q91 50 97 74Z" fill="#ff7a00" ${st(5)}/><ellipse cx="45" cy="50" rx="31" ry="22" fill="#ffa733" ${st(5)}/><circle cx="28" cy="44" r="5" fill="#fff"/><circle cx="29" cy="44" r="2.5" fill="${K}"/></g>
    ${[[24, 30, 4], [74, 62, 5], [64, 26, 3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".8"/>`).join('')}<circle cx="50" cy="50" r="46" fill="none" ${S}/>`);
  def('matahari', `${[0, 45, 90, 135, 180, 225, 270, 315].map((r) => `<path d="M50 4 L56 20 L44 20Z" fill="#ffb703" transform="rotate(${r} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="24" fill="#ffd23f" ${S}/>${hi(42, 40, 8, 4, -30)}${eye(42, 50, 3)}${eye(58, 50, 3)}<path d="M42 60 Q50 66 58 60" fill="none" ${st(2)}/>`);
})();
