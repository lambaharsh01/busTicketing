import { defaultCordinates } from "../constants/config";

interface Coordinates {
  latitude: number;
  longitude: number;
  error: string | null;
}

const fetchCoordinates = (): Promise<Coordinates> => {
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

// // Usage example
// fetchCoordinates()
//   .then((coords) => {
//     console.log("Latitude:", coords.latitude);
//     console.log("Longitude:", coords.longitude);
//   })
//   .catch((error) => {
//     console.error("Error fetching location:", error.message);
//   });

export default fetchCoordinates;
