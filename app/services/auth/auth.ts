import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInAuth = async (
  email: string,
  password: string,
): Promise<boolean> => {
  let authHandler: boolean = false;

  await auth()
    .signInWithEmailAndPassword(email, password)
    .then((res: any) => {
      //   console.log('User account created & signed in!', res.user.uid);
      AsyncStorage.setItem('userId', res.user.uid);
      authHandler = true;
    })
    .catch((error: any) => {
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
      authHandler = false;
    });
  return authHandler;
};

export const signUpAuth = async (
  email: string,
  password: string,
  name: string,
): Promise<boolean> => {
  let authHandler: boolean = false;
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res: any) => {
      //   console.log('User account created & signed in!', res.user.uid);
      CloudAddUser(name, res.user.uid);
      authHandler = true;
    })
    .catch((error: any) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      console.error(error);
      authHandler = false;
    });

  return authHandler;
};
export const CloudAddUser = (name: string, uid: string) => {
  firestore()
    .collection('users')
    .doc(uid)
    .set({
      name: name,
    })
    .then(() => {
      console.log('User added!');
    });
};
export const fbLogin = async (): Promise<boolean> => {
  let authHandler: boolean = false;
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  if (result.isCancelled) {
    // throw 'User cancelled the login process';
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  console.log(data);
  // Sign-in the user with the credential
  await auth()
    .signInWithCredential(facebookCredential)
    .then((res: any) => {
      console.log(res);
      CloudAddUser(res.user.displayName, res.user.uid);
      AsyncStorage.setItem('userId', res.user.uid);
      authHandler = true;
    })
    .catch((error: any) => {
      authHandler = false;
    });

  return authHandler;
};

export const onGoogleButtonPress = async (): Promise<boolean> => {
  let authHandler: boolean = false;
  GoogleSignin.configure({
    webClientId:
      '579804409078-sqi714otfok898kfk1ttlns4csmqoke3.apps.googleusercontent.com',
  });
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  // Get the users ID token
  const idToken = await GoogleSignin.signIn();
  //   console.log(idToken);

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken.idToken);
  // Sign-in the user with the credential
  await auth()
    .signInWithCredential(googleCredential)
    .then((res: any) => {
      //   console.log(res.user.uid);
      CloudAddUser(idToken?.user?.name!, res.user.uid);
      AsyncStorage.setItem('userId', res.user.uid);
      authHandler = true;
    })
    .catch((error: any) => {
      authHandler = false;
    });

  return authHandler;
};

export const cloudStorageData = async (uid: string): Promise<string> => {
  const usersCollection: any = await firestore()
    .collection('users')
    .doc(uid)
    .get();
  //   console.log(usersCollection._data.name);
  return usersCollection._data.name;
};
