import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import splash from '../screens/AuthScreens/splash';
import navigationStrings from '../assets/Theme/navigationStrings';
import Location from '../screens/MainScreens/Location';
import OnBoarding from '../screens/AuthScreens/onBoarding';
import myAddress from '../screens/MainScreens/Address/myAddress';
import MyDrawer from './DrawerStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={navigationStrings.SPLASH} component={splash} />
      <Stack.Screen
        name={navigationStrings.ONBOARDING}
        component={OnBoarding}
      />
      <Stack.Screen name={navigationStrings.LOCATION} component={Location} />
      <Stack.Screen name={'MyDrawer'} component={MyDrawer} />
    </Stack.Navigator>
  );
};
export default AuthStack;
