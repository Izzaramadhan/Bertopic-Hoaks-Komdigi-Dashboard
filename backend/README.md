# Backend FastAPI

Backend ini membaca hasil topic modeling dari folder `data`.

## File data yang direkomendasikan

Letakkan file berikut di `backend/data/`:

- `hasil_topic_modeling_komdigi.csv`
- `informasi_topik_bertopic.csv`

Jika belum ada hasil modelling, backend bisa fallback ke:

- `komdigi_hoaks.csv`

Namun fitur analisis topik akan belum lengkap jika hanya memakai dataset mentah.

## Menjalankan backend lokal

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API akan berjalan di:

```text
http://localhost:8000
```

Dokumentasi otomatis:

```text
http://localhost:8000/docs
```
