import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface LocationData {
  location: string;
}


const fetchCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
              format: 'json',
              lat: latitude,
              lon: longitude,
            },
          });

          const city =
            res.data?.address?.state ||
            res.data?.address?.city ||
            res.data?.address?.town ||
            'Your Location';

          resolve({ location: city });
        } catch (err) {
          reject(new Error('Unable to fetch location info'));
        }
      },
      (err) => {
        reject(new Error('Permission denied'));
      }
    );
  });
};



export const useFetchCurrentLocation = () => {
  return useMutation<LocationData, Error>({
    mutationFn: fetchCurrentLocation,
  });
};
