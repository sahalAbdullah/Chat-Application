import React, {useState, useEffect} from 'react';
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
let data: {id: string; name: string}[] = [];
let uid: string = '';
const Home = () => {
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
        uid = value;
      }
    } catch (e) {
      Alert.alert('Cannot get Data Please SignIn Again');
      navigation.replace(Screens.login);
    }
    data = await usersData();
    console.log('Data', data);
    setName(name);
    setLoading(false);
  };
  return (
    <Layout>
      {name ? (
        <View>
          <WhiteHeader name={name} />
          <View>
            <FlatList
              width={widthToDp(100)}
              height={heightToDp(40)}
              data={data}
              renderItem={({item}) => (
                <Pressable>
                  {({isPressed}) => (
                    <View>
                      {item.id === uid ? null : (
                        <View
                          py={3}
                          bg={Colors.white}
                          mb={0.9}
                          justifyContent={'center'}
                          opacity={isPressed ? 0.55 : 1}>
                          <Text
                            style={{
                              color: Colors.textBlack,
                              fontSize: responsiveFontSize(15),
                              fontWeight: 'bold',
                              paddingLeft: 10,
                              paddingTop: 10,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      ) : null}
      {loading && <AppLoader />}
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  sectionContainer: {
    // paddingHorizontal: 24,
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
