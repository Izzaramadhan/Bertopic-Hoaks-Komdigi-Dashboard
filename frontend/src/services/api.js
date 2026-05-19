const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Gagal mengambil data dari ${path}`);
  }

  return response.json();
}

export { API_BASE };