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
    busNumber: string | string | null;
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
  
    discount: number | null;
    setDiscount: (parameter: number) => void;
  
    ticketCost: number | null;
    setTicketCost: (parameter: number) => void;
  
    ticketCount: number | null;
    setTicketCount: (parameter: number) => void;
  
    totalCost: number | null;
    setTotalCost: (parameter: number) => void;
  }

// LOCAL STORAGE
export interface busRouteInterface{
  route: string;
  terminalA: string;
  terminalB: string;
}

export interface localStorageResponse{
  success: boolean;
  error?: string;
}