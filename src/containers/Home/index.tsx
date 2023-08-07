import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import SVG from "react-inlinesvg";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Solat from "services/solat";

import { useSolatStore } from "store/solat";

import { IGetPrayerTimeResponse } from "entities/solat";
import { ALIGN_ITEMS, JUSTIFY_CONTENT, SPACING } from "entities/tailwind";

import helper from "utils/helper";
import { zon } from "utils/placeholder";
import Motion from "utils/motion";

import icons from "assets/icons";

import ScreenLoader from "components/ScreenLoader";
import Flex from "components/Flex";
import PrayerCards from "./PrayerCards";
import Footer from "./Footer";
import SelectBlocks from "./SelectBlocks";
import InstallPWA from "./Button/InstallPWA";

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}
const Home = () => {
  const [isPWA, setIsPWA] = useState<boolean>(false);

  useEffect(() => {
    if ("navigator" in window && "standalone" in window.navigator) {
      if (window.navigator.standalone) {
        setIsPWA(window.navigator.standalone);
        alert("s");
      }
    }
  }, []);

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
        <Flex
          fill
          justify={JUSTIFY_CONTENT.between}
          gap={SPACING.small}
          noPadding
        >
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
        </Flex>
        <PrayerCards />
      </React.Fragment>
    );
  };

  return (
    <motion.div
      variants={Motion.staggerContainer(0.3, 0.5)}
      initial="hidden"
      whileInView="show"
      className="w-full"
      viewport={{ once: true }}
    >
      <Flex
        fill
        direction="column"
        gap={SPACING.small}
        align={ALIGN_ITEMS.center}
        justify={JUSTIFY_CONTENT.center}
        salt="min-h-[95vh] container mx-auto relative pt-12"
      >
        {getPrayerTimesBasedOnCodenameIsLoading && <ScreenLoader />}
        {isPWA && <InstallPWA />}
        <motion.div variants={Motion.textVariant(1)}>
          <Flex
            justify={JUSTIFY_CONTENT.center}
            gap={SPACING.small}
            xPadding={SPACING.none}
            yPadding={SPACING.extraSmall}
            direction="column"
            salt="text-center"
          >
            <h1>Islamic Prayer Times in Malaysia</h1>
            <h2>{jakimResponse?.place}</h2>
          </Flex>
        </motion.div>
        <SelectBlocks />
        {renderHomeContent()}
      </Flex>
      <Footer />
    </motion.div>
  );
};

export default Home;
