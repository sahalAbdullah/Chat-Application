import {Pressable, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import {responsiveFontSize, widthToDp, heightToDp} from '../utils/responsive';
import {Colors} from '../utils/color';
interface IProps {
  onPress: Function;
  title: string;
  marginTop: number;
  type: 'Primary' | 'Secondary';
  width: number;
}
const CustomButton = (props: IProps) => {
  const {type} = props;
  return (
    <Pressable
      onPress={() => props.onPress()}
      marginTop={props.marginTop}
      width={widthToDp(props.width)}>
      {({isPressed}) => {
        return (
          <View
            style={[
              styles.btn,
              type === 'Primary' ? styles.btnPrimary : styles.btnsecondary,
              {opacity: isPressed ? 0.65 : 1},
            ]}>
            <Text
              style={[
                styles.title,
                type === 'Primary'
                  ? styles.titlePrimary
                  : styles.titleSecondary,
              ]}>
              {props.title}
            </Text>
          </View>
        );
      }}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
  },
  btnsecondary: {
    backgroundColor: Colors.secondary,
  },
  title: {
    fontWeight: '700',
    fontSize: responsiveFontSize(16),
  },
  titlePrimary: {
    color: Colors.white,
  },
  titleSecondary: {
    // color: Light.primary500,
  },
});
export default CustomButton;
