import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let accessToken = "";

export function setAccessToken(newToken: string): void {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use(
  (config: ExtendedAxiosRequestConfig): ExtendedAxiosRequestConfig => {
    if (config.headers && !config.headers.authorization) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    const prevRequest: ExtendedAxiosRequestConfig | undefined = error.config;

    if (error.response?.status === 403 && prevRequest && !prevRequest.sent) {
      try {
        const response = await axiosInstance.get("/auth/refreshTokens");
        accessToken = response.data.accessToken;
        prevRequest.sent = true;

        if (prevRequest.headers) {
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return axiosInstance(prevRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// do not delete this code yet

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API,
//   withCredentials: true,
// });

// let accessToken = "";

// function setAccessToken(newToken) {
//   accessToken = newToken;
// }

// axiosInstance.interceptors.request.use((config) => {
//   if (!config.headers.Authorization) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const prevRequest = error.config;
//     if (error.response.status === 403 && !prevRequest.sent) {
//       const response = await axiosInstance("/auth/refreshTokens");
//       accessToken = response.data.accessToken;
//       prevRequest.sent = true;
//       prevRequest.headers.Authorization = `Bearer ${accessToken}`;
//       return axiosInstance(prevRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// export { setAccessToken };

// export default axiosInstance;
