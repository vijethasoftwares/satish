import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Sidemenubar from '../Component/SideMeduBar';
import Landing from '../screens/MainScreens/Landing';
import navigationStrings from '../assets/Theme/navigationStrings';
import PriceList from '../screens/MainScreens/Price';
import MyAddress from '../screens/MainScreens/Address/myAddress';
import AddAddress from '../screens/MainScreens/Address';
import AddAdditionalNote from '../screens/MainScreens/AdditionalNote';
import AddTime from '../screens/MainScreens/Time';
import AddCoupon from '../screens/MainScreens/Coupon';
import Profile from '../screens/MainScreens/profile';
import OrderStatus from '../screens/MainScreens/Order/order_status';
// import AddAdditionalNote from '../screens/MainScreens/AdditionalNote';
import otp from '../screens/MainScreens/Otp';
import Otp from '../screens/MainScreens/Otp';
import OtpScreen from '../screens/MainScreens/Otp';
import OtpScreenLanding from '../screens/MainScreens/Otp/landingotp';
import Thankyou from '../screens/MainScreens/Thankyou';
const Drawer = createDrawerNavigator();

const MyDrawer = () => (
  <Drawer.Navigator
    initialRouteName="MainStackNavigator"
    backBehavior="initialRoute"
    screenOptions={{
      swipeEnabled: false,
      headerShown: false,
    }}
    drawerStyle={{width: '40%'}}
    drawerPosition="rights"
    drawerContent={props => <Sidemenubar {...props} />}>
    <Drawer.Screen name={navigationStrings.LANDING} component={Landing} />
    <Drawer.Screen name={navigationStrings.PRICELIST} component={PriceList} />
    <Drawer.Screen name={navigationStrings.MYADDRESS} component={MyAddress} />
    <Drawer.Screen name={navigationStrings.ADDADDRESS} component={AddAddress} />
    <Drawer.Screen name={navigationStrings.ADDADDITIONALNOTE} component={AddAdditionalNote} />
    <Drawer.Screen name={navigationStrings.ADDTIME} component={AddTime} />
    <Drawer.Screen name={navigationStrings.ADDCOUPON} component={AddCoupon} />
    <Drawer.Screen name={navigationStrings.OTPSCREEN} component={OtpScreen} />
    <Drawer.Screen name={navigationStrings.OTPSCREENLANDING} component={OtpScreenLanding} />
    <Drawer.Screen name={navigationStrings.ORDERSTATUS} component={OrderStatus} />
    <Drawer.Screen name={navigationStrings.THANKYOU} component={Thankyou} />
    <Drawer.Screen name={navigationStrings.PROFILE} component={Profile} />


  </Drawer.Navigator>
);
export default MyDrawer;
