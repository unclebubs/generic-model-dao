import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAiuAThnP-qauNHxBNzrfXo-TIajSD9u9k',
  authDomain: 'virtualtour-e847f.firebaseapp.com',
  databaseURL: 'https://virtualtour-e847f.firebaseio.com',
  projectId: 'virtualtour-e847f',
  storageBucket: 'virtualtour-e847f.appspot.com',
  messagingSenderId: '247354117228',
  appId: '1:247354117228:web:a794bd53cc0d96cd91dc49',
}

const localhostConfig = {
  // Point to the RTDB emulator running on localhost.
  // In almost all cases the ns (namespace) is your project ID.
  databaseURL: 'http://localhost:9000?ns=virtualtour-e847f',
  apiKey: 'AIzaSyAiuAThnP-qauNHxBNzrfXo-TIajSD9u9k',
  authDomain: 'virtualtour-e847f.firebaseapp.com',
  projectId: 'virtualtour-e847f',
  storageBucket: 'virtualtour-e847f.appspot.com',
  messagingSenderId: '247354117228',
  appId: '1:247354117228:web:a794bd53cc0d96cd91dc49',
  measurementId: 'G-YH0KLYTK4J',
}
const fbase = !firebase.apps.length ? firebase.initializeApp(window.location.hostname === 'localhost' ? localhostConfig : config) : firebase.app()
firebase.auth().setPersistence(process.env.NODE_ENV === 'test' 
  ? firebase.auth.Auth.Persistence.NONE : firebase.auth.Auth.Persistence.SESSION)
export default fbase
