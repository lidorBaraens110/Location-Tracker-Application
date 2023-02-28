import {useEffect, useRef, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import RNFS from 'react-native-fs';
import {AppState} from 'react-native';
import {
  getBackgroundPermissions,
  getLocationPermissions,
} from '../services/deviceService';
import BackgroundTimer from 'react-native-background-timer';
import {updateLocation} from '../services/locationService';
import {muwriteFile} from '../services/fileService';
import {GEOLOCATION_CONFIG} from '../config/geolocation.config';
import { LOCATION_PATH } from '../config/filePath';

interface IHookResponse {
  isTracking: boolean;
  handleTrack: () => void;
}




const useTrackLocationData = (): IHookResponse => {
  let isLocked = useRef(false);

  const handleAppStateChange = (nextAppState: string) => {
    console.log(nextAppState);
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      // The device is locked
      isLocked.current = true;
    } else if (nextAppState === 'active') {
      // The device is unlocked
      isLocked.current = false;
    }
  };
  const [intervalId, setIntervalId] = useState<number>();
  const [isTracking, setIsTracking] = useState<boolean>(true);

  useEffect(() => {
    const appSubs = AppState.addEventListener('change', handleAppStateChange);
    Geolocation.requestAuthorization('always');

    const checkPermissionsAndStart = async () => {
      const res2 = await getLocationPermissions();
      const res = await getBackgroundPermissions();
      console.log('res', res, 'res2', res2);
      if (res && res2) {
        startTracking();
      }
    };
    checkPermissionsAndStart();
    return () => {
      BackgroundTimer.stop();
      if (intervalId) {
        BackgroundTimer.clearInterval(intervalId);
      }
      appSubs.remove();
    };
  }, []);

  const startTracking = () => {
    const intervalId = BackgroundTimer.setInterval(() => {
      setIsTracking(true);
      Geolocation.getCurrentPosition(
        async position => {
          const isExist = await RNFS.exists(LOCATION_PATH);
          const locked = isLocked.current;
          if (isExist) {
            updateLocation({ position, isLocked: locked});
          } else {
            muwriteFile({ position, isLocked: locked});
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        GEOLOCATION_CONFIG,
      );
    }, 5000);
    setIntervalId(intervalId);
  };

  const handleTrack = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };
  const stopTracking = () => {
    BackgroundTimer.stop();
    if (intervalId) {
      BackgroundTimer.clearInterval(intervalId);
    }
    setIsTracking(false);
  };

  return {handleTrack, isTracking};
};

export default useTrackLocationData;

// RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
//   interval:5000,
//   fastInterval:5000,
// }).then(()=>{
// }).catch(err=>console.log(err))
