/* Foto asli (assets/img/foto/<nama>.jpg). PK.pic('rusa') = <img> foto; jika tidak ada fotonya, jatuh ke ilustrasi SVG (PK.art). Kredit foto: assets/img/foto/KREDIT.txt */
(() => {
  const ADA = new Set(('rusa kelinci kupu burung katak kura ikan bunga batu awan ember mawar-merah mawar-putih mawar-pink kucing ayam eko-hutan eko-sawah eko-laut padi pohon kelapa belalang ular hiu gurita ikan-badut penyu kepiting karang gajah ' +
    'pohon-jati kapas jahe mangrove nasi rumah baju obat ombak selam bibit tong daur air taman lebah kapak api jaring sampah').split(' '));
  PK.pic = (n, cls = '') => ADA.has(n) ? `<img class="art foto ${cls}" src="assets/img/foto/${n}.jpg" alt="" draggable="false" loading="lazy">` : PK.art(n, cls);
})();
