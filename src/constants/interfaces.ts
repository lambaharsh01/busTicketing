// MAP
export interface coordinatesInterface {
  latitude: number;
  longitude: number;
  error?: string | null;
}

export interface mapPropInterface {
  height?: string; // Optional height prop
  width?: string; // Optional width prop
}

// CAMERA
export interface cameraComponentInterface {
  height?: string;
  width?: string;
  classString?: string;
}

// STRUCTURES

export interface structureGetObjectOutOfAnArrayInterface {
  label: string;
  value: string;
}

export interface structureGetStringSizeReturnInterface {
  bytes: number;
  kb: number;
  mb: number;
  parsed: any;
  stringified: string;
}

export interface busContextInterface {
  //BusContextType interface defines the structure of the context.
  busNumber: string | null;
  setBusNumber: (parameter: string) => void;

  busColor: string | null;
  setBusColor: (parameter: string) => void;

  busInitials: string | null;
  setBusInitials: (parameter: string) => void;

  busRoute: string | null;
  setBusRoute: (parameter: string) => void;

  startingStop: string | null;
  setStartingStop: (parameter: string) => void;

  endingStop: string | null;
  setEndingStop: (parameter: string) => void;

  discountedCost: number | null;
  setDiscountedCost: (parameter: number) => void;

  ticketCost: number | null;
  setTicketCost: (parameter: number) => void;

  ticketCount: number | null;
  setTicketCount: (parameter: number) => void;

  time: string | null;
  setTime: (parameter: string) => void;
}

// LOCAL STORAGE
export interface busRouteInterface {
  route: string;
  terminalA: string;
  terminalB: string;
}

export interface localStorageResponse {
  success: boolean;
  error?: string;
}

export interface ticketStyleInterface {
  ticketInfoHeight: number;
  ticketHeaderMargin: number;
  headerLeftFontSize: number;
  headerRightFontSize: number;
  mainHeaderFontSize: number;
  mainHeaderMarginTop: number;
  headermarginTop: number;
  saperatingLineMarginTop: number;
  saperatingLineMarginBottom: number;
  infoFontSize: number;
  subHeadingFontSize: number;
  subHeadingMarginBottom: number;
  verticalMarginTop: number;
}


export interface ticketStagingInterface {
    busNumber:string;
    busInitials:string;
    busColor:string;
    busRoute:string;
    startingStop: string;
    endStop:string;
    ticketAmount:number;
    ticketCount:number;
    discount:number;
}


export interface ticketStagedInterface {
    busNumber:string;
    busInitials:string;
    busColor:string;
    busRoute:string;
    startingStop: string;
    endStop:string;
    ticketAmount:number;
    ticketCount:number;
    discount:number;
    purchaseTime:string;
    userId:string;
    longitude:string;
    latitude:string;
}


export interface busTicketStorageInterface{
    busColor: string;
    busInitials:string;
    busNumber:string;
    busRoute:string;
    startingStop:string;
    endingStop:string;
    totalCost: number;
    ticketCount: number;
    discountedCost:number;
    bookingTime:string;
}