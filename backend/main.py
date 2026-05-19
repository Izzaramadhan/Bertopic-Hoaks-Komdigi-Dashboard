from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Optional

import pandas as pd
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

RESULT_FILE = DATA_DIR / "hasil_topic_modeling_komdigi.csv"
TOPIC_INFO_FILE = DATA_DIR / "informasi_topik_bertopic.csv"
RAW_FILE = DATA_DIR / "komdigi_hoaks.csv"

app = FastAPI(
    title="BERTopic Hoaks Kominfo/Komdigi API",
    description="API untuk dashboard analisis tren dan dinamika topik artikel klarifikasi hoaks.",
    version="1.0.0",
)

# CORS untuk mengizinkan frontend lokal dan frontend deployment mengakses API.
# Untuk tahap awal deployment, allow_origins=["*"] dibuat agar tidak error CORS.
# Setelah frontend Vercel sudah punya URL final, ini bisa dibuat lebih spesifik.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "BERTopic Hoaks Komdigi API is running",
        "docs": "/docs",
        "health": "/api/health",
        "summary": "/api/summary",
        "filters": "/api/filters",
        "yearly_trend": "/api/trends/yearly",
        "monthly_trend": "/api/trends/monthly",
        "top_topics": "/api/topics/top",
        "articles": "/api/articles",
    }


class PredictRequest(BaseModel):
    text: str


def _safe_int(value):
    if pd.isna(value):
        return None
    return int(value)


def _safe_str(value):
    if pd.isna(value):
        return None
    return str(value)


@lru_cache(maxsize=1)
def load_dataset() -> tuple[pd.DataFrame, str]:
    """Load hasil modelling jika tersedia. Jika belum, fallback ke dataset mentah."""
    if RESULT_FILE.exists():
        df = pd.read_csv(RESULT_FILE)
        source = RESULT_FILE.name
    elif RAW_FILE.exists():
        df = pd.read_csv(RAW_FILE)
        source = RAW_FILE.name
    else:
        raise FileNotFoundError(
            "Data tidak ditemukan. Letakkan hasil_topic_modeling_komdigi.csv "
            "atau komdigi_hoaks.csv di folder backend/data."
        )

    if "published_at" in df.columns:
        df["published_at"] = pd.to_datetime(df["published_at"], errors="coerce")
    elif "tanggal" in df.columns:
        df["published_at"] = pd.to_datetime(df["tanggal"], errors="coerce")
    else:
        df["published_at"] = pd.NaT

    df["year"] = df["published_at"].dt.year
    df["month"] = df["published_at"].dt.month
    df["year_month"] = df["published_at"].dt.to_period("M").astype(str)
    df.loc[df["published_at"].isna(), "year_month"] = None

    if "topic" in df.columns and "topic_name" not in df.columns:
        df["topic_name"] = df["topic"].apply(lambda x: f"Topik {x}")
    elif "topic" not in df.columns:
        df["topic"] = None
        df["topic_name"] = "Belum Ada Hasil BERTopic"

    return df, source


@lru_cache(maxsize=1)
def load_topic_info() -> pd.DataFrame:
    if TOPIC_INFO_FILE.exists():
        return pd.read_csv(TOPIC_INFO_FILE)
    return pd.DataFrame()


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "message": "BERTopic Hoaks Komdigi API is running",
    }


@app.get("/api/summary")
def summary():
    df, source = load_dataset()
    date_min = df["published_at"].min()
    date_max = df["published_at"].max()

    return {
        "source": source,
        "total_articles": int(len(df)),
        "total_topics": int(df["topic"].nunique(dropna=True))
        if "topic" in df.columns
        else 0,
        "date_min": date_min.strftime("%Y-%m-%d") if pd.notna(date_min) else None,
        "date_max": date_max.strftime("%Y-%m-%d") if pd.notna(date_max) else None,
        "outliers": int((df["topic"] == -1).sum()) if "topic" in df.columns else 0,
        "available_columns": list(df.columns),
    }


@app.get("/api/filters")
def filters():
    df, _ = load_dataset()

    years = sorted([int(x) for x in df["year"].dropna().unique()])

    topics = (
        df[["topic", "topic_name"]]
        .drop_duplicates()
        .dropna(subset=["topic_name"])
        .sort_values("topic_name")
        .to_dict(orient="records")
    )

    return {
        "years": years,
        "topics": topics,
    }


@app.get("/api/trends/yearly")
def yearly_trend():
    df, _ = load_dataset()

    result = (
        df.dropna(subset=["year"])
        .groupby("year")
        .size()
        .reset_index(name="count")
        .sort_values("year")
    )

    result["year"] = result["year"].astype(int)

    return result.to_dict(orient="records")


@app.get("/api/trends/monthly")
def monthly_trend():
    df, _ = load_dataset()

    result = (
        df.dropna(subset=["year_month"])
        .groupby("year_month")
        .size()
        .reset_index(name="count")
        .sort_values("year_month")
    )

    return result.to_dict(orient="records")


@app.get("/api/topics/top")
def top_topics(limit: int = Query(20, ge=1, le=100)):
    df, _ = load_dataset()

    result = (
        df.groupby(["topic", "topic_name"], dropna=False)
        .size()
        .reset_index(name="count")
        .sort_values("count", ascending=False)
        .head(limit)
    )

    return [
        {
            "topic": _safe_int(row["topic"]),
            "topic_name": _safe_str(row["topic_name"]),
            "count": int(row["count"]),
        }
        for _, row in result.iterrows()
    ]


@app.get("/api/topics/yearly")
def topic_yearly(limit: int = Query(8, ge=1, le=30)):
    df, _ = load_dataset()

    top_topic_names = (
        df.groupby("topic_name")
        .size()
        .sort_values(ascending=False)
        .head(limit)
        .index
        .tolist()
    )

    result = (
        df[df["topic_name"].isin(top_topic_names)]
        .dropna(subset=["year"])
        .groupby(["year", "topic_name"])
        .size()
        .reset_index(name="count")
        .sort_values(["year", "topic_name"])
    )

    result["year"] = result["year"].astype(int)

    return result.to_dict(orient="records")


@app.get("/api/topic-info")
def topic_info():
    info = load_topic_info()

    if info.empty:
        return []

    return info.fillna("").to_dict(orient="records")


@app.get("/api/articles")
def articles(
    year: Optional[int] = None,
    topic_name: Optional[str] = None,
    q: Optional[str] = None,
    limit: int = Query(50, ge=1, le=300),
    offset: int = Query(0, ge=0),
):
    df, _ = load_dataset()
    filtered = df.copy()

    if year is not None:
        filtered = filtered[filtered["year"] == year]

    if topic_name:
        filtered = filtered[filtered["topic_name"].astype(str) == topic_name]

    if q:
        text_cols = [
            col
            for col in ["title", "body_text", "clean_text", "topic_name"]
            if col in filtered.columns
        ]

        mask = pd.Series(False, index=filtered.index)

        for col in text_cols:
            mask = mask | filtered[col].astype(str).str.contains(
                q,
                case=False,
                na=False,
            )

        filtered = filtered[mask]

    filtered = filtered.sort_values(
        "published_at",
        ascending=False,
        na_position="last",
    )

    total = len(filtered)
    page = filtered.iloc[offset : offset + limit]

    records = []

    for _, row in page.iterrows():
        records.append(
            {
                "title": _safe_str(row.get("title")),
                "published_at": row["published_at"].strftime("%Y-%m-%d")
                if pd.notna(row.get("published_at"))
                else None,
                "year": _safe_int(row.get("year")),
                "topic": _safe_int(row.get("topic")),
                "topic_name": _safe_str(row.get("topic_name")),
                "url": _safe_str(row.get("url")),
            }
        )

    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "data": records,
    }


# ============================================================
# OPTIONAL: endpoint prediksi topik teks baru
# ============================================================
# Endpoint ini sengaja dinonaktifkan dari dependency utama agar deployment ringan.
# Jika ingin dipakai:
# 1. install requirements-ml.txt
# 2. simpan model BERTopic di backend/model_bertopic_komdigi_safetensors
# 3. aktifkan kode di bawah ini
#
# from bertopic import BERTopic
#
# MODEL_DIR = BASE_DIR / "model_bertopic_komdigi_safetensors"
#
# @lru_cache(maxsize=1)
# def load_model():
#     if not MODEL_DIR.exists():
#         raise FileNotFoundError("Folder model BERTopic tidak ditemukan.")
#     return BERTopic.load(str(MODEL_DIR))
#
# @app.post("/api/predict-topic")
# def predict_topic(payload: PredictRequest):
#     model = load_model()
#     topics, probs = model.transform([payload.text])
#     topic_id = int(topics[0])
#     return {
#         "topic": topic_id,
#         "topic_words": model.get_topic(topic_id),
#     }