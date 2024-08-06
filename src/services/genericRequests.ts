import axios from "axios";
import { localStorageProvider } from "../utils/methods";
import { redirect } from "react-router-dom";
import { GenericPaths } from "./genericPaths";
export const baseURL = import.meta.env.VITE_SERVER_URL;

export const baseQuery = axios.create({
  baseURL,
});

baseQuery.interceptors.request.use(
  async (config) => {
    const userData = localStorageProvider.get("auth_data");
    const accessToken = userData?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseQuery.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const userData = localStorageProvider.get("auth_data");
    const refreshToken = userData?.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token not available");
    }

    const response = await axios.post(
      `${baseURL}/user/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorageProvider.save("auth_data", {
      ...userData,
      accessToken,
      refreshToken: newRefreshToken,
    });

    return accessToken;
  } catch (error) {
    redirect(GenericPaths.LOGIN);
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

export async function postAPI(url: string, data: any) {
  const response = (await baseQuery.post(url, data)) as any;
  return response?.data;
}

export async function putAPI(url: string, data?: any) {
  const response = (await baseQuery.put(url, data)) as any;
  return response?.data;
}

export async function getAPI(url: string) {
  const response = (await baseQuery.get(url)) as any;
  return response?.data;
}

export async function deleteAPI(url: string) {
  const response = (await baseQuery.delete(url)) as any;
  return response?.data;
}
