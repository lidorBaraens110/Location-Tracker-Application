import Geolocation from 'react-native-geolocation-service';
import RNFS from 'react-native-fs';
import {ILocationData, IUpdateLocation} from '../interface';
import {GEOLOCATION_CONFIG} from '../config/geolocation.config';
import { LOCATION_PATH } from '../config/filePath';



export const updateLocation = ({ position, isLocked}: IUpdateLocation) => {
  RNFS.readFile(LOCATION_PATH, 'utf8')
    .then(contents => {
      if (contents.length !== 0) {
        const data: ILocationData[] = JSON.parse(contents);
        data.push({
          currentLocation: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
          date: new Date(position.timestamp).toString(),
          isLocked: isLocked || false,
        });
        console.log(position);
        RNFS.writeFile(LOCATION_PATH, JSON.stringify(data), 'utf8')
          .then(() => {
            console.log('File written successfully');
          })
          .catch(error => {
            console.log(`Error writing file: ${error}`);
          });
      } else {
        const x = [];
        x.push({
          currentLocation: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
          date: new Date(position.timestamp).toString(),
          isLocked: isLocked,
        });
        RNFS.writeFile(LOCATION_PATH, JSON.stringify(x), 'utf8')
          .then(() => {
            console.log('File written successfully');
          })
          .catch(error => {
            console.log(`Error writing file: ${error}`);
          });
      }
    })
    .catch(error => {
      console.log(`Error reading file: ${error}`);
    });
};

export const mugetCurrentPosition = () => {
  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    GEOLOCATION_CONFIG,
  );
};
