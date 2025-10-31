# 🎙️ Asisten Suara untuk Lansia

![Demo](screenshot.png)

## 📖 Deskripsi
Sistem pengenalan suara berbasis AI menggunakan Teachable Machine untuk membantu lansia mengontrol perangkat di rumah dengan perintah suara sederhana.

## 🎯 Latar Belakang
Lansia seringkali kesulitan mengoperasikan perangkat teknologi modern. Proyek ini dibuat untuk:
- Memudahkan lansia mengontrol perangkat tanpa menyentuh
- Meningkatkan kemandirian lansia di rumah
- Memberikan akses cepat untuk panggilan darurat

## ✨ Fitur Utama
- ✅ Pengenalan suara real-time
- ✅ 3 perintah utama: Buka Pintu, Nyalakan Lampu, Panggil Bantuan
- ✅ Antarmuka ramah lansia (tombol besar, feedback jelas)
- ✅ Visual dan audio feedback
- ✅ Responsif (HP/tablet/laptop)

## 🛠️ Teknologi
- **AI Model:** Google Teachable Machine (Audio)
- **Framework:** TensorFlow.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Browser API:** Web Speech API

## 📊 Hasil Testing
- **Total Test Cases:** [ISI DARI HASIL TESTING]
- **Akurasi Model:** [ISI %]
- **Average Confidence:** [ISI %]
- **Success Rate:** [ISI %]

### Breakdown per Perintah:
| Perintah | Akurasi | Avg Confidence | Test Cases |
|----------|---------|----------------|------------|
| Buka Pintu | [X%] | [X%] | [X] |
| Nyalakan Lampu | [X%] | [X%] | [X] |
| Panggil Bantuan | [X%] | [X%] | [X] |

## 🚀 Cara Menggunakan

### Prerequisites
- Browser modern (Chrome/Firefox/Edge)
- Mikrofon yang berfungsi
- Koneksi internet (untuk load model)

### Instalasi

#### Opsi 1: Langsung Buka
```bash
# Clone repository
git clone https://github.com/username/asisten-suara-lansia.git

# Masuk ke folder
cd asisten-suara-lansia

# Buka file
open index.html  # Mac
start index.html  # Windows
```

#### Opsi 2: Dengan Local Server (Recommended)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# Buka browser: http://localhost:8000
```

### Penggunaan
1. Buka aplikasi di browser
2. Izinkan akses mikrofon saat diminta
3. Klik tombol mikrofon besar
4. Ucapkan salah satu perintah dengan jelas
5. Lihat hasil deteksi real-time

## 🎤 Perintah yang Tersedia

### 1. "Buka Pintu"
Untuk membuka pintu otomatis atau pintu utama rumah.

### 2. "Nyalakan Lampu"  
Untuk menyalakan lampu ruangan (bisa diintegrasikan dengan smart home).

### 3. "Panggil Bantuan"
Untuk situasi darurat, memanggil anggota keluarga atau layanan bantuan.

## 🧪 Metodologi Testing

### Dataset
- **Sumber:** Rekaman suara
- **Variasi:** 
  - Berbagai intonasi
  - Tingkat kebisingan berbeda
  - Jarak mikrofon bervariasi

### Testing Procedure
1. Uji setiap perintah minimal 10 kali
2. Variasikan kondisi lingkungan (tenang, sedang, bising)
3. Variasikan jarak mikrofon (dekat, sedang, jauh)
4. Catat confidence score setiap deteksi

### Metrics
- **Accuracy:** Persentase prediksi benar
- **Precision:** Ketepatan untuk setiap kelas
- **Recall:** Kemampuan mendeteksi setiap kelas
- **Confidence Score:** Tingkat keyakinan model

## 📈 Hasil & Analisis

### Confusion Matrix
[Screenshot atau tabel confusion matrix]

### Analisis
**Kelebihan:**
- [Tulis kelebihan yang ditemukan]
- Akurasi tinggi untuk kondisi tenang
- Response time cepat

**Kekurangan:**
- [Tulis kekurangan yang ditemukan]
- Akurasi menurun di lingkungan bising
- Sensitif terhadap aksen/logat berbeda

**Rekomendasi Improvement:**
- Tambah lebih banyak sampel training
- Variasi data dengan berbagai aksen
- Implementasi noise cancellation

## 🎨 Screenshot

### Tampilan Utama
![Main Interface](screenshots/main.png)

### Saat Mendengarkan
![Listening](screenshots/listening.png)

### Hasil Deteksi
![Detection](screenshots/detection.png)

## 📁 Struktur Proyek
asisten-suara-lansia/
├── index.html          # File utama aplikasi
├── README.md           # Dokumentasi ini
├── screenshots/        # Screenshot aplikasi
│   ├── main.png
│   ├── listening.png
│   └── detection.png
├── docs/              # Dokumentasi tambahan
│   ├── testing-report.pdf
│   └── presentation.pdf
└── assets/            # Asset tambahan
└── demo-video.mp4

## 🚀 Deployment

### Deploy ke Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Deploy ke GitHub Pages
1. Push ke GitHub repository
2. Settings > Pages
3. Source: main branch, / (root)
4. Save

## 🤝 Kontribusi
Proyek ini dibuat oleh:
- Axlendra Haris Sanjaya

## 📄 Lisensi
MIT License - Bebas digunakan untuk tujuan pembelajaran dan non-komersial.

## 🙏 Acknowledgments
- Google Teachable Machine Team
- TensorFlow.js Contributors
- Komunitas AI Indonesia

## 📞 Kontak
Untuk pertanyaan atau kolaborasi:
- Email: axlendraharissanjaya@gmail.com
- GitHub: 12Ndraaa

---

**Dibuat dengan ❤️ untuk membantu lansia Indonesia**
