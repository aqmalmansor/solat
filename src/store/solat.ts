import {
  IGetPrayerTimeCoordParams,
  IGetPrayerTimeResponse,
  ICompulsaryPrayer,
} from "entities/solat";
import { create } from "zustand";

export interface ISolatSlice {
  jakimResponse: undefined | IGetPrayerTimeResponse["data"];
  monthlyPrayerTimes: ICompulsaryPrayer[];
  addressState: string;
  cityCode: string;
  userCoords: IGetPrayerTimeCoordParams;
  setUserCoords: (coords: IGetPrayerTimeCoordParams) => void;
  setAddressState: (addressState: string) => void;
  setCityCode: (cityCode: string) => void;
  setMonthlyPrayerTimes: (monthlyPrayerTimes: ICompulsaryPrayer[]) => void;
  setJakimResponse: (jakimResponse: IGetPrayerTimeResponse["data"]) => void;
}

export const useSolatStore = create<ISolatSlice>((set, _get) => ({
  addressState: "",
  cityCode: "",
  userCoords: {
    coords: {
      lat: "",
      lng: "",
    },
  },
  jakimResponse: undefined,
  monthlyPrayerTimes: [],
  setCityCode: (cityCode: string) => set({ cityCode }),
  setAddressState: (addressState: string) => set({ addressState }),
  setUserCoords: (coords: IGetPrayerTimeCoordParams) =>
    set({ userCoords: coords }),
  setJakimResponse: (jakimResponse: IGetPrayerTimeResponse["data"]) =>
    set({ jakimResponse }),
  setMonthlyPrayerTimes: (monthlyPrayerTimes: ICompulsaryPrayer[]) =>
    set({ monthlyPrayerTimes }),
}));
