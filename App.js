import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';
import Home from './screens/Home';

var firebaseConfig = {
  apiKey: 'AIzaSyBvTNSTkqHkZkIlTGrLlEwN8EKGn-LbFks',
  authDomain: 'fir-auth-eaf53.firebaseapp.com',
  databaseURL: 'https://fir-auth-eaf53.firebaseio.com',
  projectId: 'fir-auth-eaf53',
  storageBucket: '',
  messagingSenderId: '230021197075',
  appId: '1:230021197075:web:dd495ab9b335a62e'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const navigator = createSwitchNavigator(
  {
    Welcome: Welcome,
    SignIn: SignIn,
    SignUp: SignUp,
    Home: Home
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff'
    },
    initialRouteName: 'Welcome'
  }
);

const App = createAppContainer(navigator);
export default App;
