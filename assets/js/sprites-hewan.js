/* Sprite hewan. Kelas animasi: a-blink a-wag a-ear a-flap a-flapb a-sway a-bobh a-claw a-tongue */
(() => {
  const { def, st, eye, cheek, hi, mirror, line, K } = PK.sprite, S = st();

  def('kelinci', `<g class="a-ear"><ellipse cx="37" cy="24" rx="7.5" ry="19" fill="#fff" ${S} transform="rotate(-8 37 24)"/><ellipse cx="37" cy="27" rx="3.6" ry="12" fill="#ffb3c6" transform="rotate(-8 37 27)"/></g>
    <g class="a-ear" style="animation-delay:-1.4s"><ellipse cx="63" cy="24" rx="7.5" ry="19" fill="#fff" ${S} transform="rotate(8 63 24)"/><ellipse cx="63" cy="27" rx="3.6" ry="12" fill="#ffb3c6" transform="rotate(8 63 27)"/></g>
    <ellipse cx="50" cy="75" rx="27" ry="20" fill="#fff" ${S}/><circle cx="78" cy="79" r="7" fill="#fff" ${S}/><ellipse cx="35" cy="93" rx="11" ry="6" fill="#fff" ${S}/><ellipse cx="65" cy="93" rx="11" ry="6" fill="#fff" ${S}/>
    <circle cx="50" cy="52" r="22" fill="#fff" ${S}/>${hi(41, 41, 8, 4, -20)}${eye(41, 50, 4)}${eye(59, 50, 4)}<path d="M47 57 L53 57 L50 61Z" fill="#ff7a95" ${st(1.5)}/><path d="M50 61 Q46 66 42 63 M50 61 Q54 66 58 63" fill="none" ${st(1.8)}/>${cheek(34, 60)}${cheek(66, 60)}`);

  def('rusa', `<path d="M70 26 L66 8 M68 16 L58 11 M66 8 L70 1 M78 24 L84 8 M81 15 L90 11" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M70 26 L66 8 M68 16 L58 11 M66 8 L70 1 M78 24 L84 8 M81 15 L90 11" fill="none" stroke="#c9a46a" stroke-width="3.2" stroke-linecap="round"/>
    <rect x="25" y="68" width="6" height="24" rx="3" fill="#c98a4b" ${S}/><rect x="35" y="70" width="6" height="22" rx="3" fill="#b5763a" ${S}/><rect x="58" y="70" width="6" height="22" rx="3" fill="#b5763a" ${S}/><rect x="68" y="68" width="6" height="24" rx="3" fill="#c98a4b" ${S}/>
    <path class="a-wag" d="M22 56 Q10 52 14 44 Q22 46 26 54Z" fill="#fff" ${S} style="transform-origin:100% 100%"/>
    <ellipse cx="48" cy="62" rx="28" ry="15" fill="#d9954f" ${S}/><ellipse cx="48" cy="69" rx="19" ry="7" fill="#f6dbb0"/>${[[34, 56], [46, 53], [58, 57], [40, 63], [53, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.1" fill="#fff6e0"/>`).join('')}
    <path d="M62 55 L70 30 L82 34 L76 62Z" fill="#d9954f" ${S}/><ellipse cx="80" cy="30" rx="12" ry="9.5" fill="#d9954f" ${S} transform="rotate(12 80 30)"/><ellipse cx="90" cy="34" rx="6" ry="5" fill="#f6dbb0" ${S}/><circle cx="94" cy="33" r="2.4" fill="${K}"/>
    <g class="a-ear"><ellipse cx="71" cy="25" rx="4" ry="7.5" fill="#d9954f" ${S} transform="rotate(-35 71 25)"/><ellipse cx="71" cy="25" rx="2" ry="4.5" fill="#ffb3c6" transform="rotate(-35 71 25)"/></g>${eye(82, 28, 3.6)}${hi(76, 25, 5, 2.5, 10)}`);

  def('kupu', `<g class="a-flap" style="transform-origin:50% 50%"><g ${S}><path d="M50 46 C32 6 4 12 8 40 C10 54 34 54 50 49Z" fill="#ff9f1c"/><path d="M50 52 C32 52 14 62 21 80 C30 92 46 72 50 58Z" fill="#ffc94a"/>${mirror(`<path d="M50 46 C32 6 4 12 8 40 C10 54 34 54 50 49Z" fill="#ff9f1c"/><path d="M50 52 C32 52 14 62 21 80 C30 92 46 72 50 58Z" fill="#ffc94a"/>`)}</g>
    ${[[22, 30, 5], [20, 44, 3], [30, 72, 3.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".9"/><circle cx="${100 - x}" cy="${y}" r="${r}" fill="#fff" opacity=".9"/>`).join('')}</g>
    <ellipse cx="50" cy="54" rx="4" ry="18" fill="#4a2c14" ${S}/><circle cx="50" cy="36" r="5" fill="#4a2c14" ${S}/><path d="M48 32 Q44 18 36 14 M52 32 Q56 18 64 14" fill="none" ${st(2)}/>`);

  def('burung', `<path class="a-wag" d="M70 54 L97 42 L94 60 L98 70 L70 66Z" fill="#2a6fdb" ${S} style="transform-origin:0% 50%"/>
    <ellipse cx="50" cy="56" rx="29" ry="22" fill="#4aa3ff" ${S}/><ellipse cx="44" cy="65" rx="18" ry="11" fill="#eaf5ff"/><circle cx="32" cy="40" r="17" fill="#4aa3ff" ${S}/>
    <path d="M30 24 Q34 12 42 20 Q38 14 46 14 Q44 24 38 26Z" fill="#2a6fdb" ${S}/><path d="M17 36 L3 41 L17 47Z" fill="#ffb703" ${S}/>${hi(27, 33, 6, 3, -25)}${eye(28, 38, 4.2)}${cheek(26, 48, 2.6)}
    <g class="a-flapb"><path d="M42 50 Q70 36 84 56 Q66 70 44 62Z" fill="#2a6fdb" ${S} style="transform-origin:15% 70%"/><path d="M52 54 Q66 48 76 56" fill="none" stroke="#7bbcff" stroke-width="2.4" stroke-linecap="round"/></g>
    <path d="M46 78 L44 90 M56 78 L56 90 M40 91 L48 91 M52 91 L60 91" fill="none" ${st(2.4)} stroke="#e07b00"/>`);

  def('katak', `<ellipse cx="22" cy="86" rx="14" ry="7" fill="#4fbf5a" ${S}/><ellipse cx="78" cy="86" rx="14" ry="7" fill="#4fbf5a" ${S}/>
    <ellipse cx="50" cy="66" rx="33" ry="24" fill="#5fd068" ${S}/><ellipse cx="50" cy="75" rx="22" ry="14" fill="#cdf5b8"/>${[[30, 60], [70, 58], [60, 70], [38, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#3da84a" opacity=".6"/>`).join('')}
    <circle cx="32" cy="40" r="12" fill="#5fd068" ${S}/><circle cx="68" cy="40" r="12" fill="#5fd068" ${S}/>${eye(32, 39, 7)}${eye(68, 39, 7)}
    <path d="M32 64 Q50 78 68 64" fill="none" ${st(2.6)}/><circle cx="44" cy="55" r="1.4" fill="${K}"/><circle cx="56" cy="55" r="1.4" fill="${K}"/>${cheek(26, 58, 3.4)}${cheek(74, 58, 3.4)}${hi(50, 56, 14, 3)}
    <ellipse cx="33" cy="91" rx="9" ry="4.5" fill="#4fbf5a" ${S}/><ellipse cx="67" cy="91" rx="9" ry="4.5" fill="#4fbf5a" ${S}/>`);

  def('kura', `<ellipse cx="28" cy="84" rx="10" ry="8" fill="#a8d96b" ${S}/><ellipse cx="62" cy="84" rx="10" ry="8" fill="#a8d96b" ${S}/><path d="M8 74 L2 78 L10 80Z" fill="#a8d96b" ${S}/>
    <g class="a-bobh" style="transform-origin:0% 60%"><ellipse cx="86" cy="62" rx="12" ry="10.5" fill="#a8d96b" ${S}/>${eye(90, 59, 3.4)}<path d="M92 67 Q96 66 98 63" fill="none" ${st(1.8)}/>${cheek(86, 67, 2.4)}</g>
    <path d="M10 76 C8 28 80 24 82 76Z" fill="#8a6a3a" ${S}/><path d="M18 74 C18 40 74 38 74 74Z" fill="#a98450"/>
    ${['M30 52 L40 46 L50 52 L46 62 L34 62Z', 'M52 52 L62 46 L68 56 L62 64 L50 62Z', 'M34 64 L46 64 L50 74 L30 74Z', 'M52 64 L64 64 L70 74 L52 74Z'].map((d) => `<path d="${d}" fill="#c2a06a" stroke="#6b4e24" stroke-width="2" stroke-linejoin="round"/>`).join('')}${hi(36, 44, 10, 3.5, -25)}
    <rect x="8" y="72" width="76" height="9" rx="4.5" fill="#e8d3a0" ${S}/>`);

  const fish = (body, belly, fin, stripes = '') => `<path class="a-wag" d="M68 50 L97 26 Q91 50 97 74Z" fill="${fin}" ${S} style="transform-origin:0% 50%"/>
    <path d="M30 30 Q44 10 62 30Z" fill="${fin}" ${S}/><path d="M38 70 Q46 86 56 70Z" fill="${fin}" ${S}/><ellipse cx="45" cy="50" rx="31" ry="22" fill="${body}" ${S}/><path d="M18 56 Q45 78 72 56 Q60 72 45 72 Q30 72 18 56Z" fill="${belly}" opacity=".8"/>${stripes}
    ${hi(46, 38, 13, 4, -8)}${eye(27, 44, 4.6)}<path d="M15 54 Q19 57 23 54" fill="none" ${st(2)}/><path d="M33 60 Q38 66 44 62" fill="none" stroke="#fff" stroke-width="1.8" opacity=".6"/>`;
  def('ikan', fish('#ffa733', '#ffe0a8', '#ff7a00'));
  def('ikan-badut', fish('#ff7b1a', '#ffb066', '#ff5a00', `<path d="M40 30 Q35 50 40 70 M58 33 Q54 50 58 67" fill="none" stroke="#fff" stroke-width="7"/><path d="M40 30 Q35 50 40 70 M58 33 Q54 50 58 67" fill="none" stroke="${K}" stroke-width="1.4" stroke-dasharray="1 0" opacity=".5"/>`));

  def('kucing', `${line('M70 84 C94 82 98 58 84 48', '#ff9a3c', 8).replace(/<path /g, '<path class="a-wag" style="transform-origin:0% 50%" ')}
    <ellipse cx="50" cy="77" rx="24" ry="19" fill="#ff9a3c" ${S}/><ellipse cx="50" cy="83" rx="14" ry="11" fill="#fff3df"/><ellipse cx="39" cy="93" rx="8.5" ry="5" fill="#fff3df" ${S}/><ellipse cx="61" cy="93" rx="8.5" ry="5" fill="#fff3df" ${S}/>
    <path d="M27 36 L25 11 L45 24Z" fill="#ff9a3c" ${S}/><path d="M73 36 L75 11 L55 24Z" fill="#ff9a3c" ${S}/><path d="M30 29 L30 18 L38 24Z" fill="#ffb3c6"/><path d="M70 29 L70 18 L62 24Z" fill="#ffb3c6"/>
    <ellipse cx="50" cy="44" rx="27" ry="22" fill="#ff9a3c" ${S}/><path d="M50 23 L50 31 M42 25 L44 32 M58 25 L56 32" stroke="#c4631a" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="53" rx="11" ry="7.5" fill="#fff3df"/>
    ${hi(38, 34, 8, 3.5, -20)}${eye(38, 43, 4.8)}${eye(62, 43, 4.8)}<path d="M47 49 L53 49 L50 53Z" fill="#ff5c85" ${st(1.4)}/><path d="M50 53 Q46 58 42 55 M50 53 Q54 58 58 55" fill="none" ${st(1.8)}/>
    <path d="M30 50 L12 46 M30 54 L12 57 M70 50 L88 46 M70 54 L88 57" ${st(1.5)} fill="none"/>${cheek(30, 54)}${cheek(70, 54)}`);

  def('ayam', `<path class="a-wag" d="M74 50 Q96 34 94 52 Q98 60 76 60Z" fill="#e8c27a" ${S} style="transform-origin:0% 60%"/>
    <ellipse cx="52" cy="58" rx="28" ry="24" fill="#fff" ${S}/><ellipse cx="58" cy="62" rx="15" ry="11" fill="#f3e6c8" ${S} transform="rotate(10 58 62)"/>
    <g class="a-bobh" style="transform-origin:60% 100%"><circle cx="30" cy="38" r="15" fill="#fff" ${S}/><path d="M22 26 Q24 14 30 22 Q32 12 38 22 Q42 16 40 28Z" fill="#ef3b3b" ${S}/><path d="M16 36 L2 41 L16 46Z" fill="#ffb703" ${S}/><ellipse cx="21" cy="50" rx="4" ry="6" fill="#ef3b3b" ${S}/>${eye(27, 35, 3.8)}${cheek(30, 44, 2.6)}</g>
    <path d="M46 82 L44 94 M58 82 L58 94 M38 94 L47 94 M52 94 L62 94" fill="none" ${st(2.6)} stroke="#e8a000"/>`);

  def('belalang', `<path d="M62 56 L82 26 L96 70" fill="none" stroke="${K}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M62 56 L82 26 L96 70" fill="none" stroke="#5fc048" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 62 L30 82 M46 64 L46 84" fill="none" ${st(3)} stroke="#4aa63a"/><path d="M12 50 Q50 30 82 56 Q60 72 24 64Z" fill="#7bd25a" ${S}/><path d="M30 52 Q58 40 84 58 Q62 62 36 58Z" fill="#b6ec8a" opacity=".85"/>
    <ellipse cx="20" cy="46" rx="12" ry="10" fill="#7bd25a" ${S}/>${eye(17, 43, 4)}<path d="M18 38 Q14 22 4 18 M24 38 Q26 22 18 12" fill="none" ${st(2)}/><path d="M10 52 Q14 55 18 52" fill="none" ${st(1.8)}/>`);

  def('ular', `${line('M14 84 C2 66 36 62 50 72 S92 70 82 44', '#6bbf3a', 13)}<path d="M14 84 C2 66 36 62 50 72 S92 70 82 44" fill="none" stroke="#c9f07a" stroke-width="3" stroke-dasharray="1 8" stroke-linecap="round"/>
    <ellipse cx="82" cy="36" rx="12" ry="10" fill="#6bbf3a" ${S}/>${eye(78, 33, 3.6)}${eye(88, 33, 3.6)}<path class="a-tongue" d="M82 46 L82 54 L78 59 M82 54 L86 59" fill="none" stroke="#ef3b3b" stroke-width="2.2" stroke-linecap="round"/>${cheek(76, 41, 2)}${cheek(90, 41, 2)}`);

  def('hiu', `<path d="M8 54 C24 26 72 26 82 46 L98 28 L93 52 L99 76 L80 58 C58 78 24 74 8 54Z" fill="#6f8fa8" ${S}/><path d="M10 56 C28 74 58 76 80 58 C60 66 30 66 10 56Z" fill="#eef6fb"/>
    <path d="M44 32 L58 6 L66 34Z" fill="#5d7c94" ${S}/><path d="M42 62 L36 80 L56 66Z" fill="#5d7c94" ${S}/>${hi(40, 40, 14, 3.5, -10)}${eye(24, 47, 4.4)}
    <path d="M10 57 Q24 62 36 58" fill="none" ${st(2.2)}/><path d="M14 58 L17 62 L20 59 L23 63 L26 60 L29 63 L32 59" fill="#fff" ${st(1.2)}/><path d="M50 44 L52 54 M55 44 L57 54" ${st(1.6)} fill="none"/>`);

  def('gurita', `<g class="a-sway" style="transform-origin:50% 0%">${[[28, 6], [38, 4], [50, 0], [62, 4], [72, 6]].map(([x, dx], i) => line(`M${x} 56 C${x - dx} 70 ${x + dx * 2} 78 ${x + (i % 2 ? 10 : -10)} 92`, '#b66ae0', 9)).join('')}</g>
    <ellipse cx="50" cy="36" rx="27" ry="27" fill="#b66ae0" ${S}/>${hi(40, 22, 11, 5, -25)}${[[36, 30], [64, 48], [30, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#9448c4" opacity=".6"/>`).join('')}
    ${eye(40, 40, 6)}${eye(60, 40, 6)}<path d="M44 52 Q50 58 56 52" fill="none" ${st(2.2)}/>${cheek(31, 50, 3)}${cheek(69, 50, 3)}`);

  def('penyu', `<g class="a-flap" style="transform-origin:50% 50%"><ellipse cx="30" cy="22" rx="17" ry="8" fill="#a8d96b" ${S} transform="rotate(-30 30 22)"/><ellipse cx="30" cy="80" rx="17" ry="8" fill="#a8d96b" ${S} transform="rotate(30 30 80)"/></g>
    <ellipse cx="68" cy="26" rx="10" ry="5" fill="#a8d96b" ${S} transform="rotate(25 68 26)"/><ellipse cx="68" cy="76" rx="10" ry="5" fill="#a8d96b" ${S} transform="rotate(-25 68 76)"/>
    <path d="M10 52 L2 58 L14 58Z" fill="#a8d96b" ${S}/><ellipse cx="44" cy="51" rx="30" ry="25" fill="#7a8f3a" ${S}/><ellipse cx="44" cy="51" rx="22" ry="18" fill="#9bb04a"/>
    ${['M36 42 L46 36 L56 42 L52 52 L40 52Z', 'M30 54 L40 52 L44 62 L34 66Z', 'M58 54 L48 52 L44 62 L54 66Z'].map((d) => `<path d="${d}" fill="#c4d46a" stroke="#556a22" stroke-width="2" stroke-linejoin="round"/>`).join('')}${hi(36, 34, 9, 3, -20)}
    <g class="a-bobh"><circle cx="84" cy="51" r="12" fill="#a8d96b" ${S}/>${eye(88, 47, 3.4)}<path d="M90 56 Q94 56 96 53" fill="none" ${st(1.8)}/>${cheek(86, 56, 2.2)}</g>`);

  def('kepiting', `${[[24, 66, 8, 80], [28, 74, 12, 90], [34, 80, 20, 96]].map(([x, y, x2, y2]) => `<path d="M${x} ${y} L${x2} ${y2} M${100 - x} ${y} L${100 - x2} ${y2}" fill="none" ${st(3)} stroke="#e8453a"/>`).join('')}
    <g class="a-claw" style="transform-origin:100% 100%"><path d="M30 52 Q14 44 12 28" fill="none" ${st(5)} stroke="#e8453a"/><path d="M12 28 Q-2 22 6 10 Q12 16 14 22 Q18 8 26 14 Q24 24 18 30Z" fill="#ff5a4d" ${S}/></g>
    <g class="a-claw" style="transform-origin:0% 100%;animation-delay:-.7s"><path d="M70 52 Q86 44 88 28" fill="none" ${st(5)} stroke="#e8453a"/><path d="M88 28 Q102 22 94 10 Q88 16 86 22 Q82 8 74 14 Q76 24 82 30Z" fill="#ff5a4d" ${S}/></g>
    <path d="M38 44 L38 34 M62 44 L62 34" fill="none" ${st(2.6)}/><ellipse cx="50" cy="62" rx="30" ry="19" fill="#ff5a4d" ${S}/>${hi(40, 54, 13, 4, -10)}${eye(38, 32, 6)}${eye(62, 32, 6)}<path d="M42 66 Q50 72 58 66" fill="none" ${st(2.2)}/>${cheek(30, 62, 3)}${cheek(70, 62, 3)}`);

  def('gajah', `<path d="M20 52 C0 60 2 84 14 88" fill="none" stroke="${K}" stroke-width="15" stroke-linecap="round"/><path d="M20 52 C0 60 2 84 14 88" fill="none" stroke="#9aa7b4" stroke-width="10.5" stroke-linecap="round"/>
    <rect x="30" y="72" width="11" height="20" rx="4" fill="#8996a3" ${S}/><rect x="46" y="74" width="11" height="18" rx="4" fill="#8996a3" ${S}/><rect x="66" y="74" width="11" height="18" rx="4" fill="#8996a3" ${S}/><rect x="80" y="72" width="11" height="20" rx="4" fill="#9aa7b4" ${S}/>
    <ellipse cx="60" cy="58" rx="31" ry="24" fill="#a7b4c1" ${S}/><path class="a-wag" d="M90 52 Q99 56 96 70" fill="none" ${st(2.6)} style="transform-origin:0% 0%"/><circle cx="32" cy="46" r="21" fill="#a7b4c1" ${S}/>
    <g class="a-ear" style="transform-origin:90% 50%"><ellipse cx="44" cy="46" rx="14" ry="20" fill="#bcc7d2" ${S}/><ellipse cx="44" cy="48" rx="8" ry="13" fill="#f4b8c4"/></g>
    ${hi(26, 34, 9, 4, -20)}${eye(26, 42, 3.8)}<path d="M18 56 L10 62" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M18 56 L10 62" fill="none" ${st(1.4)} opacity=".5"/>${cheek(24, 52, 2.6)}`);

  def('lebah', `<g class="a-flap" style="transform-origin:50% 100%"><ellipse cx="42" cy="26" rx="12" ry="18" fill="#cfeaff" opacity=".85" ${S} transform="rotate(-20 42 26)"/><ellipse cx="62" cy="26" rx="12" ry="18" fill="#cfeaff" opacity=".85" ${S} transform="rotate(20 62 26)"/></g>
    <path d="M76 56 L96 56 L76 62Z" fill="#3b2412"/><ellipse cx="54" cy="58" rx="26" ry="19" fill="#ffd23f" ${S}/><path d="M48 40 Q42 58 48 76 M62 40 Q58 58 62 76" fill="none" stroke="#3b2412" stroke-width="7"/>${hi(52, 48, 12, 3.5)}
    <circle cx="26" cy="56" r="14" fill="#ffd23f" ${S}/>${eye(22, 53, 4)}<path d="M20 63 Q25 67 30 62" fill="none" ${st(2)}/><path d="M22 44 Q18 34 12 32 M30 43 Q32 33 38 30" fill="none" ${st(2)}/>${cheek(30, 62, 2.4)}`);

  def('burung-hantu', `<path d="M24 46 Q10 70 24 86 Q30 70 32 56Z" fill="#8a5a2e" ${S}/><path d="M76 46 Q90 70 76 86 Q70 70 68 56Z" fill="#8a5a2e" ${S}/>
    <ellipse cx="50" cy="64" rx="28" ry="31" fill="#a8703a" ${S}/><ellipse cx="50" cy="70" rx="19" ry="23" fill="#f3d9a6"/>${[0, 1, 2].map((i) => `<path d="M${40 + i * 2} ${62 + i * 9} q5 4 10 0 q5 4 10 0" fill="none" stroke="#c2924f" stroke-width="2"/>`).join('')}
    <path d="M22 36 L20 14 L40 26Z" fill="#a8703a" ${S}/><path d="M78 36 L80 14 L60 26Z" fill="#a8703a" ${S}/><ellipse cx="50" cy="40" rx="29" ry="22" fill="#a8703a" ${S}/>
    <circle cx="37" cy="40" r="13" fill="#fff4d6" ${S}/><circle cx="63" cy="40" r="13" fill="#fff4d6" ${S}/>${eye(37, 40, 8)}${eye(63, 40, 8)}<path d="M45 48 L55 48 L50 58Z" fill="#ffb703" ${S}/>
    <path d="M18 24 L82 24 L50 10Z" fill="#2d2d4a" ${S}/><rect x="36" y="22" width="28" height="7" rx="2" fill="#3d3d66" ${S}/><path d="M82 24 L86 40" ${st(2)} fill="none" stroke="#ffb703"/><circle cx="86" cy="42" r="3" fill="#ffb703"/>
    <path d="M38 94 L44 94 M56 94 L62 94" ${st(3)} stroke="#ff9f1c"/>`);
})();
