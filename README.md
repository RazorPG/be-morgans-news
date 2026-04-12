<p align="center">
	<img src="https://morgans-news.vercel.app/images/logo.png" alt="Morgan's News Logo" width="140" />
</p>

<h1 align="center">Morgan's News</h1>

<p align="center">
	Portal berita modern dengan fitur autentikasi, manajemen konten, interaksi pengguna, dan panel admin.
</p>

## Tentang Proyek

Morgan's News adalah aplikasi web fullstack untuk publikasi berita. Proyek ini terdiri dari:

- Frontend: Next.js + TypeScript
- Backend: Express.js + TypeScript
- Database: MongoDB

Aplikasi mendukung alur dari registrasi dan aktivasi akun, membaca artikel, hingga pengelolaan konten oleh admin.

## Repositories

- Frontend Repository: [kunjungi repo frontend](https://github.com/RazorPG/fe-morgans-news)
- Backend Repository: [kunjungi repo backend](https://github.com/RazorPG/be-morgans-news)

## Fitur Utama

### Untuk Pengguna

- Registrasi akun
- Aktivasi akun melalui kode aktivasi
- Login menggunakan email atau username
- Lihat daftar artikel dengan pencarian dan pagination
- Baca detail artikel
- Beri reaksi pada artikel
- Tulis komentar milik sendiri
- profil pengguna

### Untuk Admin

- Akses halaman admin (role-based access)
- Kelola artikel (buat, edit, hapus)
- Kelola kategori berita
- Upload media ke Cloudinary
- Lihat statistik konten

### Keamanan dan Akses

- Autentikasi berbasis JWT melalui NextAuth
- Middleware proteksi halaman (`/profile`, `/admin`)
- Route auth (`/login`, `/register`) dibatasi untuk user yang sudah login
- Route aktivasi (`/activation`) dibatasi untuk user yang sudah login

## Arsitektur Singkat

### Frontend (fe-morgans-news)

- Framework: Next.js (Pages Router)
- UI: HeroUI
- HTTP Client: Axios
- Auth: NextAuth Credentials Provider

### Backend (be-morgans-news)

- Framework: Express.js
- ODM: Mongoose
- Upload: Multer + Cloudinary
- Validasi: Yup
- Fitur API utama:
  - `auth`
  - `articles`
  - `categories`
  - `comments`
  - `reactions`
  - `media`

## Endpoint Backend dan Kegunaannya

Base URL API:

```text
http://localhost:3001/api
```

Catatan:

- Kolom Auth = `Ya` berarti endpoint memerlukan token JWT (`Authorization: Bearer <token>`).
- Sebagian endpoint admin juga membutuhkan role `admin`.

### Auth

| Method | Endpoint                | Auth  | Kegunaan                                                         |
| ------ | ----------------------- | ----- | ---------------------------------------------------------------- |
| POST   | `/auth/register`        | Tidak | Registrasi akun baru.                                            |
| POST   | `/auth/activation`      | Tidak | Aktivasi akun menggunakan kode aktivasi.                         |
| POST   | `/auth/login`           | Tidak | Login dengan email/username + password, mengembalikan token JWT. |
| GET    | `/auth/me`              | Ya    | Mengambil data profil user yang sedang login.                    |
| POST   | `/auth/forget-password` | Tidak | Kirim OTP reset password ke email user.                          |
| POST   | `/auth/verify-otp`      | Ya    | Verifikasi OTP untuk proses reset password.                      |
| POST   | `/auth/change-password` | Ya    | Ganti password setelah OTP terverifikasi.                        |

### Articles

| Method | Endpoint        | Auth       | Kegunaan                                                                      |
| ------ | --------------- | ---------- | ----------------------------------------------------------------------------- |
| GET    | `/articles`     | Tidak      | Ambil daftar artikel dengan dukungan `page`, `limit`, `search`, `categories`. |
| POST   | `/articles`     | Ya (Admin) | Membuat artikel baru.                                                         |
| GET    | `/articles/:id` | Tidak      | Ambil detail artikel berdasarkan ID.                                          |
| PUT    | `/articles/:id` | Ya (Admin) | Memperbarui artikel berdasarkan ID.                                           |
| DELETE | `/articles/:id` | Ya (Admin) | Menghapus artikel berdasarkan ID.                                             |

### Categories

| Method | Endpoint          | Auth  | Kegunaan                              |
| ------ | ----------------- | ----- | ------------------------------------- |
| GET    | `/categories`     | Tidak | Ambil semua kategori berita.          |
| POST   | `/categories`     | Tidak | Membuat kategori baru.                |
| GET    | `/categories/:id` | Tidak | Ambil detail kategori berdasarkan ID. |
| PUT    | `/categories/:id` | Tidak | Memperbarui nama/status kategori.     |

### Comments

| Method | Endpoint                | Auth  | Kegunaan                                         |
| ------ | ----------------------- | ----- | ------------------------------------------------ |
| POST   | `/comments`             | Tidak | Membuat komentar baru untuk artikel.             |
| GET    | `/comments/me`          | Ya    | Mengambil komentar milik user yang sedang login. |
| GET    | `/comments/article/:id` | Tidak | Mengambil semua komentar pada artikel tertentu.  |
| GET    | `/comments/:id`         | Tidak | Mengambil detail komentar berdasarkan ID.        |
| PUT    | `/comments/:id`         | Ya    | Memperbarui komentar milik user.                 |
| DELETE | `/comments/:id`         | Ya    | Menghapus komentar milik user.                   |

### Reactions

| Method | Endpoint                 | Auth  | Kegunaan                                                                  |
| ------ | ------------------------ | ----- | ------------------------------------------------------------------------- |
| POST   | `/reactions`             | Ya    | Membuat reaksi (`like`/`dislike`) untuk artikel.                          |
| GET    | `/reactions/article/:id` | Tidak | Mengambil ringkasan jumlah reaksi artikel + reaksi user login (jika ada). |
| GET    | `/reactions/:id`         | Tidak | Mengambil detail reaksi berdasarkan ID.                                   |
| PUT    | `/reactions/:id`         | Ya    | Memperbarui tipe reaksi milik user.                                       |
| DELETE | `/reactions/:id`         | Ya    | Menghapus reaksi milik user.                                              |

### Media

| Method | Endpoint               | Auth  | Kegunaan                                                |
| ------ | ---------------------- | ----- | ------------------------------------------------------- |
| POST   | `/media/upload-single` | Tidak | Upload satu file media (misalnya gambar) ke Cloudinary. |
| DELETE | `/media/remove`        | Tidak | Hapus file media berdasarkan URL file.                  |

## Prasyarat

Pastikan sudah terpasang:

- Node.js (disarankan versi LTS terbaru)
- npm
- MongoDB (lokal atau Atlas)

## Konfigurasi Environment

### Backend (.env di be-morgans-news)

Contoh variabel yang digunakan:

```env
PORT=3001
MONGO_URL=

SECRET_JWT=
CLIENT_HOST=http://localhost:3000

EMAIL_SMTP_USER=
EMAIL_SMTP_PASS=
EMAIL_SMTP_HOST=
EMAIL_SMTP_PORT=465
EMAIL_SMTP_SERVICE_NAME=
SMPTP_SECURE=false

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
```

### Frontend (.env.local di fe-morgans-news)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXTAUTH_SECRET=
```

## Cara Menjalankan Project

## 1. Jalankan Backend

```bash
cd be-morgans-news
npm install
npm run dev
```

Backend berjalan di `http://localhost:3001`.

## 2. Jalankan Frontend

```bash
cd fe-morgans-news
npm install
npm run dev
```

Frontend berjalan di `http://localhost:3000`.

## Script Penting

### Frontend

- `npm run dev`: menjalankan mode development
- `npm run build`: build produksi
- `npm run start`: menjalankan hasil build
- `npm run lint`: linting frontend

### Backend

- `npm run dev`: menjalankan server backend dengan nodemon
- `npm run build`: compile TypeScript backend

## Catatan Pengembangan

- Pastikan nilai `NEXTAUTH_SECRET` pada frontend sudah diisi.
- Pastikan `CLIENT_HOST` backend sesuai URL frontend.
- Untuk fitur upload media, Cloudinary harus terkonfigurasi.

## Kontribusi

Jika ingin mengembangkan fitur baru:

- Buat branch baru dari branch utama
- Terapkan perubahan dengan commit yang jelas
- Lakukan pengujian manual pada alur login, artikel, komentar, dan admin

<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3VnMzdxMmllaWR4ZXlic3h5aGw5czk0ODc5ZjlyMnVhdjZnazQ3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9az09tlYyYNfq/giphy.gif" alt="Anime Thanks GIF">
