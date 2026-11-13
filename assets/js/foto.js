/* Gambar asli. Urutan: PNG cutout transparan (assets/img/foto/<nama>.png) -> foto utuh (<nama>.jpg, pemandangan/aktivitas) -> ilustrasi SVG (PK.art).
   PK.pic('rusa') mengembalikan <img>. Kredit foto asal: assets/img/foto/KREDIT.txt */
(() => {
  const PNG = new Set(('rusa kelinci kupu katak kura ikan batu burung bunga awan ember mawar-merah mawar-putih mawar-pink kucing gajah ikan-badut lebah nasi rumah obat tong belalang gurita hiu ular karang penyu ayam kelapa padi kepiting pohon kapas baju').split(' '));
  const JPG = new Set('eko-hutan eko-sawah eko-laut ombak selam taman air daur bibit jaring sampah api kapak mangrove pohon-jati'.split(' ')); // pemandangan: foto persegi bersudut membulat
  const ALIAS = { jahe: 'obat' }; // jahe & kunyit memakai cutout obat tradisional
  PK.pic = (n, cls = '') => {
    n = ALIAS[n] || n;
    return PNG.has(n) ? `<img class="art cutout ${cls}" src="assets/img/foto/${n}.png" alt="" draggable="false" loading="lazy">`
      : JPG.has(n) ? `<img class="art foto ${cls}" src="assets/img/foto/${n}.jpg" alt="" draggable="false" loading="lazy">` : PK.art(n, cls);
  };
})();
