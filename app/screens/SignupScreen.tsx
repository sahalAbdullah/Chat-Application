import React, {useState} from 'react';
import {StyleSheet, ImageBackground, Alert} from 'react-native';
import {Text, View, VStack, Pressable} from 'native-base';
import Layout from '../components/Layout';
import {widthToDp, heightToDp, responsiveFontSize} from '../utils/responsive';
import {Colors} from '../utils/color';
import {useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../helpers/screenConstant';
import {signUpAuth} from '../services/auth/auth';
import AppLoader from '../components/Loader/AppLoader';

interface IFormInput {
  Email: string;
  Password: string;
  Name: string;
}
const SignupScreen = () => {
  const email_REGAX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; //Email validation
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>();

  const onSignUp = async (data: IFormInput) => {
    console.log('Credentials: ', data);
    setLoading(true);
    const screenHandler = await signUpAuth(
      data.Email,
      data.Password,
      data.Name,
    );
    setLoading(false);
    if (screenHandler) {
      navigation.replace(Screens.login);
    } else {
      Alert.alert('That email address is already in use!');
    }
  };

  const signInHandler = () => {
    navigation.replace(Screens.login);
  };
  return (
    <Layout>
      <ImageBackground
        source={require('../assets/images/SignInBackground.png')}
        style={{
          width: widthToDp(100),
          height: heightToDp(100),
        }}>
        <View mt={20} mx={6}>
          <Text style={styles.textDefault}>Sign Up Here 😊</Text>
          <VStack mt={70} style={{width: widthToDp(100)}}>
            <Text
              style={{
                fontSize: responsiveFontSize(16),
                lineHeight: 24,
              }}>
              Full Name
            </Text>
            <View>
              <CustomInput
                secureTextEntry={false}
                placeHolder={'Full Name'}
                height={60}
                width={90}
                mt={3}
                control={control}
                name={'Name'}
                rules={{
                  required: 'Name is Required',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: responsiveFontSize(16),
                lineHeight: 24,
              }}>
              Email Address
            </Text>
            <View>
              <CustomInput
                secureTextEntry={false}
                placeHolder={'Email Address'}
                height={60}
                width={90}
                mt={3}
                control={control}
                name={'Email'}
                rules={{
                  required: 'Email is requiured',
                  pattern: {
                    value: email_REGAX,
                    message: 'Email is invalid',
                  },
                }}
              />
            </View>
            <Text mt={3} style={{fontSize: responsiveFontSize(16)}}>
              Password
            </Text>
            <CustomInput
              secureTextEntry={true}
              placeHolder={'Password'}
              height={60}
              width={90}
              mt={3}
              control={control}
              name={'Password'}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should be of minimum 8 characters',
                },
              }}
            />
          </VStack>
          <Pressable
            onPress={() => signInHandler()}
            width={widthToDp(90)}
            justifyContent={'center'}
            alignItems={'center'}
            pt={3}>
            {({isPressed}) => (
              <View opacity={isPressed ? 0.65 : 1}>
                <Text
                  style={{
                    color: Colors.gray600,
                    fontWeight: '400',
                    fontSize: responsiveFontSize(14),
                  }}
                  underline>
                  Sign In Here
                </Text>
              </View>
            )}
          </Pressable>
          <CustomButton
            onPress={handleSubmit(onSignUp)}
            title={'Sign Up'}
            marginTop={140}
            type={'Primary'}
            width={90}
          />
        </View>
      </ImageBackground>
      {loading && <AppLoader />}
    </Layout>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  textDefault: {
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    paddingTop: 8,
  },
});
