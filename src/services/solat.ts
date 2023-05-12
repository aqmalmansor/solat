import axios, { AxiosRequestConfig } from "axios";
import {
  IGetPrayerTimeCoordParams,
  IGetPrayerTimeParams,
  IGetPrayerTimeResponse,
} from "../entities/solat";

const apiClient = axios.create({
  baseURL: "https://mpt.i906.my/api/prayer/",
  headers: {
    "Content-Type": "application/json",
    withCredentials: false,
  },
});

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const basedOnCodename = async (
  params: IGetPrayerTimeParams
): Promise<IGetPrayerTimeResponse> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/${params.code}`,
  };
  return await apiRequest<IGetPrayerTimeResponse>(config);
};

const basedOnCoords = async (
  params: IGetPrayerTimeCoordParams
): Promise<IGetPrayerTimeResponse> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/${params.coords.lat},${params.coords.lng}`,
  };
  return await apiRequest<IGetPrayerTimeResponse>(config);
};

const Solat = {
  basedOnCodename,
  basedOnCoords,
};

export default Solat;
