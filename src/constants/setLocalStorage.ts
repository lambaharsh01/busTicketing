import { localStorageResponse, structureGetStringSizeReturnInterface } from "./interfaces";
import { localStorageItems } from "./localStorageDataDictionary"
import errorMessage from "../utils/errorMessage";
import { getStringSize } from "../utils/structures";

import { busColorLimit } from "./config";

export const setDiscount = (parameter: number): localStorageResponse =>{
    try{
        if(parameter<0) throw new Error("Discount can not be of a negative value.")
        if(parameter > 100)  throw new Error("Discount can not be more than 100.")

        const stringedNumberParameter: string =parameter.toString();
        localStorage.setItem(localStorageItems.discount, stringedNumberParameter)

        return {success:true}
    }catch(error){
        return {success:false , error: errorMessage(error)}
    }
}

export const setBusColor = (parameter: string[]): localStorageResponse=>{
    try{
        const stringedBusColor: structureGetStringSizeReturnInterface = getStringSize(parameter);
        if(stringedBusColor.mb > busColorLimit) throw new Error(`Bus Colors are of size ${stringedBusColor.mb}mb exciding the limit of ${busColorLimit}mb`);

        localStorage.setItem(localStorageItems.busColors, stringedBusColor.stringified)
        return {success:true}
    }catch(error){
        return {success:false , error: errorMessage(error)}
    }
}