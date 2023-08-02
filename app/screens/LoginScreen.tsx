import React, {useState} from 'react';
import {StyleSheet, ImageBackground, Alert} from 'react-native';
import {Text, View, VStack, HStack, Pressable} from 'native-base';
import Layout from '../components/Layout';
import {widthToDp, heightToDp, responsiveFontSize} from '../utils/responsive';
import {Colors} from '../utils/color';
import {useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import FacebookLogoSvg from '../assets/svg/FacebookLogoSvg';
import GoogleLogoSvg from '../assets/svg/GoogleLogoSvg';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../helpers/screenConstant';
import AppLoader from '../components/Loader/AppLoader';
import {onGoogleButtonPress, signInAuth, fbLogin} from '../services/auth/auth';

interface IFormInput {
  Email: string;
  Password: string;
}

const LoginScreen = () => {
  const email_REGAX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; //Email validation
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>();

  const onSignIn = async (data: IFormInput) => {
    console.log('Credentials: ', data);
    setLoading(true);
    const screenHandler = await signInAuth(data.Email, data.Password);
    setLoading(false);
    if (screenHandler) {
      navigation.replace(Screens.home);
    } else {
      Alert.alert('That email address is invalid!');
    }
  };
  const signupHandler = () => {
    navigation.replace(Screens.signUp);
  };
  const googleHandler = async () => {
    setLoading(true);
    const screenHandler = await onGoogleButtonPress();
    setLoading(false);
    navigation.replace(Screens.home);
    if (screenHandler) {
      navigation.replace(Screens.home);
    } else {
      Alert.alert('Authentication Failed, Please Try Again');
    }
  };
  const facebookHandler = async () => {
    setLoading(true);
    const screenHandler = await fbLogin();
    setLoading(false);
    if (screenHandler) {
      navigation.replace(Screens.home);
    } else {
      Alert.alert('Authentication Failed, Please Try Again');
    }
  };
  return (
    <Layout>
      <ImageBackground
        source={require('../assets/images/SignInBackground.png')}
        style={{
          width: widthToDp(100),
          height: heightToDp(100),
        }}>
        <View mt={140} mx={6}>
          <Text style={styles.textDefault}>Sign In Here 👏</Text>
          <Text
            style={{
              lineHeight: 20,
              paddingTop: 8,
              color: Colors.gray600,
              fontSize: responsiveFontSize(10),
            }}>
            Sign In for Chat with Peopel around you
          </Text>
          <VStack mt={90} style={{width: widthToDp(100)}}>
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
            <View>
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
              <HStack
                width={widthToDp(90)}
                alignItems={'center'}
                justifyContent={'center'}
                pt={3}>
                <Pressable pr={3} onPress={facebookHandler}>
                  {({isPressed}) => (
                    <View opacity={isPressed ? 0.65 : 1}>
                      <FacebookLogoSvg width={8} height={8} />
                    </View>
                  )}
                </Pressable>
                <Pressable pl={3} onPress={googleHandler}>
                  {({isPressed}) => (
                    <View opacity={isPressed ? 0.65 : 1}>
                      <GoogleLogoSvg width={8} height={8} />
                    </View>
                  )}
                </Pressable>
              </HStack>
              <Pressable
                onPress={() => signupHandler()}
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
                      Sign Up Here
                    </Text>
                  </View>
                )}
              </Pressable>
              <CustomButton
                onPress={handleSubmit(onSignIn)}
                title={'Log in'}
                marginTop={100}
                type={'Primary'}
                width={90}
              />
            </View>
          </VStack>
        </View>
      </ImageBackground>
      {loading && <AppLoader />}
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textDefault: {
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    paddingTop: 5,
  },
});
