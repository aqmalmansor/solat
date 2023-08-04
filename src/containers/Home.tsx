import React from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useState } from "react";
import uuid from "react-uuid";
import SVG from "react-inlinesvg";

import Solat from "services/solat";
import {
  FilterByPeriodEnum,
  IGetPrayerTimeCoordParams,
  IGetPrayerTimeParams,
  IGetPrayerTimeResponse,
} from "../entities/solat";

import Container from "components/Container";
import PrayerTimeCard from "components/PrayerTimeCard";

import helper from "utils/helper";
import { zon } from "utils/placeholder";
import icons from "assets/icons";

const Home = () => {
  const initialValue: IGetPrayerTimeParams = {
    code: "wlp-0",
    filter: FilterByPeriodEnum.day,
    appid: "mpt-json-api",
    appurl: "http://mpt.i906.my",
  };

  const [inputVal, setInputVal] = useState<IGetPrayerTimeParams>(initialValue);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCityCode, setSelectedCityCode] = useState<string>("");
  const [arrState, setArrState] = useState<string[][]>([[]]);
  const [displayCoordsLoader, setDisplayCoordsLoader] =
    useState<boolean>(false);
  const [data, setData] = useState<IGetPrayerTimeResponse | undefined>(
    undefined
  );
  const [coordsVal, setCoordsVal] = useState<IGetPrayerTimeCoordParams>({
    coords: {
      lat: "",
      lng: "",
    },
  });

  const {
    isLoading: getPrayerTimesBasedOnCodenameIsLoading,
    isError: getPrayerTimesBasedOnCodenameIsError,
    error: getPrayerTimesBasedOnCodenameError,
  } = useQuery<IGetPrayerTimeResponse, Error>(
    ["getPrayerTimeBasedOnCodenameQuery", inputVal],
    async () => await Solat.basedOnCodename(inputVal),
    {
      cacheTime: 0,
      onSuccess: (data) => {
        setData(data);
        setArrState(
          Object.values(zon)[
            Object.keys(zon).findIndex(
              (i) => i === helper.cityStateChecker(data.data.code)
            )
          ]
        );
        if (displayCoordsLoader) setDisplayCoordsLoader(false);
      },
    }
  );

  const {
    isError: getPrayerTimesBasedOnCoordsIsError,
    error: getPrayerTimesBasedOnCoordsError,
  } = useQuery<IGetPrayerTimeResponse, Error>(
    ["getPrayerTimeBasedOnCoordsQuery", coordsVal],
    async () => await Solat.basedOnCoords(coordsVal),
    {
      cacheTime: 0,
      enabled: !!coordsVal.coords.lat && !!coordsVal.coords.lng,
      onSuccess: (data) => {
        setData(data);
        setArrState(
          Object.values(zon)[
            Object.keys(zon).findIndex(
              (i) => i === helper.cityStateChecker(data.data.code)
            )
          ]
        );
      },
      onSettled: () => {
        setDisplayCoordsLoader(false);
      },
    }
  );

  const getUserCurrentLocationHandler = () => {
    setDisplayCoordsLoader(true);
    setCoordsVal({
      coords: {
        lat: "",
        lng: "",
      },
    });
    navigator.permissions &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          if (
            PermissionStatus.state == "granted" ||
            PermissionStatus.state == "prompt"
          ) {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCoordsVal({
                  coords: {
                    lat: latitude.toString(),
                    lng: longitude.toString(),
                  },
                });
              });
            } else {
              alert("Geolocation is not supported by this browser.");
              setDisplayCoordsLoader(false);
            }
          } else {
            alert("Please allow your location permission in your browser.");
            setDisplayCoordsLoader(false);
          }
        });
  };

  const renderHomeContent = () => {
    const jakimLink = data?.data.attributes.jakim_source || "";
    const updatedJakimLink = jakimLink.replace(
      "period=duration",
      "period=today"
    );

    if (getPrayerTimesBasedOnCodenameIsLoading) {
      return <div>Loading...</div>;
    }

    if (
      getPrayerTimesBasedOnCodenameIsError ||
      getPrayerTimesBasedOnCoordsIsError
    ) {
      return (
        <div>
          {getPrayerTimesBasedOnCodenameError?.message.toString() ||
            getPrayerTimesBasedOnCoordsError?.message.toString()}
        </div>
      );
    }

    return (
      data &&
      data.data && (
        <React.Fragment>
          <div>
            <h1>Islamic Prayer Times in Malaysia</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              <h2>{data.data.place}</h2>
            </div>
          </div>
          <div className="flex w-full flex-row flex-wrap justify-center">
            <div className="mb-3 w-full px-3 md:mb-0 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    const selectedCityList =
                      Object.values(zon)[
                        Object.keys(zon).findIndex((i) => i === e.target.value)
                      ];
                    setArrState(selectedCityList);
                  }}
                  value={
                    selectedState || helper.cityStateChecker(data.data.code)
                  }
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 capitalize leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-state"
                >
                  {Object.keys(zon).map((z) => {
                    let newZ: string = z;
                    if (z === "wilayah") {
                      newZ = "Wilayah Persekutuan";
                    } else if (z === "pulauPinang") {
                      newZ = "Pulau Pinang";
                    } else if (z === "negeriSembilan") {
                      newZ = "Negeri Sembilan";
                    }

                    return (
                      <option key={uuid()} value={z}>
                        {newZ}
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-3 w-full px-3 md:mb-0 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-city"
              >
                City
              </label>
              <div className="relative">
                <select
                  value={selectedCityCode}
                  onChange={(e) => {
                    setSelectedCityCode(e.target.value);
                    setInputVal({
                      ...inputVal,
                      code: e.target.value,
                    });
                  }}
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 capitalize leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-city"
                >
                  <option value="">Please select one of the option</option>
                  {arrState.length > 0 &&
                    arrState.map((arr) => {
                      return (
                        <option key={uuid()} value={arr[1]}>
                          {arr[0]}
                        </option>
                      );
                    })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-row flex-wrap content-center justify-center gap-5 md:justify-around">
            <div className="flex w-full flex-row flex-wrap justify-between px-5">
              <div>{dayjs().format("DD MMMM YYYY")}</div>
              <button
                type="button"
                disabled={displayCoordsLoader}
                onClick={getUserCurrentLocationHandler}
              >
                {displayCoordsLoader ? (
                  "Loading"
                ) : (
                  <SVG
                    src={icons.GetCurrentLocationSVG}
                    height={25}
                    width={25}
                  />
                )}
              </button>
            </div>
            {data.data.times.map((prayerList) => {
              return prayerList.map((prayer, index) => {
                const prayerTime = dayjs(new Date(prayer * 1000));

                if (dayjs().isSame(prayerTime, "day") === false) {
                  return null;
                }
                return (
                  <React.Fragment key={`${index}--${prayer * 1000}`}>
                    <PrayerTimeCard
                      index={index}
                      time={prayerTime.format("DD-MM-YYYY@HH:mm A")}
                    />
                  </React.Fragment>
                );
              });
            })}
          </div>
          <div className="capitalize">
            <div className="flex gap-3">
              <div>Reference:</div>
              <a href={updatedJakimLink}>{data.data.provider}</a>
            </div>
          </div>
        </React.Fragment>
      )
    );
  };

  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 pb-9">
        {renderHomeContent()}
      </div>
    </Container>
  );
};

export default Home;
