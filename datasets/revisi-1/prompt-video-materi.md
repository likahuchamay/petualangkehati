# Prompt Video Materi (AI video generator, 10 detik per klip)

Total **6 klip x 10 detik** (± 1 menit), urutannya sama dengan 6 ringkasan materi.
Simpan hasilnya dengan nama persis seperti di bawah ke folder `assets/video/`:

| Klip | Nama berkas | Topik |
|---|---|---|
| 1 | materi-1.mp4 | Apa itu Keanekaragaman Hayati? |
| 2 | materi-2.mp4 | Tingkat Gen |
| 3 | materi-3.mp4 | Tingkat Jenis |
| 4 | materi-4.mp4 | Tingkat Ekosistem |
| 5 | materi-5.mp4 | Manfaat Kehati |
| 6 | materi-6.mp4 | Menjaga Kehati |

Media otomatis memutar klip 1 sampai 6 berurutan (ada juga tombol per klip).

## Tips agar karakter konsisten
- Unggah **rev-2.jpeg** (Anin dan Fino) sebagai gambar referensi / first frame di tiap klip (mode *image-to-video*).
- Tempel **Blok Gaya** di bawah di awal setiap prompt.
- Rasio **16:9**, durasi **10 detik**, tanpa teks tertulis di dalam video (teks sering salah ketik oleh AI).
- Narasi suara: kalau generator mendukung audio, pakai kalimat "Narasi". Kalau tidak, biarkan tanpa suara atau rekam narasi sendiri lalu gabungkan.

## Blok Gaya (tempel di awal setiap prompt)
```
Cute 3D felt-wool stop-motion animation style, soft fuzzy felt texture with visible stitching, warm bright natural lighting, vibrant tropical Indonesian nature, child-friendly educational animation for elementary school. Two main characters: Anin, a girl with a brown ponytail, and Fino, a boy with short brown hair; both wear a woven straw safari hat with a green leaf badge, olive-green explorer vest and shorts, green backpack. Same characters and same style as the reference image. Smooth gentle camera movement, 16:9, no on-screen text, no watermark.
```

## Klip 1 — Apa itu Keanekaragaman Hayati? (materi-1.mp4)
```
[Blok Gaya] Anin and Fino stand on a jungle trail looking out over a lush Indonesian landscape. Fino points excitedly ahead; the camera slowly pulls back and pans across a rich scene: a deer, colorful flowers, a turtle by a stream, fish in clear water, a hornbill on a branch and butterflies. Anin holds a map and smiles at the camera, both characters talking cheerfully.
```
Narasi: "Keanekaragaman hayati adalah beragamnya makhluk hidup di bumi, mulai dari tumbuhan, hewan, sampai tempat hidupnya. Indonesia punya kehati yang sangat tinggi!"

## Klip 2 — Tingkat Gen (materi-2.mp4)
```
[Blok Gaya] Close-up of a garden of roses in three colors: red, pink and white. Anin and Fino crouch beside the rose bushes, Fino gently touches a red rose and Anin holds up a pink one, then the camera tilts to show all three colors side by side. Soft sparkles appear around the flowers. Both characters look amazed and talk to the camera.
```
Narasi: "Mawar merah, pink, dan putih adalah satu jenis yang sama, tetapi warnanya berbeda. Inilah keanekaragaman tingkat gen."

## Klip 3 — Tingkat Jenis (materi-3.mp4)
```
[Blok Gaya] A sunny village yard. Anin holds a cat, Fino points at a hen walking by, and a butterfly lands on a flower between them. The camera moves smoothly from the cat to the hen to the butterfly, showing three clearly different animals. Both characters look curious and happy, talking to the camera.
```
Narasi: "Kucing, ayam, dan kupu-kupu adalah makhluk hidup yang berbeda jenis. Setiap jenis punya ciri khas sendiri. Inilah keanekaragaman tingkat jenis."

## Klip 4 — Tingkat Ekosistem (materi-4.mp4)
```
[Blok Gaya] A smooth three-scene transition in one continuous camera move: first a green forest with tall trees and birds, then a bright rice field with a farmer's hut and frogs, then a blue sea shore with coral, fish and a sea turtle. Anin and Fino appear in each scene wearing the same outfit, waving and talking to the camera, with a soft wipe between scenes.
```
Narasi: "Hutan, sawah, dan laut adalah tempat hidup yang berbeda. Makhluk hidup dan lingkungannya saling berhubungan. Inilah keanekaragaman tingkat ekosistem."

## Klip 5 — Manfaat Kehati (materi-5.mp4)
```
[Blok Gaya] A cheerful market scene in felt style. Anin and Fino hold a basket of rice, fruit and fish; behind them a small wooden house, a folded cotton shirt and a jar of ginger and turmeric herbal medicine appear one after another with a gentle pop and sparkle. Camera slowly orbits around them as they smile and talk to the camera.
```
Narasi: "Kehati memberi kita pangan, papan, sandang, dan obat. Alam juga menjaga udara, air, dan tanah tetap sehat."

## Klip 6 — Menjaga Kehati (materi-6.mp4)
```
[Blok Gaya] Anin and Fino plant a small tree sapling together on a green hillside, then Fino puts a plastic bottle into a recycling bin and Anin closes a water tap. The camera tracks them smoothly; a sea turtle and a bird appear happy in the background. Ending with both characters giving a thumbs-up to the camera under warm golden light, talking cheerfully.
```
Narasi: "Ayo jaga kehati! Tanam pohon, buang sampah pada tempatnya, hemat air, dan lindungi satwa langka. Mulai dari kita, mulai dari sekarang!"

## Cadangan bila generator gagal / hasil kurang bagus
- Ulangi dengan tambahan: `keep the characters' faces and outfits identical to the reference image`.
- Jika gerakan terlalu liar: tambahkan `slow, calm, minimal motion`.
- Jika muncul tulisan aneh: tambahkan `no text, no letters, no signs with writing`.
