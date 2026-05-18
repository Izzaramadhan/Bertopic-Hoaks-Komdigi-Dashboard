# Frontend React Dashboard

Frontend ini dibuat dengan Vite + React.

## Menjalankan lokal

```bash
cd frontend
npm install
npm run dev
```

Dashboard akan berjalan di:

```text
http://localhost:5173
```

Pastikan backend FastAPI juga berjalan di:

```text
http://localhost:8000
```

Jika backend memakai URL lain, ubah file `.env`:

```text
VITE_API_BASE_URL=https://url-backend-kamu
```

## Build production

```bash
npm run build
```

Hasil build akan berada di folder `dist`.
