import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/pages/HomePage';
import DataPage from './src/pages/DataPage';





const Stack = createNativeStackNavigator();
const App = () => {
  return (
     <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Data" component={DataPage} />
    </Stack.Navigator>
  </NavigationContainer>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Track Location</Text>
    //   <Button title="get current position" onPress={mugetCurrentPosition} />
    //   {/* <Button title={isTracking?"stop tracking":"start tracking"} onPress={handleTrack} /> */}
    //   <Button onPress={() => mureadFile(path)} title="readFile" />
    //   <Button onPress={() => muclearFile(path)} title="clearFile" />
    //   <Button onPress={checkAndroidPlatform} title="checkAndroidPlatform" />
    //   <TraclerLocation path={path} />

    // </View>
  );
};




export default App;
