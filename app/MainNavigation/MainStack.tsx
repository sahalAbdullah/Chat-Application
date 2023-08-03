import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../helpers/screenConstant';
import Home from '../screens/Home';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.login}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.home} component={Home} />
      <Stack.Screen name={Screens.login} component={LoginScreen} />
      <Stack.Screen name={Screens.signUp} component={SignupScreen} />
      <Stack.Screen name={Screens.chat} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
