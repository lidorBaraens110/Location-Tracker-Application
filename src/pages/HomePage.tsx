import {AppState, Button, StyleSheet, View} from 'react-native';
import RNFS from 'react-native-fs';
import TraclerLocation from '../components/TrackerAnimation';
import 'react-native-gesture-handler';
import {muclearFile, mureadFile} from '../services/fileService';
import {checkAndroidPlatform} from '../services/deviceService';
import {mugetCurrentPosition} from '../services/locationService';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';


const HomePage = ({
  navigation,
}: NativeStackScreenProps<ParamListBase>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Location</Text>
      <Button title="get current position" onPress={mugetCurrentPosition} />
      <Button
        title="Go to Data"
        onPress={() => navigation.navigate('Data')}
      />

      {/* <Button title={isTracking?"stop tracking":"start tracking"} onPress={handleTrack} /> */}
      {/* <Button onPress={() => mureadFile(path)} title="readFile" /> */}
   
      <TraclerLocation  />
      
    </View>
  );
};


const styles=StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20 
  },
title:{
  fontSize:26,
  fontWeight:'bold',
}
})



export default HomePage;
