import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {View, Text, HStack, VStack, FlatList, Pressable} from 'native-base';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import Layout from '../components/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../components/Loader/AppLoader';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../helpers/screenConstant';
import {cloudStorageData} from '../services/auth/auth';
import {widthToDp, heightToDp, responsiveFontSize} from '../utils/responsive';
import WhiteHeader from '../components/header/WhiteHeader';
import {usersData} from '../services/auth/CloudUsersData';
import {Colors} from '../utils/color';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = (props: any) => {
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  const onSend = (messageArray: any) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messageArray),
    );
  };

  console.log('Props: ', props.route.params);
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
