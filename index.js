import { registerRootComponent } from 'expo'
import App from './src/App'
registerRootComponent(App)



import { initializeApp } from 'firebase/app'
import firebaseConfig from './src/keys/firebase'
initializeApp(firebaseConfig)
