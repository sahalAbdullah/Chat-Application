import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usersData = async () => {
  const usersCollection: any = await firestore().collection('users');
  console.log(
    'Users Data: ',
    usersCollection._firestore._config.nativeModuleName,
  );
  console.log('Users Data: ', usersCollection._config);
};
