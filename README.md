# Undangan Pernikahan Digital - M. Alfikri & Anisa Rahmadini

Undangan Pernikahan Digital berbasis web statis dengan tema **Adat Minangkabau Modern** yang terinspirasi dari UX Indoinvite.

## 🚀 Fitur Utama
- **Halaman Pembuka (Cover Overlay)**: Ornamen emas Minang, bingkai ganda foto mempelai, kartu tamu *glassmorphism*, & tombol pembuka bersinar.
- **Kartu Nama Tamu Dinamis**: Mendukung parameter query `?to=Nama+Tamu` atau `?kpd=Nama+Tamu`.
- **Rangkaian Acara**: Detail Akad Nikah & Tasyakuran Pernikahan dilengkapi tombol navigasi Google Maps.
- **Musik Latar Belakang**: Putar/hentikan audio otomatis (*Shane Filan - Beautiful In White*).
- **Hitung Mundur (Countdown Timer)**: Hitung mundur otomatis menuju hari pernikahan.
- **Wedding Gift**: Kartu rekening BSI & DANA dilengkapi tombol salin nomor rekening instan.
- **RSVP & Ucapan**: Form kirim ucapan & konfirmasi kehadiran dengan simpanan lokal.
- **Navigasi Presisi**: CSS Section Scroll Snap & indikator Side Navigation Dots.
- **Mode Auto Play**: Fitur slide otomatis setiap 8 detik (berhenti otomatis saat pengguna berinteraksi).

## 💻 Cara Menguji di Komputer (Lokal)
Jalankan perintah berikut di terminal:
```powershell
php -S localhost:8000
```
Buka browser di `http://localhost:8000/?to=Nama+Tamu`

## 🌐 Deploy ke GitHub Pages
Proyek ini sudah dilengkapi dengan:
- `.nojekyll` (memastikan asset static terbaca penuh)
- `.github/workflows/deploy.yml` (otomatisasi deploy via GitHub Actions)
