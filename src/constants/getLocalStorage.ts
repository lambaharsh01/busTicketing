import { busRouteInterface } from "./interfaces";
import { localStorageItems } from "./localStorageDataDictionary";

export const getUserEmail = (): string | null => {
  return localStorage.getItem("userEmail");
};

export const getBusColors = (): string[] => {
  let stringedBusColor:string | null= localStorage.getItem(localStorageItems.busColors)
  if(!stringedBusColor) stringedBusColor= '["#2E81EB", "#E48B40", "#3FA1AD", "#219652"]'

  const parsedBusColor: string[] = JSON.parse(stringedBusColor)
  return parsedBusColor
};

export const getBusInitials = (): string[] => {
  return ["DL1PC", "DL1PD", "DL1PB", "DL51GD", "DL51EV"];
};


export const getBusRoutes = (): string[] => {

  const route:busRouteInterface[]= [
    {route: "887A", terminalA:"Ghumanehra", terminalB:"Uttam Nagar"}, 
    {route: "578", terminalA:"Najafgarh", terminalB:"Safdarjung"}, 
    {route: "DW3STL", terminalA:"Nangloi", terminalB:"Ghumanehra"}
  ]

  return route.map(elem=>elem.route);
};

export const getAllBusRoutes = ():busRouteInterface[] => {

  const route:busRouteInterface[]= [
    {route: "887A", terminalA:"Ghumanehra", terminalB:"Uttam Nagar"}, 
    {route: "578", terminalA:"Najafgarh", terminalB:"Safdarjung"}, 
    {route: "DW3STL", terminalA:"Nangloi", terminalB:"Ghumanehra"}
  ]

  return route;

}

export const getBusStops = (): string[] => {
  return ["khera Village", "Ghumaherha"];
};

export const getDiscount = (): number => {
  
  const stringedNumberParameter: string | null = localStorage.getItem(localStorageItems.discount)
  if(stringedNumberParameter) return Number(stringedNumberParameter)
  
  return 10
};
