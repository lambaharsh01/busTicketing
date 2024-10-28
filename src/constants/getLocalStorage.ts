export const getUserEmail = (): (string | null) => {
  return localStorage.getItem("userEmail");
};

export const getBusColors = (): string[] => {
  return ["#2E81EB", "#E48B40", "#3FA1AD", "#219652", "#F4A8D6"];
};

export const getBusInitials = (): string[] => {
  return ["DL1PC", "DL1PD", "DL1PB", "DL51GD", "DL51EV"];
};

export const getBusRoutes = (): string[] => {
  return ["887A", "578", "DW3STL"];
}

export const getBusStops = (): string[] =>{
  return ["khera Village", "Ghumaherha"]
}