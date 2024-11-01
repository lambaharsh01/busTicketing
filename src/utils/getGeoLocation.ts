import { defaultCordinates } from "../constants/config";
import { coordinatesInterface } from "../constants/interfaces";

const fetchCoordinates = (): Promise<coordinatesInterface> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        latitude: defaultCordinates.latitude,
        longitude: defaultCordinates.longitude,
        error: "Geolocation is not supported by this browser.",
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude, error: null });
        },
        (error: GeolocationPositionError) => {
          // error.code is always 1
          if(error?.message?.includes("User denied")){
            alert("Please enable location access to make the most of the app's features.")
          }
          resolve({
            latitude: defaultCordinates.latitude,
            longitude: defaultCordinates.longitude,
            error: `Geolocation error (${error.code}): ${error.message}`,
          });
        }
      );
    }
  });
};

export default fetchCoordinates;
