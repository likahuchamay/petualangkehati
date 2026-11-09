/* Pustaka ilustrasi SVG buatan sendiri (pengganti emoji). Gaya: stiker kartun, garis tebal, bagian bisa beranimasi lewat kelas a-*.
   Pakai: PK.art('rusa') atau PK.emo('rusa'). Definisi sprite ada di sprites-hewan/tumbuhan/benda.js */
(() => {
  const K = '#3b2412', REG = {};
  const st = (w = 2.6) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const eye = (x, y, r = 4.2, c = 'a-blink') => `<g class="${c}"><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${st(1.5)}/><circle cx="${x + r * .2}" cy="${y + r * .1}" r="${r * .58}" fill="${K}"/><circle cx="${x + r * .45}" cy="${y - r * .3}" r="${r * .24}" fill="#fff"/></g>`;
  const cheek = (x, y, r = 3) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.3}" ry="${r * .8}" fill="#ff7a95" opacity=".5"/>`;
  const hi = (x, y, rx, ry, rot = 0) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".4" transform="rotate(${rot} ${x} ${y})"/>`;
  const mirror = (s) => `<g transform="translate(100 0) scale(-1 1)">${s}</g>`;
  const line = (d, c, w, o = 1) => `<path d="${d}" fill="none" stroke="${K}" stroke-width="${w + 4}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
  PK.sprite = { K, st, eye, cheek, hi, mirror, line, def: (n, svg, vb = '0 0 100 100') => { REG[n] = [svg, vb]; } };

  /* kode emoji -> nama sprite (supaya semua ikon lama otomatis memakai gambar buatan sendiri) */
  const MAP = { '2b50': 'bintang', '1f512': 'gembok', '1f513': 'gembok-buka', '1f3c6': 'piala', '2764': 'hati', '1f5a4': 'hati-kosong', '1f50d': 'kaca', '1f575': 'kaca', '1f5fa': 'peta', '1f9ed': 'kompas',
    '1f4d6': 'buku', '1f4da': 'buku', '1f3af': 'target', '2705': 'centang', '1f4dd': 'centang', '1f3ac': 'klaper', '1f464': 'id', '1f9ec': 'dna', '1f43e': 'jejak', '1f463': 'jejak', '1f30d': 'globe',
    '1f331': 'bibit', '267b': 'daur', '1f6b0': 'air', '1f422': 'kura', '1f33a': 'bunga', '1f98b': 'kupu', '1f41f': 'ikan', '1f98c': 'rusa', '1f414': 'ayam', '1f431': 'kucing', '1f339': 'mawar-merah',
    '1f4ae': 'mawar-putih', '1f338': 'mawar-pink', '1f333': 'pohon', '1f334': 'kelapa', '1f33e': 'padi', '1f35a': 'nasi', '1f3e0': 'rumah', '1f455': 'baju', '1f48a': 'obat', '1f9fa': 'keranjang',
    '1f41d': 'lebah', '1f525': 'api', '1fa93': 'kapak', '1f5d1': 'tong', '1faa8': 'batu', '2601': 'awan', '1faa3': 'ember', '274c': 'silang', '1f914': 'tanya', '1f9e9': 'tanya', '1f449': 'panah',
    '1f389': 'bintang', '1f332': 'eko-hutan', '1f30a': 'eko-laut', '25b6': 'main', '1f4a1': 'lampu', '1f4cc': 'pin', '1f4d8': 'buku', '1f4db': 'id', '1f194': 'id', '1f393': 'topi', '1f3eb': 'rumah',
    '1f3de': 'eko-hutan', '1f33b': 'taman', '1f6af': 'sampah', '1f3f9': 'jaring', '1f9f3': 'jejak', '2600': 'matahari', '1fab8': 'karang', '1f93f': 'selam', '1f420': 'ikan-badut', '1f980': 'kepiting',
    '1f988': 'hiu', '1f419': 'gurita', '1f418': 'gajah', '1f997': 'belalang', '1f40d': 'ular', '1f426': 'burung', '1f438': 'katak', '1f407': 'kelinci', '1f33f': 'jahe', '1f44b': 'bintang' };
  PK.art = (n, cls = '', style = '') => {
    const a = REG[n]; if (!a) return '';
    return `<svg class="art ${cls}" viewBox="${a[1]}" style="--d:-${(Math.random() * 4).toFixed(2)}s;${style}" aria-hidden="true" focusable="false">${a[0]}</svg>`;
  };
  PK.hasArt = (n) => !!REG[n];
  PK.emo = (code, cls = '') => { const n = REG[code] ? code : MAP[code]; return n && REG[n] ? PK.art(n, 'emo ' + cls) : ''; };
})();
