import { GeoPosition } from "react-native-geolocation-service";

export interface ILocationData {
    currentLocation: {
      longitude: number;
      latitude: number;
    };
    date: string;
    isLocked: boolean;
  }

  export interface IUpdateLocation{
    position: GeoPosition,isLocked:boolean
}