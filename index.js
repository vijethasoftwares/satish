/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';
import Otp from './src/screens/MainScreens/Otp/index.js';
import thankyou from './src/screens/MainScreens/Thankyou/index.js';
import Thankyou from './src/screens/MainScreens/Thankyou/index.js';
AppRegistry.registerComponent(appName, () => App);
