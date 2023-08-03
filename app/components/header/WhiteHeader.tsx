import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, HStack, Pressable} from 'native-base';
import LogoutSvg from '../../assets/svg/LogoutSvg';
import {
  heightToDp,
  widthToDp,
  responsiveFontSize,
} from '../../utils/responsive';
import {Colors} from '../../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../helpers/screenConstant';
import auth from '@react-native-firebase/auth';

interface IProps {
  name: string;
}
const WhiteHeader = (props: IProps) => {
  const navigation = useNavigation<any>();

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    await auth().signOut();
    navigation.replace(Screens.login);
  };
  return (
    <HStack style={styles.container}>
      <Text style={styles.highlight}>Welcome, {props.name}</Text>
      <Pressable onPress={logoutHandler}>
        {({isPressed}) => (
          <View style={{opacity: isPressed ? 0.45 : 1}}>
            <LogoutSvg width={8} height={8} />
          </View>
        )}
      </Pressable>
    </HStack>
  );
};

export default WhiteHeader;

const styles = StyleSheet.create({
  container: {
    width: widthToDp(100),
    height: heightToDp(8),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 1,
  },
  highlight: {
    fontWeight: '700',
    fontSize: responsiveFontSize(16),
  },
});
