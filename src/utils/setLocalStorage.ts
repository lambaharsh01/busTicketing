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
import { getStringSize, findDiscountedAmount } from "./structures";
import fetchCoordinates from "./getGeoLocation";
// import { getUserEmail, getTicketStore } from "./getLocalStorage";
import { getTicketStore } from "./getLocalStorage";
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

    localStorage.setItem(
      localStorageItems.busInitials,
      stringedBusInitial.stringified
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

    localStorage.setItem(
      localStorageItems.busRoutes,
      stringedBusRouteInfo.stringified
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

    const ticketStaged: ticketStagedInterface = {
      ...parameter,
      purchaseTime: currentTime,
      longitude: stringedLatitude,
      latitude: stringedLongitude,
    };

    // try {
    //   let apiResponse = await axiosInterceptor({
    //     method: "post",
    //     url: "/ticketing/add-ticket",
    //   })
    // } catch (err) {

    // }

    const discountedCost: number = findDiscountedAmount(
      parameter.ticketAmount * parameter.ticketCount,
      parameter.discount
    );

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
