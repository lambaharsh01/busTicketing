import {
  localStorageResponse,
  structureGetStringSizeReturnInterface,
  busRouteInterface,
  ticketStyleInterface,
  ticketStagingInterface,
  ticketStagedInterface,
  coordinatesInterface,
  busTicketStorageInterface,
} from "../constants/interfaces";
import { localStorageItems } from "../constants/localStorageDataDictionary";
import errorMessage from "./errorMessage";
import { getStringSize } from "./structures";
import fetchCoordinates from "./getGeoLocation";
// import { getUserEmail, getTicketStore } from "./getLocalStorage";
import {
  getTicketStore,
  getBusStops,
  getBusRoutesInfo,
} from "./getLocalStorage";
import { currentTimeStamp } from "./time";

import { threeHundredKb, fiveHundredKb } from "../constants/config";
import axiosInterceptor from "./axiosInterceptor";

export const setTicketProcessingStatus = (parameter: boolean) => {
  localStorage.setItem(
    localStorageItems.ticketProcessingStatus,
    JSON.stringify(parameter)
  );
};

export const setToken = async (
  parameter: string
): Promise<localStorageResponse> => {
  try {
    localStorage.setItem(localStorageItems.token, parameter);
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setDiscount = async (
  parameter: number
): Promise<localStorageResponse> => {
  try {
    if (parameter < 0)
      throw new Error("Discount can not be of a negative value.");
    if (parameter > 100) throw new Error("Discount can not be more than 100.");

    const stringedNumberParameter: string = parameter.toString();
    localStorage.setItem(localStorageItems.discount, stringedNumberParameter);

    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setBusColors = async (
  parameter: string[]
): Promise<localStorageResponse> => {
  try {
    const stringedBusColor: structureGetStringSizeReturnInterface =
      getStringSize(parameter);

    if (stringedBusColor.mb > threeHundredKb)
      throw new Error(
        `Bus Colors are of size ${stringedBusColor.mb}mb exciding the limit of ${threeHundredKb}mb`
      );

    try {
      await axiosInterceptor({
        method: "post",
        url: "/ticketing/save-bus-colors",
        data: { colors: stringedBusColor.parsed },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    localStorage.setItem(
      localStorageItems.busColors,
      stringedBusColor.stringified
    );
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setBusInitials = async (
  parameter: string[]
): Promise<localStorageResponse> => {
  try {
    const stringedBusInitial: structureGetStringSizeReturnInterface =
      getStringSize(parameter);
    if (stringedBusInitial.mb > threeHundredKb)
      throw new Error(
        `Bus Initials are of size ${stringedBusInitial.mb}mb exciding the limit of ${threeHundredKb}mb`
      );

    try {
      await axiosInterceptor({
        method: "post",
        url: "/ticketing/save-bus-initials",
        data: { initials: stringedBusInitial.parsed },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    localStorage.setItem(
      localStorageItems.busInitials,
      stringedBusInitial.stringified
    );
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setBusRouteInfo = async (
  parameter: busRouteInterface
): Promise<localStorageResponse> => {
  try {
    parameter.route = parameter.route.trim();
    const busRoutes = getBusRoutesInfo();
    const duplicate = busRoutes.some(
      (obj) =>
        obj.route.toLocaleLowerCase() === parameter.route.toLocaleLowerCase()
    );

    if (duplicate) throw new Error("similar bus route exisits");

    const stringedBusRouteInfo: structureGetStringSizeReturnInterface =
      getStringSize([parameter, ...busRoutes]);
    // if (stringedBusRouteInfo.mb > fiveHundredKb)
    //   throw new Error(
    //     `Bus Colors are of size ${stringedBusRouteInfo.mb}mb exciding the limit of ${fiveHundredKb}mb`
    //   );

    try {
      await axiosInterceptor({
        method: "post",
        url: "/ticketing/save-bus-routes",
        data: { routes: stringedBusRouteInfo.parsed },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    localStorage.setItem(
      localStorageItems.busRoutes,
      stringedBusRouteInfo.stringified
    );
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setBusRoutesInfo = async (
  parameter: busRouteInterface[]
): Promise<localStorageResponse> => {
  try {
    const stringedBusRouteInfo: structureGetStringSizeReturnInterface =
      getStringSize(parameter);
    if (stringedBusRouteInfo.mb > fiveHundredKb)
      throw new Error(
        `Bus Colors are of size ${stringedBusRouteInfo.mb}mb exciding the limit of ${fiveHundredKb}mb`
      );

    try {
      await axiosInterceptor({
        method: "post",
        url: "/ticketing/save-bus-routes",
        data: { routes: stringedBusRouteInfo.parsed },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    localStorage.setItem(
      localStorageItems.busRoutes,
      stringedBusRouteInfo.stringified
    );
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setBusStop = async (
  parameter: string
): Promise<localStorageResponse> => {
  try {
    const busStop = parameter.trim();
    const busStops = getBusStops();

    if (busStop.length < 2) {
      throw new Error("Bus stop should have a minimum of 2 characters");
    }

    const duplicate = busStops.some(
      (str) => str.toLocaleLowerCase() === busStop.toLocaleLowerCase()
    );

    if (duplicate) {
      throw new Error("Similar bus stop exists");
    }

    try {
      await axiosInterceptor({
        method: "post",
        url: "/ticketing/save-bus-stops",
        data: { stops: [busStop] },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    const stringedBusStops: structureGetStringSizeReturnInterface =
      getStringSize([busStop, ...busStops]);

    localStorage.setItem(
      localStorageItems.busStops,
      stringedBusStops.stringified
    );
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
export const setBusStops = async (
  parameter: string[]
): Promise<localStorageResponse> => {
  try {
    const stringedBusStops: structureGetStringSizeReturnInterface =
      getStringSize(parameter);
    if (stringedBusStops.mb > threeHundredKb)
      throw new Error(
        `Bus Stops are of size ${stringedBusStops.mb}mb exciding the limit of ${threeHundredKb}mb`
      );

    try {
      await axiosInterceptor({
        method: "post",
        url: "/ticketing/save-bus-stops",
        data: { stops: stringedBusStops.parsed },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    localStorage.setItem(
      localStorageItems.busStops,
      stringedBusStops.stringified
    );
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setTicketStyling = async (
  parameter: ticketStyleInterface
): Promise<localStorageResponse> => {
  try {
    const stringedTicketStyle: structureGetStringSizeReturnInterface =
      getStringSize(parameter);

    localStorage.setItem(
      localStorageItems.ticketStyle,
      stringedTicketStyle.stringified
    );

    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};

export const setTicketData = async (
  parameter: ticketStagingInterface
): Promise<busTicketStorageInterface> => {
  try {
    const currentTime: string = currentTimeStamp();

    const { latitude, longitude }: coordinatesInterface =
      await fetchCoordinates();
    const stringedLatitude: string = latitude.toString();
    const stringedLongitude: string = longitude.toString();

    var discountedCost: number = 0
    var discount: number = 0
    
    switch(parameter.ticketAmount){
      case 5:
          discountedCost = 4.75
          discount = 5
        break;
      case 10:
          discountedCost = 9.25
          discount = 7.5
        break;
      case 15:
          discountedCost = 13.75
          discount = 8.33
        break;
      case 20:
          discountedCost = 18.25
          discount = 8.75
        break;
      case 25:
          discountedCost = 22.75
          discount = 9
        break;
    }

    const ticketStaged: ticketStagedInterface = {
      ...parameter,
      purchaseTime: currentTime,
      longitude: stringedLatitude,
      latitude: stringedLongitude,
      discount,
    };

    try {
      await axiosInterceptor({
        method: "post",
        url: "/ticketing/add-ticket",
        data: ticketStaged,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred");
    }

    // = findDiscountedAmount(
    //   parameter.ticketAmount * parameter.ticketCount,
    //   parameter.discount
    // );
    // const discountedCost: number = findDiscountedAmount(
    //   parameter.ticketAmount * parameter.ticketCount,
    //   parameter.discount
    // );

    const ticketToBeStored: busTicketStorageInterface = {
      busColor: parameter.busColor,
      busInitials: parameter.busInitials,
      busNumber: parameter.busNumber,
      busRoute: parameter.busRoute,
      startingStop: parameter.startingStop,
      endingStop: parameter.endStop,
      totalCost: parameter.ticketAmount,
      ticketCount: parameter.ticketCount,
      discountedCost: discountedCost,
      bookingTime: currentTime,
    };

    const currentTicketStore: busTicketStorageInterface[] = getTicketStore();
    if (currentTicketStore.length > 9) {
      // i want it to be 6 at max
      currentTicketStore.pop();
      currentTicketStore.unshift(ticketToBeStored);
    } else {
      currentTicketStore.unshift(ticketToBeStored);
    }

    const stringedCurrentTicketStore: string =
      JSON.stringify(currentTicketStore);
    localStorage.setItem(
      localStorageItems.ticketStore,
      stringedCurrentTicketStore
    );

    return ticketToBeStored;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
