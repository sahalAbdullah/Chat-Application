import {StyleSheet} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'native-base';
import {heightToDp, widthToDp} from '../../utils/responsive';
import {Colors} from '../../utils/color';

const AppLoader = () => {
  return (
    <View style={styles.loader}>
      <AnimatedLottieView
        style={{
          height: heightToDp(45),
          width: widthToDp(55),
        }}
        source={require('../../assets/json/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    borderColor: 'black',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    height: heightToDp(100),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: widthToDp(100),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});

export default AppLoader;
