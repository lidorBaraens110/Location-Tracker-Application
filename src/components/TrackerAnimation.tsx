import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Touchable, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native';
import useTrackLocationData from '../hooks/useTrackLocationdata';
import useDeviceLockState from '../hooks/useDeviceLockState';


const TrackerLocation = (): JSX.Element => {
  const {handleTrack, isTracking} = useTrackLocationData();
  const isLocked = useDeviceLockState();

  return (
    <View style={[style.container, style.center]}>
      {!isLocked &&
        isTracking &&
        [...Array(3).keys()].map(index => {
          return (
            <View
              key={index}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
              }}>
              <Animatable.View
                style={[style.mainContainer, style.center]}
                iterationCount="infinite"
                duration={2400}
                delay={index * 400}
                animation={bounceOut}
                iterationDelay={0}
              />
            </View>
          );
        })}
      <TouchableOpacity
        onPress={handleTrack}
        style={[
          style.innerContainer,
          style.center,
          style.purple,
        ]}></TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
  },
  mainContainer: {
    backgroundColor: '#6e01ef',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  purple: {
    backgroundColor: '#6e01ef',
  },
});
const bounceOut = {
  from: {
    width: 60,
    height: 60,
    borderRadius: 60,
    opacity: 0.8,
  },
  to: {
    width: 200,
    height: 200,
    borderRadius: 200,
    opacity: 0,
  },
};

export default TrackerLocation;
