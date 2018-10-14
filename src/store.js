import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
//Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyDExHhbGQmrdO9BXOUsKToZT3-D7y6KbgY",
  authDomain: "react-c1de9.firebaseapp.com",
  databaseURL: "https://react-c1de9.firebaseio.com",
  projectId: "react-c1de9",
  storageBucket: "react-c1de9.appspot.com",
  messagingSenderId: "297828310837"
};
// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true
};

// Init firbase instant
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
