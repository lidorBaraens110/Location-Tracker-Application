import RNFS from 'react-native-fs';
import Gelocation from 'react-native-geolocation-service';
import { LOCATION_PATH } from '../config/filePath';
import {ILocationData, IUpdateLocation} from '../interface';

export const mureadFile = async():Promise<ILocationData[]> => {
 return await RNFS.readFile(LOCATION_PATH, 'utf8')
    .then(contents => {
      const data = JSON.parse(contents);
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(`Error reading file: ${error}`);
    });
};

export const muclearFile = () => {
  RNFS.writeFile(LOCATION_PATH, JSON.stringify([]), 'utf8')
    .then(() => {
      console.log('File cleared successfully');
    })
    .catch(error => {
      console.log(`Error clearing file: ${error}`);
    });
};

export const muwriteFile = ({position, isLocked}: IUpdateLocation) => {
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
};
