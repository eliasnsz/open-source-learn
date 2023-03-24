import axios from "axios";
import { parseCookies } from "nookies";

export function getApi(ctx? : any) {
  const { ["session"]: token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3001",
  })

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config
  })

  return api
}