export enum FilterByPeriodEnum {
  day = 1,
  week = 2,
  month = 3,
}

export interface IGetPrayerTimeCoordParams {
  coords: {
    lat: string;
    lng: string;
  };
}

export interface IGetPrayerTimeParams {
  code: string;
  filter: FilterByPeriodEnum;
  appid: string;
  appurl: string;
}

export interface IGetPrayerTimeResponse {
  data: {
    attributes: {
      jakim_code: string;
      jakim_source: string;
    };
    code: string;
    place: string;
    provider: string;
    month: number;
    year: number;
    times: [[number, number, number, number, number, number]];
  };
}

export enum SolatEnum {
  none,
  subuh,
  syuruk,
  zohor,
  asar,
  maghrib,
  isyak,
}

export interface ICompulsaryPrayer {
  subuh: number;
  syuruk: number;
  zohor: number;
  asar: number;
  maghrib: number;
  isyak: number;
}

export interface ICompulsaryPrayerPlaceholder {
  id: SolatEnum;
  name: string;
  desc: string;
  niat: string;
  image: string;
}
