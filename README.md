# Star Rush

Game sederhana tanpa framework atau instalasi dependensi. Buka `dist/index.html` di browser untuk bermain secara offline.

## Struktur
- `dist/index.html`: struktur halaman, arena, tombol, dan indikator skor.
- `dist/style.css`: warna, ukuran, tata letak, dan tampilan responsif.
- `dist/script.js`: timer, posisi acak, skor, mulai ulang, dan rekor lokal.

## Cara bermain
Klik **Mulai bermain**, lalu klik atau sentuh bintang sebanyak mungkin selama 30 detik. Setiap bintang bernilai satu poin. Tombol **Mulai ulang** mengulang ronde dari nol. Tombol **Main lagi** muncul setelah ronde selesai.

Semua tombol dapat diakses dengan Tab dan diaktifkan dengan Enter atau Spasi. Rekor tersimpan di browser jika penyimpanan lokal tersedia.

## Alur JavaScript
1. `querySelector` menghubungkan kode dengan elemen HTML.
2. `startGame()` mengatur skor awal dan batas waktu.
3. Event `click` pada bintang menambah skor dan memanggil `moveStar()`.
4. `updateTime()` menghitung waktu berdasarkan `performance.now()` agar tidak bergantung pada ketepatan interval.
5. `endGame()` menampilkan hasil dan menyimpan rekor dengan `localStorage`.

Untuk mengubah durasi, ubah `duration` di JavaScript serta angka awal pada HTML dan `startGame()`. Untuk mengubah desain, edit CSS. Proyek ini tidak menggunakan layanan eksternal untuk menjalankan game.
