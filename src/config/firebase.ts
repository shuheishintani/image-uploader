import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCkHWK9suodblDkj3hG0aTYOv_dV7ZoAmk',
  authDomain: 'image-uploader-4c363.firebaseapp.com',
  databaseURL: 'https://image-uploader-4c363.firebaseio.com',
  projectId: 'image-uploader-4c363',
  storageBucket: 'image-uploader-4c363.appspot.com',
  messagingSenderId: '1020465263722',
  appId: '1:1020465263722:web:5a2620d4e9f306649a0613',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const storage = firebase.storage();
export const db = firebase.firestore();
