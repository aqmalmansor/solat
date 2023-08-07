import React from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import SVG from "react-inlinesvg";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Solat from "services/solat";

import { useSolatStore } from "store/solat";

import { IGetPrayerTimeResponse } from "entities/solat";

import helper from "utils/helper";
import { zon } from "utils/placeholder";
import Motion from "utils/motion";

import icons from "assets/icons";

import PrayerCards from "./PrayerCards";
import Footer from "./Footer";
import ScreenLoader from "components/ScreenLoader";
import SelectBlocks from "./SelectBlocks";

const Home = () => {
  const {
    userCoords,
    setUserCoords,
    codeBasedSolatTimeApiParams,
    coordsLoader,
    displayCoordsLoader,
    setArrAddressState,
    jakimResponse,
    setJakimResponse,
  } = useSolatStore();

  const { isLoading: getPrayerTimesBasedOnCodenameIsLoading } = useQuery<
    IGetPrayerTimeResponse,
    Error
  >(
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
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  useQuery<IGetPrayerTimeResponse, Error>(
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
      onError: (err) => {
        toast.error(err.message);
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
    if (!jakimResponse) {
      return <div>No data</div>;
    }

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="container mx-auto flex min-h-[100vh] w-full flex-col items-center justify-center gap-5">
        {getPrayerTimesBasedOnCodenameIsLoading && <ScreenLoader />}
        <motion.div
          variants={Motion.staggerContainer(0.3, 0.5)}
          initial="hidden"
          whileInView="show"
          className="w-full"
          viewport={{ once: true }}
        >
          <motion.div variants={Motion.textVariant(0.2)}>
            <div className="flex flex-col gap-3 text-center">
              <h1>Islamic Prayer Times in Malaysia</h1>
              <h2>{jakimResponse?.place}</h2>
            </div>
          </motion.div>
          <SelectBlocks />
        </motion.div>
        {renderHomeContent()}
      </div>
      <Footer />
    </>
  );
};

export default Home;
