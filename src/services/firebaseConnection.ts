import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCQWp50fuIVuutwnDb9m9eCRsXMHuPZICY",
    authDomain: "consig-api.firebaseapp.com",
    projectId: "consig-api",
    storageBucket: "consig-api.appspot.com",
    messagingSenderId: "599193848362",
    appId: "1:599193848362:web:956edfb1e33a44b83f5153",
    measurementId: "G-SXDDYKHVNQ"
};

if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);

}

export default firebase;

