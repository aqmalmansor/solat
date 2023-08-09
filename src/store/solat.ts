import {
  IGetPrayerTimeCoordParams,
  IGetPrayerTimeResponse,
  ICompulsaryPrayer,
  IGetPrayerTimeParams,
  FilterByPeriodEnum,
} from "entities/solat";
import { create } from "zustand";

export interface ZusSolatType {
  jakimResponse: undefined | IGetPrayerTimeResponse["data"];
  monthlyPrayerTimes: ICompulsaryPrayer[];
  addressState: string;
  cityCode: string;
  userCoords: IGetPrayerTimeCoordParams;
  codeBasedSolatTimeApiParams: IGetPrayerTimeParams;
  coordsLoader: boolean;
  arrAddressState: string[][];
  todayPrayerTimes: ICompulsaryPrayer | undefined;
  setTodayPrayerTimes: (param: ICompulsaryPrayer) => void;
  setArrAddressState: (array: string[][]) => void;
  setUserCoords: (coords: IGetPrayerTimeCoordParams) => void;
  setAddressState: (addressState: string) => void;
  setCityCode: (cityCode: string) => void;
  setMonthlyPrayerTimes: (monthlyPrayerTimes: ICompulsaryPrayer[]) => void;
  setJakimResponse: (jakimResponse: IGetPrayerTimeResponse["data"]) => void;
  setCodeBasedSolatTimeApiParams: (param: IGetPrayerTimeParams) => void;
  displayCoordsLoader: (param: boolean) => void;
}

export const useSolatStore = create<ZusSolatType>((set, _get) => ({
  addressState: "",
  cityCode: "",
  userCoords: {
    coords: {
      lat: "",
      lng: "",
    },
  },
  arrAddressState: [[]],
  codeBasedSolatTimeApiParams: {
    code: "wlp-0",
    filter: FilterByPeriodEnum.day,
    appid: "mpt-json-api",
    appurl: "http://mpt.i906.my",
  },
  jakimResponse: undefined,
  monthlyPrayerTimes: [],
  coordsLoader: false,
  todayPrayerTimes: undefined,
  setTodayPrayerTimes: (param: ICompulsaryPrayer) =>
    set({ todayPrayerTimes: param }),
  setArrAddressState: (array: string[][]) => set({ arrAddressState: array }),
  displayCoordsLoader: (param: boolean) => set({ coordsLoader: param }),
  setCityCode: (cityCode: string) => set({ cityCode }),
  setAddressState: (addressState: string) => set({ addressState }),
  setUserCoords: (coords: IGetPrayerTimeCoordParams) =>
    set({ userCoords: coords }),
  setJakimResponse: (jakimResponse: IGetPrayerTimeResponse["data"]) =>
    set({ jakimResponse }),
  setMonthlyPrayerTimes: (monthlyPrayerTimes: ICompulsaryPrayer[]) =>
    set({ monthlyPrayerTimes }),

  setCodeBasedSolatTimeApiParams: (param: IGetPrayerTimeParams) =>
    set({
      codeBasedSolatTimeApiParams: param,
    }),
}));
