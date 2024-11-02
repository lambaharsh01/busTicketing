import { busRouteInterface } from "../constants/interfaces";
import { localStorageItems } from "../constants/localStorageDataDictionary";

export const getUserEmail = (): string | null => {
  return localStorage.getItem("userEmail");
};

export const getBusColors = (): string[] => {
  let stringedBusColors:string | null= localStorage.getItem(localStorageItems.busColors)
  if(!stringedBusColors) stringedBusColors= '["#2E81EB", "#E48B40", "#3FA1AD", "#219652"]'

  const parsedBusColors: string[] = JSON.parse(stringedBusColors)
  return parsedBusColors
};

export const getBusInitials = (): string[] => {
  let stringedBusInitials:string | null= localStorage.getItem(localStorageItems.busInitials)
  if(!stringedBusInitials) stringedBusInitials= '["DL1PC", "DL1PD", "DL1PB", "DL51GD", "DL51EV"]'

  const parsedBusInitials: string[] = JSON.parse(stringedBusInitials)
  return parsedBusInitials
};

export const getBusRoutes = (): string[] => {
  let stringedBusRoute:string | null= localStorage.getItem(localStorageItems.busRoutes)
  if(!stringedBusRoute) stringedBusRoute = `[
  {"route":"578","terminalA":"Najafgarh Terminal","terminalB":"Safdurjung Terminal"},

  {"route":"887A","terminalA":"Ghumanehra","terminalB":"Uttam Nagar"},
  {"route":"DW3STL","terminalA":"Nangloi","terminalB":"Ghumanehra"},
  ]`

  const parsedBusRoutes: busRouteInterface[] = JSON.parse(stringedBusRoute)
  return parsedBusRoutes.map(elem=>elem.route);
};

export const getBusRoutesInfo = ():busRouteInterface[] => {
  let stringedBusRoute:string | null= localStorage.getItem(localStorageItems.busRoutes)
  if(!stringedBusRoute) stringedBusRoute = `[
  {"route":"578","terminalA":"Najafgarh Terminal","terminalB":"Safdurjung Terminal"},
  
  {"route":"887A","terminalA":"Ghumanehra","terminalB":"Uttam Nagar"},
  {"route":"DW3STL","terminalA":"Nangloi","terminalB":"Ghumanehra"}
  ]`

  const parsedBusRoutes: busRouteInterface[] = JSON.parse(stringedBusRoute)
  return parsedBusRoutes
}

export const getBusStops = (): string[] => {
  let stringedBusStops:string | null= localStorage.getItem(localStorageItems.busStops)
  if(!stringedBusStops) stringedBusStops= '["khera Village", "Ghumaherha"]'

  const parsedBusStops: string[] = JSON.parse(stringedBusStops)
  return parsedBusStops
};

export const getDiscount = (): number => {
  
  const stringedNumberParameter: string | null = localStorage.getItem(localStorageItems.discount)
  if(stringedNumberParameter) return Number(stringedNumberParameter)
  
  return 10
};
