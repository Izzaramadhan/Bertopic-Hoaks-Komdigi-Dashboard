# FastAPI + React BERTopic Hoaks Kominfo/Komdigi

Template ini menggunakan arsitektur:

```text
Notebook BERTopic
      ↓
CSV hasil modelling
      ↓
FastAPI Backend
      ↓
React Dashboard
```

## Struktur Folder

```text
fastapi_react_bertopic_komdigi/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── requirements-ml.txt
│   └── data/
│       ├── hasil_topic_modeling_komdigi.csv
│       ├── informasi_topik_bertopic.csv
│       └── komdigi_hoaks.csv
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        └── styles.css
```

## Langkah 1 — Siapkan Data Hasil Notebook

Jalankan notebook BERTopic sampai menghasilkan:

- `hasil_topic_modeling_komdigi.csv`
- `informasi_topik_bertopic.csv`

Kemudian letakkan kedua file itu di:

```text
backend/data/
```

## Langkah 2 — Jalankan Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Buka:

```text
http://localhost:8000/docs
```

## Langkah 3 — Jalankan Frontend

Buka terminal baru:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Buka:

```text
http://localhost:5173
```

## Deployment yang Disarankan

### Frontend React
Deploy ke:
- Vercel
- Netlify
- GitHub Pages

### Backend FastAPI
Deploy ke:
- Railway
- Render
- Fly.io
- VPS
- Vercel Python Runtime, untuk API ringan

## Catatan Penting

Untuk proyek UTS, sangat disarankan agar BERTopic dijalankan di notebook/Colab saja.
Backend sebaiknya hanya membaca file CSV hasil modelling agar deployment lebih ringan,
stabil, dan cepat dibuka.

Jika ingin endpoint prediksi topik teks baru, lihat komentar di `backend/main.py`
dan install `requirements-ml.txt`.
