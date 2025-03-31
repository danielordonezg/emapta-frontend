import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://emapta-backend-production.up.railway.app/api/v1/emapta",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AUTH

export const loginRequest = async (email: string, password: string) => {
  const response = await apiClient.post("/signin", { email, password });
  return response.data;
};

export const registerRequest = async (email: string, username: string, password: string) => {
  const roles = ["user"]
  const response = await apiClient.post("/signup", { email, username ,roles,  password });
  return response.data;
};

// EHR

export interface EHRMappingPayload {
  mapping: object;
  ehrName: string;
}

export const saveEHRMapping = async (payload: EHRMappingPayload) => {
  const response = await apiClient.post("/ehr", payload);
  return response.data;
};

export const getAllEHRMappings = async () => {
  const response = await apiClient.get("/ehr");
  return response.data;
};

export const getEHRMappingById = async (id: string) => {
  const response = await apiClient.get(`/ehr/${id}`);
  return response.data;
};

export const updateEHRMapping = async (id: string, payload: EHRMappingPayload) => {
  const response = await apiClient.put(`/ehr/${id}`, payload);
  return response.data;
};

export const deleteEHRMapping = async (id: string) => {
  const response = await apiClient.delete(`/ehr/${id}`);
  return response.data;
};