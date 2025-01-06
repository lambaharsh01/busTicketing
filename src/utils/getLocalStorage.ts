import {
  busRouteInterface,
  ticketStyleInterface,
  busTicketStorageInterface,
} from "../constants/interfaces";
import { localStorageItems } from "../constants/localStorageDataDictionary";

export const getToken = (): string | null => {
  return localStorage.getItem(localStorageItems.token);
};

export const getTicketProcessingStatus = (): boolean => {
  const stringedTicketProcessingStatus: string | null = localStorage.getItem(
    localStorageItems.ticketProcessingStatus
  );
  if (!stringedTicketProcessingStatus) return false;
  return JSON.parse(stringedTicketProcessingStatus);
};

export const getBusColors = (): string[] => {
  let stringedBusColors: string | null = localStorage.getItem(
    localStorageItems.busColors
  );
  if (!stringedBusColors)
    stringedBusColors =
      '["#2E81EB", "#E48B40", "#3FA1AD", "#219652", "#C54741"]';

  const parsedBusColors: string[] = JSON.parse(stringedBusColors);
  return parsedBusColors;
};

export const getBusInitials = (): string[] => {
  let stringedBusInitials: string | null = localStorage.getItem(
    localStorageItems.busInitials
  );
  if (!stringedBusInitials)
    stringedBusInitials = '["DL1PC", "DL1PD", "DL51GD", "DL51EV"]';

  const parsedBusInitials: string[] = JSON.parse(stringedBusInitials);
  return parsedBusInitials;
};

export const getBusRoutes = (): string[] => {
  let stringedBusRoute: string | null = localStorage.getItem(
    localStorageItems.busRoutes
  );
  if (!stringedBusRoute) stringedBusRoute = `[]`;

  const parsedBusRoutes: busRouteInterface[] = JSON.parse(stringedBusRoute);
  return parsedBusRoutes.map((elem) => elem.route);
};

export const getBusRoutesInfo = (): busRouteInterface[] => {
  let stringedBusRoute: string | null = localStorage.getItem(
    localStorageItems.busRoutes
  );
  if (!stringedBusRoute) stringedBusRoute = `[]`;

  const parsedBusRoutes: busRouteInterface[] = JSON.parse(stringedBusRoute);
  return parsedBusRoutes;
};

export const getBusStops = (): string[] => {
  let stringedBusStops: string | null = localStorage.getItem(
    localStorageItems.busStops
  );
  if (!stringedBusStops)
    stringedBusStops =
      '["Uttam Nagar Terminal", "Ghuman Hera Depot 2", "Dichau Kalan Depot"]';

  const parsedBusStops: string[] = JSON.parse(stringedBusStops);
  return parsedBusStops;
};

export const getDiscount = (): number => {
  const stringedNumberParameter: string | null = localStorage.getItem(
    localStorageItems.discount
  );
  if (stringedNumberParameter) return Number(stringedNumberParameter);

  return 10;
};

export const getTicketStyling = (): ticketStyleInterface => {
  let stringedTicketStyle: string | null = localStorage.getItem(
    localStorageItems.ticketStyle
  );

  if (!stringedTicketStyle)
    stringedTicketStyle = `{
  "ticketInfoHeight":58,
  "ticketHeaderMargin":25,
  "headerLeftFontSize":18.5,
  "headerRightFontSize":15.5,
  "mainHeaderFontSize":22,
  "mainHeaderMarginTop":7,
  "headermarginTop":4,
  "saperatingLineMarginTop":8,
  "saperatingLineMarginBottom":9.5,
  "infoFontSize":20.4,
  "subHeadingFontSize":16.4,
  "subHeadingMarginBottom":-1,
  "verticalMarginTop":6.3
  }`;
  const parsedTicketStyle: ticketStyleInterface =
    JSON.parse(stringedTicketStyle);
  return parsedTicketStyle;
};

export const getTicketStore = (): busTicketStorageInterface[] => {
  let stringedTicketStore: string | null = localStorage.getItem(
    localStorageItems.ticketStore
  );
  if (!stringedTicketStore) stringedTicketStore = "[]";

  const parsedTicketStore: busTicketStorageInterface[] =
    JSON.parse(stringedTicketStore);
  return parsedTicketStore;
};
