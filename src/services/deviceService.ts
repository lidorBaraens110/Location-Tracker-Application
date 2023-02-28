import {PermissionsAndroid, Text, View} from 'react-native';
import {Linking, Platform} from 'react-native';

const openSettings = () => {
  if (Platform.OS === 'android') {
    Linking.openSettings();
  }
};
export const getBackgroundPermissions = async () => {
  const backgroundgranted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    {
      title: 'Background Location Permission',
      message:
        'We need access to your location ' +
        'so you can get live quality updates.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  console.log(backgroundgranted);
  if (backgroundgranted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    // Display an error message or prompt the user to manually enable the permission
    // openSettings();
    return backgroundgranted
  }
  if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
    //do your thing!
  }

  return false;
};
export const getLocationPermissions = async () => {
  const backgroundgranted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message:
        'We need access to your location ' +
        'so you can get live quality updates.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  console.log(backgroundgranted);
  if (backgroundgranted === PermissionsAndroid.RESULTS.DENIED) {
    const neverAskAgain = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (neverAskAgain) {
      // Display an error message or prompt the user to manually enable the permission
      openSettings();
    }
    return false;
  }
  return true;
};

export const checkAndroidPlatform=()=>{
  const isAndroid11OrHigher =
  Platform.OS === 'android' && Platform.Version >= 30;
if (isAndroid11OrHigher) {
  console.log('higher 11')
  // Device is using Android 11 or higher
} else {
  console.log('loswer 11')
  // Device is using an Android version lower than 11
}
}