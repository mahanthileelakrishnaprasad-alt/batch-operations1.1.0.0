import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

export async function fetchBatches(params, signal) {
  const { data } = await api.get("/batches", { params, signal });
  return data; // { success, data, pagination }
}

export async function fetchCentres(signal) {
  const { data } = await api.get("/batches/centres", { signal });
  return data.data;
}
