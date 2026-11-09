/* Seluruh konten teks media. Ubah teks di sini, bukan di scene. */
window.PK = { scenes: {}, missions: {} };

PK.data = {
  tokoh: { cewek: 'Anin', cowok: 'Fino' }, // dua petualang pemandu
  videoMateri: [ // video hasil generate AI (10 detik/klip): letakkan di assets/video/. Prompt ada di datasets/revisi-1/prompt-video-materi.md
    ['materi-1.mp4', 'Apa itu Kehati?'], ['materi-2.mp4', 'Tingkat Gen'], ['materi-3.mp4', 'Tingkat Jenis'],
    ['materi-4.mp4', 'Tingkat Ekosistem'], ['materi-5.mp4', 'Manfaat Kehati'], ['materi-6.mp4', 'Menjaga Kehati']
  ],
  pengembang: {
    nama: 'Lika Hucha May Saroh', nim: '202310430311095', prodi: 'Pendidikan Guru Sekolah Dasar (PGSD)',
    fakultas: 'Pendidikan Sains dan Humaniora', univ: 'Universitas Muhammadiyah Malang'
  },
  tujuan: 'Melalui media pembelajaran interaktif Petualang Kehati, peserta didik diharapkan dapat mengenal dan menyebutkan berbagai contoh keanekaragaman hayati di lingkungan sekitar, memahami ciri-ciri serta perbedaan keanekaragaman hayati pada tingkat gen, jenis, dan ekosistem, serta menganalisis berbagai bentuk keanekaragaman hayati beserta manfaatnya bagi kehidupan manusia dan lingkungan.',
  cp: 'Pada akhir Fase B, peserta didik mampu mengidentifikasi berbagai bentuk keanekaragaman makhluk hidup dan lingkungan tempat hidupnya, menjelaskan keterkaitan antara makhluk hidup dengan lingkungannya, serta menunjukkan sikap peduli dalam menjaga kelestarian lingkungan.',
  tp: [
    'Mengenal dan menyebutkan berbagai contoh keanekaragaman hayati di lingkungan sekitar.',
    'Memahami ciri-ciri dan perbedaan keanekaragaman hayati tingkat gen, jenis, dan ekosistem.',
    'Menganalisis berbagai bentuk keanekaragaman hayati beserta manfaatnya bagi kehidupan manusia dan lingkungan.'
  ],
  indikator: [
    ['1.1', 'Menyebutkan contoh makhluk hidup (hewan dan tumbuhan) di lingkungan sekitar.', 'Pos 1'],
    ['1.2', 'Membedakan makhluk hidup dengan benda mati.', 'Pos 1'],
    ['2.1', 'Mengelompokkan contoh keanekaragaman hayati ke tingkat gen, jenis, dan ekosistem.', 'Pos 2'],
    ['2.2', 'Menjelaskan ciri keanekaragaman hayati tingkat gen, jenis, dan ekosistem beserta contohnya.', 'Pos 3'],
    ['3.1', 'Menganalisis perbedaan makhluk hidup pada ekosistem yang berbeda.', 'Pos 4'],
    ['3.2', 'Menghubungkan keanekaragaman hayati dengan manfaatnya bagi manusia dan lingkungan.', 'Pos 5'],
    ['3.3', 'Menyebutkan tindakan sederhana untuk melestarikan keanekaragaman hayati.', 'Pos 6']
  ],
  cara: [
    ['klaper', 'Tonton perkenalan', 'Simak video perkenalan, lalu tulis namamu agar petualangan terasa personal.'],
    ['kompas', 'Pilih menu di Peta Petualangan', 'Klik tombol menu: profil, cara penggunaan, tujuan, materi, misi, dan evaluasi.'],
    ['buku', 'Pelajari materi dan video', 'Buka menu Materi untuk membaca ringkasan dan menonton video animasi.'],
    ['peta', 'Mulai misi di Peta Misi', 'Ada 6 pos. Setiap pos berisi permainan berbeda: temukan, seret, cocokkan, dan tangkap.'],
    ['gembok', 'Selesaikan misi untuk membuka gembok', 'Pos berikutnya terkunci. Selesaikan pos saat ini agar gemboknya terbuka.'],
    ['jejak', 'Ikuti petualang berjalan', 'Setelah misi berhasil, karakter akan berjalan otomatis ke pos berikutnya.'],
    ['centang', 'Kerjakan evaluasi', 'Setelah 6 pos selesai, evaluasi terbuka. Jawab 10 soal untuk melihat nilaimu.'],
    ['piala', 'Raih trofi', 'Selesaikan semua misi untuk mendapatkan trofi Penjaga Kehati!']
  ],
  materi: [
    { ico: 'globe', judul: 'Apa itu Keanekaragaman Hayati?', teks: 'Keanekaragaman hayati (kehati) adalah beragamnya makhluk hidup di bumi: tumbuhan, hewan, dan jasad renik, beserta tempat hidupnya. Indonesia termasuk negara dengan kehati yang sangat tinggi!', contoh: [['rusa', 'Rusa'], ['bunga', 'Bunga'], ['kura', 'Kura-kura'], ['ikan', 'Ikan']] },
    { ico: 'dna', judul: 'Tingkat Gen', teks: 'Perbedaan sifat (gen) di dalam satu jenis makhluk hidup. Hasilnya, satu jenis bisa tampak berbeda-beda.', contoh: [['mawar-merah', 'Mawar merah'], ['mawar-pink', 'Mawar pink'], ['mawar-putih', 'Mawar putih']], ex: 'Satu jenis (mawar), warnanya berbeda-beda.' },
    { ico: 'jejak', judul: 'Tingkat Jenis', teks: 'Beragamnya jenis (spesies) makhluk hidup yang berbeda-beda di suatu tempat. Setiap jenis punya ciri khas sendiri.', contoh: [['kucing', 'Kucing'], ['ayam', 'Ayam'], ['kupu', 'Kupu-kupu']], ex: 'Kucing, ayam, dan kupu-kupu adalah jenis yang berbeda.' },
    { ico: 'eko-hutan', judul: 'Tingkat Ekosistem', teks: 'Beragamnya tempat hidup dan interaksi makhluk hidup dengan lingkungannya (tanah, air, udara, cahaya).', contoh: [['eko-hutan', 'Hutan'], ['eko-sawah', 'Sawah'], ['eko-laut', 'Laut']], ex: 'Hutan, sawah, dan laut adalah ekosistem yang berbeda.' },
    { ico: 'keranjang', judul: 'Manfaat Keanekaragaman Hayati', teks: 'Kehati memberi kita pangan (padi, ikan), papan (kayu), sandang (kapas), obat (jahe, kunyit), wisata, serta menjaga udara, air, dan tanah tetap sehat.', contoh: [['nasi', 'Pangan'], ['rumah', 'Papan'], ['baju', 'Sandang'], ['obat', 'Obat']] },
    { ico: 'bibit', judul: 'Menjaga Kehati', teks: 'Kita dapat melestarikan kehati dengan menanam pohon, tidak membuang sampah sembarangan, hemat air, dan tidak memburu satwa langka.', contoh: [['bibit', 'Tanam pohon'], ['daur', 'Daur ulang'], ['air', 'Hemat air'], ['penyu', 'Lindungi satwa']] }
  ],
  pos: [
    { id: 1, art: 'kaca', how: ['Lihat pemandangan, cari makhluk hidup.', 'Ketuk makhluk hidup yang kamu temukan (butuh 5).', 'Awas, ada benda mati yang menjadi pengecoh!'], judul: 'Misi Pemburu Jejak', short: 'Pemburu Jejak', sub: 'Temukan makhluk hidup yang ada di lingkungan sekitar!', bg: 'bg-gunung.jpg', node: [252, 335], plate: [252, 432] },
    { id: 2, art: 'dna', how: ['Seret gambar dari daftar ke kotak yang tepat.', 'Gen = satu jenis, ciri berbeda. Jenis = jenis berbeda. Ekosistem = tempat hidup.', 'Bisa juga: ketuk gambar, lalu ketuk kotaknya.'], judul: 'Misi Klasifikasi Kehati', short: 'Klasifikasi Kehati', sub: 'Kelompokkan gambar ke tingkat gen, jenis, dan ekosistem.', bg: 'bg-hutan.jpg', node: [378, 527], plate: [381, 600] },
    { id: 3, art: 'burung-hantu', how: ['Dengarkan teka-teki Profesor Hantu.', 'Lihat gambarnya, lalu pilih tingkat yang tepat.', 'Selesaikan 5 teka-teki.'], judul: 'Misi Rahasia Alam', short: 'Rahasia Alam', sub: 'Pecahkan teka-teki dan kenali perbedaan tingkat kehati!', bg: 'bg-air-terjun.jpg', node: [645, 302], plate: [645, 380] },
    { id: 4, art: 'kaca', how: ['Amati ekosistem sawah, lalu laut.', 'Ketuk makhluk yang SALAH TEMPAT (2 di tiap ekosistem).', 'Jawab pertanyaan kesimpulan Detektif.'], judul: 'Misi Detektif Ekosistem', short: 'Detektif Ekosistem', sub: 'Temukan makhluk yang salah tempat di tiap ekosistem!', bg: 'bg-gunung.jpg', node: [665, 510], plate: [667, 604] },
    { id: 5, art: 'padi', how: ['Tarik garis dari kekayaan alam (kiri) ke manfaatnya (kanan).', 'Bisa juga: ketuk kiri, lalu ketuk kanan.', 'Hubungkan semua 6 pasangan.'], judul: 'Misi Manfaat Alam', short: 'Manfaat Alam', sub: 'Hubungkan kekayaan alam dengan manfaatnya untuk kita!', bg: 'bg-air-terjun.jpg', node: [965, 302], plate: [965, 383] },
    { id: 6, art: 'keranjang', how: ['Geser keranjang (mouse/sentuh/tombol panah).', 'Tangkap aksi baik yang menjaga alam.', 'Hindari aksi merusak. Nyawamu 3!'], judul: 'Misi Penjaga Kehati', short: 'Penjaga Kehati', sub: 'Tangkap aksi baik, hindari aksi yang merusak alam!', bg: 'bg-hutan.jpg', node: [1015, 492], plate: [1018, 593] }
  ],
  kuis: [
    ['Keanekaragaman hayati adalah ....', ['Beragamnya makhluk hidup di bumi', 'Banyaknya bangunan di kota', 'Jumlah air di laut', 'Banyaknya batu di sungai'], 0, 'Kehati adalah beragamnya makhluk hidup beserta tempat hidupnya.'],
    ['Mawar merah, mawar putih, dan mawar pink menunjukkan keanekaragaman tingkat ....', ['Ekosistem', 'Jenis', 'Gen', 'Habitat'], 2, 'Variasi dalam satu jenis (mawar) adalah keanekaragaman tingkat gen.'],
    ['Kucing, ayam, dan kupu-kupu adalah contoh keanekaragaman tingkat ....', ['Gen', 'Jenis', 'Ekosistem', 'Populasi'], 1, 'Berbagai jenis makhluk hidup yang berbeda = tingkat jenis.'],
    ['Hutan, sawah, dan laut adalah contoh keanekaragaman tingkat ....', ['Gen', 'Jenis', 'Ekosistem', 'Individu'], 2, 'Perbedaan tempat hidup dan interaksinya = tingkat ekosistem.'],
    ['Berikut ini yang termasuk makhluk hidup adalah ....', ['Batu', 'Awan', 'Pohon mangga', 'Ember'], 2, 'Makhluk hidup bernapas, tumbuh, dan berkembang biak.'],
    ['Padi dimanfaatkan manusia sebagai sumber ....', ['Pangan', 'Obat', 'Papan', 'Energi listrik'], 0, 'Beras dari padi adalah makanan pokok kita.'],
    ['Hutan mangrove bermanfaat untuk ....', ['Membuat hujan batu', 'Menahan abrasi pantai', 'Menambah polusi', 'Mengeringkan laut'], 1, 'Akar mangrove menahan ombak dan menjadi rumah bagi ikan.'],
    ['Makhluk hidup di sawah berbeda dengan di laut karena ....', ['Kondisi lingkungannya berbeda', 'Semuanya sama', 'Bentuk tanahnya sama', 'Tidak ada air'], 0, 'Setiap ekosistem punya kondisi berbeda sehingga penghuninya berbeda.'],
    ['Tindakan yang membantu melestarikan kehati adalah ....', ['Menebang pohon sembarangan', 'Membuang sampah ke sungai', 'Menanam pohon', 'Memburu satwa langka'], 2, 'Menanam pohon menjaga habitat dan udara bersih.'],
    ['Jahe dan kunyit dimanfaatkan sebagai ....', ['Bahan bangunan', 'Obat tradisional', 'Bahan bakar', 'Pakaian'], 1, 'Jahe dan kunyit adalah tanaman obat (biofarmaka).']
  ]
  ,tombol: [ // [ikon/label tombol, judul, fungsi] — halaman Petunjuk Penggunaan
    ['mulai', 'Mulai Petualangan', 'Ketuk tombol ini di halaman awal untuk memulai petualangan.'],
    ['lewati', 'Lewati', 'Melewati video perkenalan dan langsung menulis nama.'],
    ['menu', 'Menu', 'Kembali ke halaman menu utama dari halaman mana pun.'],
    ['lanjut', 'Lanjut', 'Pindah ke halaman berikutnya (Profil, Tujuan, Cara, Materi, lalu Peta).'],
    ['prev', 'Panah Kiri / Kanan', 'Berpindah ke ringkasan materi sebelumnya atau berikutnya.'],
    ['suara', 'Ikon Suara', 'Menyalakan atau mematikan musik latar.'],
    ['beranda', 'Ikon Beranda', 'Langsung kembali ke menu utama.'],
    ['pos', 'Pos Misi', 'Ketuk pos yang gemboknya terbuka untuk memulai misi. Pos terkunci belum bisa dibuka.'],
    ['ulang', 'Ulangi', 'Mengulang petualangan dari awal (progres dan nilai dihapus).'],
    ['bintang', 'Bintang', 'Menunjukkan bintang yang kamu kumpulkan dari setiap misi.']
  ]
};
