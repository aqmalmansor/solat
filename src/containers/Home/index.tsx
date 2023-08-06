import React from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import uuid from "react-uuid";
import SVG from "react-inlinesvg";

import Solat from "services/solat";

import { useSolatStore } from "store/solat";

import { IGetPrayerTimeResponse } from "entities/solat";

import helper from "utils/helper";
import { zon } from "utils/placeholder";

import icons from "assets/icons";

import PrayerCards from "./PrayerCards";
import Footer from "./Footer";

const Home = () => {
  const {
    addressState,
    setAddressState,
    userCoords,
    setUserCoords,
    cityCode,
    setCityCode,
    codeBasedSolatTimeApiParams,
    setCodeBasedSolatTimeApiParams,
    coordsLoader,
    displayCoordsLoader,
    arrAddressState,
    setArrAddressState,
    jakimResponse,
    setJakimResponse,
  } = useSolatStore();

  const {
    isLoading: getPrayerTimesBasedOnCodenameIsLoading,
    isError: getPrayerTimesBasedOnCodenameIsError,
    error: getPrayerTimesBasedOnCodenameError,
  } = useQuery<IGetPrayerTimeResponse, Error>(
    ["getPrayerTimeBasedOnCodenameQuery", codeBasedSolatTimeApiParams],
    async () => await Solat.basedOnCodename(codeBasedSolatTimeApiParams),
    {
      onSuccess: (res) => {
        setJakimResponse(res.data);
        setArrAddressState(
          Object.values(zon)[
            Object.keys(zon).findIndex(
              (i) => i === helper.cityStateChecker(res.data.code)
            )
          ]
        );
        if (coordsLoader) displayCoordsLoader(false);
      },
    }
  );

  const {
    isError: getPrayerTimesBasedOnCoordsIsError,
    error: getPrayerTimesBasedOnCoordsError,
  } = useQuery<IGetPrayerTimeResponse, Error>(
    ["getPrayerTimeBasedOnCoordsQuery", userCoords],
    async () => await Solat.basedOnCoords(userCoords),
    {
      enabled: !!userCoords.coords.lat && !!userCoords.coords.lng,
      onSuccess: (res) => {
        setJakimResponse(res.data);
        setArrAddressState(
          Object.values(zon)[
            Object.keys(zon).findIndex(
              (i) => i === helper.cityStateChecker(res.data.code)
            )
          ]
        );
      },
      onSettled: () => {
        displayCoordsLoader(false);
      },
    }
  );

  const getUserCurrentLocationHandler = () => {
    displayCoordsLoader(true);
    setUserCoords({
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
                setUserCoords({
                  coords: {
                    lat: latitude.toString(),
                    lng: longitude.toString(),
                  },
                });
              });
            } else {
              alert("Geolocation is not supported by this browser.");
              displayCoordsLoader(false);
            }
          } else {
            alert("Please allow your location permission in your browser.");
            displayCoordsLoader(false);
          }
        });
  };

  const renderHomeContent = () => {
    const jakimLink = jakimResponse?.attributes.jakim_source || "";
    const updatedJakimLink = jakimLink.replace(
      "period=duration",
      "period=today"
    );

    if (!jakimResponse) {
      return <div>No data</div>;
    }

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
      <React.Fragment>
        <div>
          <h1>Islamic Prayer Times in Malaysia</h1>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <h2>{jakimResponse.place}</h2>
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
                  setAddressState(e.target.value);
                  const selectedCityList =
                    Object.values(zon)[
                      Object.keys(zon).findIndex((i) => i === e.target.value)
                    ];
                  setArrAddressState(selectedCityList);
                }}
                value={
                  addressState || helper.cityStateChecker(jakimResponse.code)
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
                      {helper.capitalizeWords(newZ)}
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
                value={cityCode}
                onChange={(e) => {
                  setCityCode(e.target.value);
                  setCodeBasedSolatTimeApiParams({
                    ...codeBasedSolatTimeApiParams,
                    code: e.target.value,
                  });
                }}
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 capitalize leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-city"
              >
                <option value="">Please select one of the option</option>
                {arrAddressState.length > 0 &&
                  arrAddressState.map((arr) => {
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
              aria-label="Get Current location"
              disabled={coordsLoader}
              onClick={getUserCurrentLocationHandler}
            >
              {coordsLoader ? (
                "Loading"
              ) : (
                <SVG src={icons.GetCurrentLocationSVG} height={25} width={25} />
              )}
            </button>
          </div>
        </div>
        <PrayerCards />
        <div className="flex w-full justify-center  gap-3 capitalize md:justify-end md:pr-10">
          <div>Reference:</div>
          <a href={updatedJakimLink}>{jakimResponse.provider}</a>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="container relative mx-auto min-h-[100vh]">
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 pb-10">
        {renderHomeContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
