import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import SVG from "react-inlinesvg";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Solat from "services/solat";

import { useSolatStore } from "store/solat";
import { useUIStore } from "store/ui";

import { IGetPrayerTimeResponse } from "entities/solat";
import { ALIGN_ITEMS, JUSTIFY_CONTENT, SPACING } from "entities/tailwind";

import helper, { platforms } from "utils/helper";
import { zon } from "utils/placeholder";
import Motion from "utils/motion";

import icons from "assets/icons";

import ScreenLoader from "components/ScreenLoader";
import Flex from "components/Flex";

import PrayerCards from "./PrayerCards";
import HowToInstall from "./Modal/HowToInstall";
import PrayerInfo from "./Modal/PrayerInfo";
import ChangeLocation from "./Modal/ChangeLocation";
import TimerSection from "./Timer";
import Navbar from "./Navbar";

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}
const Home = () => {
  const [isPWA, setIsPWA] = useState<boolean>(false);
  const [manualInstall, setManualInstall] = useState<boolean>(false);
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false);
  const platform = helper.getPlatform();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(() => {
          // Set service worker ready
          setServiceWorkerReady(true);
        })
        .catch((error) => {
          // Set service worker not ready
          console.error("Error getting service worker ready:", error);
        });
    }
  }, [navigator.serviceWorker]);

  useEffect(() => {
    if (serviceWorkerReady) {
      if (
        window.navigator.standalone === true ||
        window.matchMedia("(display-mode: standalone)").matches
      ) {
        if (platform !== platforms.OTHER) {
          setIsPWA(true); // isPWA
        }
      } else {
        // if browser is not PWA supported, set manual install to true
        if (platform !== platforms.NATIVE && platform != platforms.OTHER) {
          setManualInstall(true);
        }
        setIsPWA(false); // not PWA
      }
    }
  }, [serviceWorkerReady]);

  const {
    userCoords,
    setUserCoords,
    codeBasedSolatTimeApiParams,
    coordsLoader,
    displayCoordsLoader,
    setArrAddressState,
    jakimResponse,
    setJakimResponse,
    formModalIsOpen,
    setFormModalOpen,
  } = useSolatStore();

  const { insallationGuideModalIsOpen, solat, solatInfoModalIsOpen } =
    useUIStore();

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
        setFormModalOpen(false);
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
        setFormModalOpen(false);
      },
      onSettled: () => {
        displayCoordsLoader(false);
      },
      onError: (err) => {
        toast.error(err.message);
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
              console.error("Geolocation is not supported by this browser.");
              displayCoordsLoader(false);
            }
          } else {
            console.error(
              "Please allow your location permission in your browser."
            );
            displayCoordsLoader(false);
          }
        });
  };

  const renderHomeContent = () => {
    if (!jakimResponse) {
      return <div>No data</div>;
    }

    return (
      <Flex
        direction="column"
        xPadding={SPACING.none}
        yPadding={SPACING.reset}
        salt="pb-16 pt-5"
      >
        <Flex
          fill
          noPadding
          gap={SPACING.small}
          justify={JUSTIFY_CONTENT.between}
        >
          <div>{dayjs().format("DD MMMM YYYY")} /&nbsp;</div>
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
      </Flex>
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
      <Navbar
        pwaReady={isPWA === false && serviceWorkerReady}
        displayInstallationGuide={manualInstall}
      />
      <div className="flex min-h-screen flex-col justify-between">
        <Flex
          fill
          direction="column"
          gap={SPACING.small}
          id="timer-container"
          align={ALIGN_ITEMS.center}
          justify={JUSTIFY_CONTENT.between}
          salt="container mx-auto relative"
        >
          <TimerSection />
        </Flex>
        <div className="w-screen bg-black/20">
          <Flex
            id="prayer-cards-container"
            fill
            direction="column"
            yPadding={SPACING.none}
            gap={SPACING.small}
            align={ALIGN_ITEMS.center}
            justify={JUSTIFY_CONTENT.between}
            salt="container mx-auto relative"
          >
            {renderHomeContent()}
          </Flex>
        </div>
      </div>

      {solat && solatInfoModalIsOpen && <PrayerInfo />}
      {insallationGuideModalIsOpen && <HowToInstall />}
      {getPrayerTimesBasedOnCodenameIsLoading && <ScreenLoader />}
      {formModalIsOpen && (
        <ChangeLocation
          getPrayerTimesCoords={() => getUserCurrentLocationHandler()}
          getPrayerTimesCoordsIsLoading={coordsLoader}
          getPrayerTimesCodenameIsLoading={
            getPrayerTimesBasedOnCodenameIsLoading
          }
        />
      )}
      {/* {isPWA === false && serviceWorkerReady && (
        <InstallPWA manualInstall={manualInstall} />
      )} */}
    </motion.div>
  );
};

export default Home;
