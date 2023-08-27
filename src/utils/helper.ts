import dayjs from "dayjs";
import {
  isMobile,
  isAndroid,
  isFirefox,
  isIOS,
  isOpera,
  browserVersion,
} from "mobile-device-detect";

const convertIndexToPrayerTitle = (index: number) => {
  switch (index) {
    case 0:
      return "Subuh";
    case 1:
      return "Syuruk";
    case 2:
      return "Zohor";
    case 3:
      return "Asar";
    case 4:
      return "Maghrib";
    case 5:
      return "Isyak";
    default:
      return;
  }
};

const cityStateChecker = (code: string): string => {
  const sliceCode = code.split("-");
  switch (sliceCode[0]) {
    case "jhr":
      return "johor";
    case "kdh":
      return "kedah";
    case "ktn":
      return "kelantan";
    case "mlk":
      return "melaka";
    case "ngs":
      return "negeriSembilan";
    case "phg":
      return "pahang";
    case "prk":
      return "perak";
    case "pls":
      return "perlis";
    case "png":
      return "pulauPinang";
    case "sbh":
      return "sabah";
    case "swk":
      return "sarawak";
    case "sgr":
      return "selangor";
    case "trg":
      return "terengganu";
    case "wlp":
      return "wilayah";
    default:
      return "wilayah";
  }
};

const capitalizeWords = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const platforms = {
  NATIVE: "native", // currently: Chrome, Edge mobile, Samsung internet
  FIREFOX: "firefox",
  FIREFOX_NEW: "firefox_new", // above version 79
  OPERA: "opera",
  IDEVICE: "idevice",
  OTHER: "other", // don't know, so will do nothing
};

const getPlatform = () => {
  let platform = platforms.OTHER;
  // eslint-disable-next-line no-prototype-builtins
  if (window.hasOwnProperty("BeforeInstallPromptEvent")) {
    platform = platforms.NATIVE;
  } else if (isMobile && isAndroid && isFirefox && +browserVersion >= 79) {
    platform = platforms.FIREFOX_NEW;
  } else if (isMobile && isAndroid && isFirefox) {
    platform = platforms.FIREFOX;
  } else if (isOpera && isAndroid && isMobile) {
    platform = platforms.OPERA;
  } else if (isIOS && isMobile) {
    platform = platforms.IDEVICE;
  }
  return platform;
};

const checkDurationBetweenSolat = (diff: number) => {
  return dayjs.duration(diff * 1000, "milliseconds");
};

export default {
  cityStateChecker,
  convertIndexToPrayerTitle,
  capitalizeWords,
  getPlatform,
  checkDurationBetweenSolat,
};
