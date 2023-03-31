import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDsu8AEKxngoi-w6UCgqn4jIfnCGZSU19w",
	authDomain: "spendmatepro.firebaseapp.com",
	projectId: "spendmatepro",
	storageBucket: "spendmatepro.appspot.com",
	messagingSenderId: "998136951162",
	appId: "1:998136951162:web:60858b224d3779e56a26c3",
};

//initialization firebase
firebase.initializeApp(firebaseConfig);

//initialization services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp };
