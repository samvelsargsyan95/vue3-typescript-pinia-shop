// src/services/RequestService.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class RequestService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL, // Use environment variable
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = this.getToken(); // Get the token from storage or environment
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  private getToken(): string | null {
    // Retrieve the token from local storage or use the one from .env as fallback
    return localStorage.getItem('authToken') || import.meta.env.VITE_API_TOKEN;
  }

  public create<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post<T>(url, data, config).then(response => response.data);
  }

  public read<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, config).then(response => response.data);
  }

  public update<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.patch<T>(url, data, config).then(response => response.data);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete<T>(url, config).then(response => response.data);
  }
}

export default new RequestService();
