import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBla0LZzY7ZLX2hcOAiaafi_UDns65xLfg",
    authDomain: "keiko-note-azimuth.firebaseapp.com",
    databaseURL: "https://keiko-note-azimuth.firebaseio.com",
    projectId: "keiko-note-azimuth"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
