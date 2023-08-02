import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {View, Text, HStack, VStack} from 'native-base';
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

const Home = () => {
  // const uid: string | undefined = AsyncStorage.getItem('userId');
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<any>();
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  const getData = async () => {
    let name: string = '';
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        name = await cloudStorageData(value);
      }
    } catch (e) {
      Alert.alert('Cannot get Data Please SignIn Again');
      navigation.replace(Screens.login);
    }
    setName(name);
    setLoading(false);
  };
  return (
    <Layout>
      {name ? <WhiteHeader name={name} /> : null}
      <HStack style={styles.sectionContainer}></HStack>
      {loading && <AppLoader />}
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    padding: 2,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    fontSize: responsiveFontSize(16),
  },
});
