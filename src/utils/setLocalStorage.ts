import {
  localStorageResponse,
  structureGetStringSizeReturnInterface,
  busRouteInterface,
} from "../constants/interfaces";
import { localStorageItems } from "../constants/localStorageDataDictionary";
import errorMessage from "./errorMessage";
import { getStringSize } from "./structures";

import { threeHundredKb, fiveHundredKb } from "../constants/config";

export const setDiscount = (parameter: number): localStorageResponse => {
  try {
    if (parameter < 0)
      throw new Error("Discount can not be of a negative value.");
    if (parameter > 100) throw new Error("Discount can not be more than 100.");

    const stringedNumberParameter: string = parameter.toString();
    localStorage.setItem(localStorageItems.discount, stringedNumberParameter);

    return { success: true };
  } catch (error) {
    return { success: false, error: errorMessage(error) };
  }
};

export const setBusColors = (parameter: string[]): localStorageResponse => {
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
    return { success: false, error: errorMessage(error) };
  }
};

export const setBusInitials = (parameter: string[]): localStorageResponse => {
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
    return { success: false, error: errorMessage(error) };
  }
};

export const setBusRoutesInfo = (
  parameter: busRouteInterface[]
): localStorageResponse => {
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
    return { success: false, error: errorMessage(error) };
  }
};

export const setBusStops = (parameter: string[]): localStorageResponse => {
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
    return { success: false, error: errorMessage(error) };
  }
};
