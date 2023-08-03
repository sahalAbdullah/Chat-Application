import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usersData = async (): Promise<{id: string; name: string}[]> => {
  // const usersCollection: any = await firestore().collection('users');
  // console.log(
  //   'Users Data: ',
  //   usersCollection._firestore._config.nativeModuleName,
  // );
  // console.log('Users Data: ', usersCollection._config);
  const dataArray: {id: string; name: string}[] = [];
  await firestore()
    .collection('users')
    .get()
    .then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        // console.log(
        //   'User ID: ',
        //   documentSnapshot.id,
        //   documentSnapshot.data().name,
        // );
        dataArray.push({
          id: documentSnapshot.id,
          name: documentSnapshot.data().name,
        });
      });
    });
  return dataArray;
};
