# Panduan Deployment & Update Server Backend (Docker)

Panduan ini berisi langkah-langkah praktis untuk memperbarui (*redeploy*) backend **CODAP Mobile** di server VPS menggunakan Docker dan Docker Compose.

---

## 📋 Prasyarat di Server
Sebelum melakukan pembaruan, pastikan:
1. Docker Engine dan Docker Compose sudah terinstal di server.
2. Anda memiliki akses SSH ke server.
3. File `.env` sudah tersedia dan terkonfigurasi dengan benar di server (berisi `TURSO_DATABASE_URL`, `JWT_SECRET`, `OPENROUTER_API_KEY`, dll).

---

## 🚀 Alur Singkat Pembaruan (Cheat Sheet)

```bash
# 1. Pindah ke direktori backend
cd /path/ke/codap_mobile/backend

# 2. Tarik kode terbaru dari GitHub
git pull origin main

# 3. Bangun ulang image dan jalankan ulang container
docker compose up -d --build

# 4. Bersihkan image lama yang sudah tidak terpakai
docker image prune -f

# 5. Cek status container
docker compose ps
```

---

## 📖 Langkah-Langkah Lengkap

### Langkah 1: Masuk ke Server via SSH
Buka terminal di komputer lokal Anda dan hubungkan ke server:
```bash
ssh username@ip-server-anda
```

### Langkah 2: Masuk ke Folder Backend
Pindah ke direktori tempat repositori berada, khususnya subfolder `backend`:
```bash
cd ~/codap_mobile/backend
# (Sesuaikan path folder dengan lokasi sebenarnya di server Anda)
```

### Langkah 3: Tarik Perubahan Kode Terbaru (`git pull`)
Ambil pembaruan kode dan konfigurasi Docker terbaru dari branch utama:
```bash
git pull origin main
```
> **Catatan:** Jika server menggunakan nama branch selain `main` (misal `master`), sesuaikan perintahnya.

### Langkah 4: Sinkronisasi Database *(Opsional - Hanya jika ada perubahan skema DB)*
Jika pada pembaruan ini terdapat perubahan skema database Drizzle (`src/db/schema.ts`), jalankan push skema:
```bash
npm run db:push
```
*(Atau `npx drizzle-kit push`)*

### Langkah 5: Rebuild & Restart Container
Jalankan Docker Compose untuk mengompilasi ulang image dengan kode terbaru dan menyalakan kembali service:
```bash
docker compose up -d --build
```
> Penjelasan argumen:
> - `-d` (*detached*): Menjalankan container di latar belakang (background).
> - `--build`: Memaksa Docker untuk mengompilasi ulang kode TypeScript dan memperbarui image sebelum menyalakan container.

### Langkah 6: Verifikasi Status & Log Container
Pastikan container menyala dengan status **healthy**:
```bash
# Cek daftar container yang sedang berjalan
docker compose ps

# Cek log aplikasi backend (tekan Ctrl+C untuk keluar)
docker compose logs -f backend

# Tes endpoint healthcheck langsung dari server
curl http://localhost:3000/health
```
Respons yang diharapkan:
```json
{"status":"ok","uptime":...}
```

### Langkah 7: Pembersihan Disk Server (*Housekeeping*)
Setiap kali melakukan build ulang, Docker akan menyisakan image lama tanpa nama (`<none>`). Bersihkan agar tidak memenuhi kapasitas disk:
```bash
docker image prune -f
```

---

## 🛠️ Perintah Berguna Lainnya

| Perintah | Deskripsi |
| :--- | :--- |
| `docker compose ps` | Melihat status container (`backend` dan `caddy`). |
| `docker compose logs -f backend` | Memantau log backend secara realtime. |
| `docker compose logs -f caddy` | Memantau log reverse proxy Caddy dan SSL. |
| `docker compose restart backend` | Merestart service backend tanpa build ulang. |
| `docker compose down` | Menghentikan dan menghapus semua container (data volume `uploads` tetap aman). |
| `docker compose up -d` | Menyalakan kembali container tanpa build ulang. |

---

## ❓ Troubleshooting

1. **Perintah `docker compose` tidak ditemukan?**
   * Jika server Anda menggunakan Docker Compose versi lama (v1), gunakan tanda hubung:
     ```bash
     docker-compose up -d --build
     ```
2. **File upload siswa hilang saat deploy ulang?**
   * Pastikan baris `volumes: - ./uploads:/app/uploads` ada pada service `backend` di file `docker-compose.yml`. Selama konfigurasi volume ini ada, file di folder `backend/uploads/` akan tetap tersimpan aman di server host.
3. **Isu Izin Akses Folder `uploads`:**
   * Jika terjadi kendala izin tulis saat file diunggah, pastikan folder di server memiliki izin baca-tulis:
     ```bash
     chmod -R 775 uploads/
     ```
