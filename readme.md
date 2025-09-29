# 💸 Expense Tracker

## 🎯 Project Details

### 💸 Expense Tracker V.1 & 🎯 Description

Expense Tracker V.1 adalah project sederhana untuk belajar fundamental JavaScript (Vanilla) dengan membangun aplikasi pencatat pengeluaran harian.
Fokus utama ada pada pemahaman konsep dasar JS (variabel, operator, function, object, array, loop, control flow) sambil melatih logika berpikir komputasional.

Versi pertama (V.1) ini sengaja dibatasi pada level paling sederhana:

- Data hanya ada di memory (hilang setelah reload).
- Lingkupnya cuma daily expense recap.
- Tidak ada backend, API, atau persistent storage.

### 📌 Spesifikasi V.1

- Platform: Client-side only (HTML, CSS, Vanilla JS).
- Penyimpanan Data: In-memory (Array JS), hilang setelah reload.

### ⚙️ Main Features:

- Tambah pengeluaran (nama + jumlah).
- Lihat daftar pengeluaran hari itu.
- Hitung total pengeluaran per hari.
- Validasi Input:
  - Nama barang/jasa tidak boleh kosong.
  - Jumlah harus berupa angka positif.
- Manipulasi Data:
  - Hapus data pengeluaran.
  - (Optional) Edit data pengeluaran.
- UI:
  - Basic styling (HTML + CSS dari Step-1).
  - Mobile-friendly dasar (simple flex/grid).

### 🗂️ Dat Structure Rules

1. Representasi Data (Daily Expenses)

- Data disimpan dalam bentuk array of objects:
- Representasi Data (Daily Expenses)

```js
const dailyExpenses = [
  {
    id: 1, // unique identifier (timestamp atau incremental)
    name: 'Nasi Goreng', // nama barang/jasa
    price: 20000, // harga per unit (number, >0)
    quantity: 2, // jumlah unit/barang (number, >0)
    time: '2025-09-28T12:30:00', // ISO string (opsional, untuk sorting/filter)
  },
  {
    id: 2,
    name: 'Kopi',
    price: 15000,
    quantity: 1,
    time: '2025-09-28T15:00:00',
  },
];
```

2. Struktur Object Pengeluaran

- id → unik untuk identifikasi.
- name → nama barang/jasa (string).
- price → harga barang (number, > 0).
- quantity → jumlah barang (number, > 0).
- time → waktu pembelian (string/Date).

3. Aturan Tambahan

- Urutan default berdasarkan waktu input.
- Total harian dihitung dengan reduce().
- Semua data hilang saat reload (tidak ada persistence).

### 🚀 Roadmap — Steps to Complete V.1

Catatan: V.1 adalah Main Output dari Topic-1: JavaScript Basics.
Roadmap ini incremental (Step-1 → Step-5).

- Step-1 — Project Setup

  - Setup repo, struktur file (index.html, style.css, app.js), Node & VSCode ready.
  - Buat console.log("Hello World").

- Step-2 — Add Expense (form → memory)

  - Buat form input (nama, jumlah).
  - Tambahkan input ke array dailyExpenses.

- Step-3 — Render List & Total

  - Render daftar pengeluaran ke DOM.
  - Tampilkan total dengan reduce().

- Step-4 — Validation & Delete/Edit

  - Validasi input sebelum push ke array.
  - Implementasi delete (hapus item).
  - (Optional) Edit item.

- Step-5 — Styling & UX Polish
  - Tambahkan CSS dasar agar lebih enak dipakai.
  - Minimal responsive (mobile friendly).

## 🏁 Final review V.1.

### 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)

### 📚 Tujuan Pembelajaran

- Menghubungkan teori ke praktik: dari fundamental JS ke project nyata.
- Belajar struktur data sederhana (array + object).
- Melatih DOM manipulation (render list, update UI).
- Melatih problem-solving dengan input validation dan data manipulation.
- Incremental development: bikin project step by step, bukan langsung kompleks.

### ✅ Manfaat & Keunikan

- Simple but scalable: walaupun cuma daily recap, strukturnya gampang di-upgrade ke weekly/monthly (V.2 & V.3).
- Low entry barrier: bisa jalan hanya dengan browser & editor (no backend, no API).
- Latihan nyata: bikin project yang relevan dengan kehidupan sehari-hari (nyatet pengeluaran).
- Focus on fundamentals: ngasah logic & JS dasar tanpa distraksi teknologi lain.
