import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, View, Text} from 'native-base';
import {Controller} from 'react-hook-form';
import {responsiveFontSize, widthToDp} from '../utils/responsive';
interface IProps {
  secureTextEntry: boolean | undefined;
  placeHolder: string;
  height: number;
  width: number;
  mt: number;
  secure?: boolean;
  control: any;
  name: string;
  rules: any;
}
//{ control, name, rules, placeholder, secureTextEntry, defaultValue }
//Custom input text fields to get data from the user and to validate the data by using the controller
const CustomInput = (props: IProps) => {
  // here defaultValue is optional
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[styles.container, {borderColor: error ? 'red' : '#fff'}]}>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={props.placeHolder}
              defaultValue={value}
              style={styles.input}
              mt={props.mt}
              width={widthToDp(props.width)}
              height={props.height}
              secureTextEntry={props.secureTextEntry || false}
              borderRadius={10}
            />
          </View>

          <Text style={styles.errorMessage}>
            {!!error ? error.message || 'Error' : null}
          </Text>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // width: '100%',
    // borderColor: '#e8e8e8',
    // borderWidth: 1,
    // borderRadius: 5,
    // paddingHorizontal: 10,
    // marginVertical: 5,
  },
  input: {
    fontSize: responsiveFontSize(16),
    borderWidth: 0,
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'stretch',

    marginTop: 1,
    fontSize: responsiveFontSize(12),
  },
});

export default CustomInput;
