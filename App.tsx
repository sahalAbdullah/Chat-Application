import React, {useState, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './app/MainNavigation/MainStack';

function App(): JSX.Element {
  const pressHandler = async () => {
    // const usersCollection: any = await firestore()
    //   .collection('users')
    //   .doc('g0JOofdzP8ShcU2vsjGy')
    //   .get();
    // console.log(usersCollection._data.user);
    // setName(usersCollection._data.user);
    firestore()
      .collection('users')
      .doc('regenrated1')
      .set({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
