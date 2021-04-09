import * as firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDn0nDQkCrI2S-8uYwwKvBZ4vyCozh8Evw",
    authDomain: "signal-clone-f8601.firebaseapp.com",
    projectId: "signal-clone-f8601",
    storageBucket: "signal-clone-f8601.appspot.com",
    messagingSenderId: "1093688563878",
    appId: "1:1093688563878:web:74d52ab8f1cfbfe1ab3c67",
    measurementId: "G-6DLFJXSH43"
  };

  let app;
  if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  }
  else {
   app = firebase.app();
  }
  const db = app.firestore();
  const auth = firebase.auth();
  export { db, auth}
