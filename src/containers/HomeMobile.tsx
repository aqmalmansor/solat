import React from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useState } from "react";
import uuid from "react-uuid";
import SVG from "react-inlinesvg";


import Solat from "../services/solat";
import {
    FilterByPeriodEnum,
    IGetPrayerTimeCoordParams,
    IGetPrayerTimeParams,
    IGetPrayerTimeResponse,
} from "../entities/solat";

import PrayerTimeCard from "../components/PrayerTimeCard";

import helper from "../utils/helper";
import { zon } from "../utils/placeholder";
import icons from "../assets/icons";
import PhoneMockup from "../components/PhoneMockup";
import ThemeSwitch from "../components/ThemeSwitch";
import Menu from "../components/Menu";

const HomeMobile = () => {
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
        // const jakimLink = data?.data.attributes.jakim_source || "";
        // const updatedJakimLink = jakimLink.replace(
        //     "period=duration",
        //     "period=today"
        // );

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
                    {/* <div>
                        <h1>Islamic Prayer Times in Malaysia</h1>
                    </div> */}
                    <div className="relative flex w-full flex-row flex-wrap justify-center h-full gap-4 visible">
                        <div className="flex justify-between my-2 mx-5 w-full">
                            <div className="card-body py-4 px-0">
                                <p className="card-title m-0">{data.data.place}</p>
                            </div>
                        <ThemeSwitch />
                        </div>
                        <div className="flex flex-wrap gap-5 justify-center items-center h-fit mx-5 md:mx-0">
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
                        <div className="flex w-full flex-row flex-wrap justify-between mx-5 my-3 h-fit">
                            <div className="text-base-content">{dayjs().format("DD MMMM YYYY")}</div>
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
                        <Menu>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">State</span>
                                    <span className="label-text-alt">Alt label</span>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setSelectedState(e.target.value);
                                        const selectedCityList =
                                            Object.values(zon)[
                                            Object.keys(zon).findIndex((i) => i === e.target.value)
                                            ];
                                        setArrState(selectedCityList);
                                        e.stopPropagation();
                                    }}
                                    value={
                                        selectedState || helper.cityStateChecker(data.data.code)
                                    }
                                    className="select select-primary w-full max-w-xs"
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
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">City</span>
                                    <span className="label-text-alt">Alt label</span>
                                </label>
                                <select
                                    value={selectedCityCode}
                                    onChange={(e) => {
                                        setSelectedCityCode(e.target.value);
                                        setInputVal({
                                            ...inputVal,
                                            code: e.target.value,
                                        });
                                        e.stopPropagation();
                                    }}
                                    className="select select-primary w-full max-w-xs"
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
                            </div>
                        </Menu>
                    </div>
                    {/* <div className="capitalize">
                        <div className="flex gap-3">
                            <div>Reference:</div>
                            <a href={updatedJakimLink}>{data.data.provider}</a>
                        </div>
                    </div> */}
                </React.Fragment>
            )
        );
    };

    return (
        <div className="flex flex-wrap justify-center items-center h-screen">
            <div className="hidden sm:flex">
                <PhoneMockup>
                        {renderHomeContent()}
                </PhoneMockup>
            </div>
            <div className="block h-full overflow-hidden sm:hidden ">
                {renderHomeContent()}
            </div>
        </div>
    );
};

export default HomeMobile;
