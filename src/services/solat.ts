import axios from "axios";
import { IGetPrayerTimeCoordParams } from "../entities/solat";
import {
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

const basedOnCodename = async (params: IGetPrayerTimeParams) => {
  const res: any = await apiClient.get<IGetPrayerTimeResponse>(
    `/${params.code}`,
    {
      params,
    }
  );
  return res;
};

const basedOnCoords = async (params: IGetPrayerTimeCoordParams) => {
  const res: any = await apiClient.get<IGetPrayerTimeResponse>(
    `/${params.coords.lat},${params.coords.lng}`,
    {}
  );
  return res;
};

const Solat = {
  basedOnCodename,
  basedOnCoords,
};

export default Solat;
