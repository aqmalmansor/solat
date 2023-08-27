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
  formModalIsOpen: boolean;
  setFormModalOpen: (param: boolean) => void;
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

const localStorageCoords = JSON.parse(localStorage.getItem("coords") as string);
const localStorageCodeName = localStorage.getItem("codename") as string;

export const useSolatStore = create<ZusSolatType>((set, _get) => ({
  addressState: "",
  cityCode: "",
  userCoords: {
    coords: {
      lat: localStorageCoords.coords.lat ?? "",
      lng: localStorageCoords.coords.lng ?? "",
    },
  },
  arrAddressState: [[]],
  codeBasedSolatTimeApiParams: {
    code: localStorageCodeName ?? "wlp-0",
    filter: FilterByPeriodEnum.day,
    appid: "mpt-json-api",
    appurl: "http://mpt.i906.my",
  },
  jakimResponse: undefined,
  monthlyPrayerTimes: [],
  coordsLoader: false,
  todayPrayerTimes: undefined,
  formModalIsOpen: false,
  setFormModalOpen: (param: boolean) => set({ formModalIsOpen: param }),
  setTodayPrayerTimes: (param: ICompulsaryPrayer) =>
    set({ todayPrayerTimes: param }),
  setArrAddressState: (array: string[][]) => set({ arrAddressState: array }),
  displayCoordsLoader: (param: boolean) => set({ coordsLoader: param }),
  setCityCode: (cityCode: string) => set({ cityCode }),
  setAddressState: (addressState: string) => set({ addressState }),
  setUserCoords: (coords: IGetPrayerTimeCoordParams) => {
    localStorage.setItem("coords", JSON.stringify(coords));
    set({ userCoords: coords });
  },
  setJakimResponse: (jakimResponse: IGetPrayerTimeResponse["data"]) =>
    set({ jakimResponse }),
  setMonthlyPrayerTimes: (monthlyPrayerTimes: ICompulsaryPrayer[]) =>
    set({ monthlyPrayerTimes }),

  setCodeBasedSolatTimeApiParams: (param: IGetPrayerTimeParams) => {
    localStorage.setItem("codename", param.code);

    set({
      codeBasedSolatTimeApiParams: param,
    });
  },
}));
