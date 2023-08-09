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
  subuh: string;
  syuruk: string;
  zohor: string;
  asar: string;
  maghrib: string;
  isyak: string;
}
