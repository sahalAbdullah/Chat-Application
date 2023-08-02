import {View} from 'native-base';
import React, {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../utils/responsive';
interface IProps {
  children: ReactNode;
}
const Layout: FC<IProps> = props => {
  return (
    <SafeAreaView style={styles.fullScreenLight}>
      <View>{props.children}</View>
    </SafeAreaView>
  );
};
export default Layout;
const styles = StyleSheet.create({
  fullScreenLight: {
    // backgroundColor: Colors.lightBackground,
    width: widthToDp(100),
    height: heightToDp(100),
  },
});
