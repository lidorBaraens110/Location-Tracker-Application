import {GeoOptions} from 'react-native-geolocation-service';

export const GEOLOCATION_CONFIG: GeoOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};
