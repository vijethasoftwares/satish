import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  SafeAreaView,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import SyncStorage from 'sync-storage';

import { ApiRequest } from '../apiFriend';
import endUrls from '../apiFriend/EndUrls';
import CustomsButtons from './CustomsButtons';
import icons from '../assets/icons';
import Icons from '../assets/icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Colors from '../assets/Theme/Colors';
import Responsive from '../assets/Theme/Responsive';
import navigationStrings from '../assets/Theme/navigationStrings';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Sidemenubar = props => {
  const [visible, setVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');




  let ReloadData = () => {
    setCoupon(SyncStorage.get('_laundry_coupon_') ? SyncStorage.get('_laundry_coupon_') : '')
    setScheduleTime(SyncStorage.get('_laundry_scheduled_time_') ? SyncStorage.get('_laundry_scheduled_time_') : {})
    setContactAddress(SyncStorage.get('_laundry_address_') ? SyncStorage.get('_laundry_address_') : InitialData)
    setNotes(SyncStorage.get('_laundry_notes_') ? SyncStorage.get('_laundry_notes_') : '')
    setIsReload(false);
  }



  let handleLogin = () => {
    // console.log(endUrls)
    // if(payment_method == '') {

    // } else if(!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate) {
    //   alert("")
    // } else if(!contactSyncStorage.get('_laundry_address_')?.ContactName) {

    // } else 
    if (SyncStorage.get('_laundry_auth_user_')) {
      props.navigation.navigate(navigationStrings.LANDING);
    } else {
      ApiRequest(endUrls.otp, 'POST', {}, { 'Phone': mobileNumber }).then(response => {
        if (response?.status) {
          SyncStorage.set('_laundry_auth_token_', response?.data?.token)
          SyncStorage.set('_laundry_phone_user_', mobileNumber)
          props.navigation.navigate(navigationStrings.OTPSCREENLANDING);
        } else {
          alert(response?.message)
        }
      })
    }
  }
  const _logout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            SyncStorage.remove('_laundry_auth_user_')
            SyncStorage.remove('_laundry_auth_token_')
            SyncStorage.remove('_laundry_phone_user_')
            SyncStorage.remove('_laundry_coupon_')
            SyncStorage.remove('_laundry_scheduled_time_')
            SyncStorage.remove('_laundry_address_')
            SyncStorage.remove('_laundry_notes_')
            props.navigation.closeDrawer();
          },
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.maiview}>

          {/* {SyncStorage.get('_laundry_auth_user_') ? */}
          <>
            <View style={styles.mainview1}>
              <View style={styles.firstimg}>
                <Pressable
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}
                  style={styles.imageview}>
                  <FontAwesome5 style={{ fontSize: 30, color: '#FFB63E' }} name='user-circle' />
                </Pressable>
                <Pressable
                  onPress={() => {
                    SyncStorage.get('_laundry_auth_user_') ? props.navigation.navigate('Profile') : setVisible(!visible);
                  }}
                  style={styles.salerview}>
                  <Text style={styles.salertext}>Welcomes, {SyncStorage.get('_laundry_auth_user_') ? SyncStorage.get('_laundry_address_')?.ContactName : 'Guest'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 5,
                    }}>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}
                  style={styles.imageview}>
                  <FontAwesome5 style={{ fontSize: 25, color: '#3C4F6F' }} name='edit' />
                </Pressable>
              </View>
            </View>

            <View style={styles.myWallet}>

              <View style={styles.myWalletView}>
                <Text
                  onPress={() => props.navigation.navigate('Profile')}
                  style={styles.mywalletTxt}>
                  My Wallet Balance
                </Text>
                <Text style={styles.scdwalletTxt}>| AED 20</Text>
              </View>
            </View>
          </>
          {/* : ''} */}

          <View style={styles.Myprofiletextview}>
            <View style={styles.sideMainView}>
              <Text
                onPress={() => props.navigation.navigate('OrderStatus')}
                style={styles.sideTxt}>
                Order Status
              </Text>
            </View>
          </View>

          <View style={styles.Myprofiletextview}>

            <View style={styles.sideMainView}>
              <Text
                onPress={() => props.navigation.navigate('CoupenCodeList')}
                style={styles.sideTxt}>
                Scan Coupons
              </Text>
            </View>
          </View>

          <View style={styles.Myprofiletextview}>
            <View style={styles.sideMainView}>
              <Text
                onPress={() => props.navigation.navigate('Ledger')}
                style={styles.sideTxt}>
                View Prizes
              </Text>
            </View>
          </View>

          <View style={styles.Myprofiletextview}>
            <View style={styles.sideMainView}>
              <Text
                onPress={() => props.navigation.navigate('UserManagementList')}
                style={styles.sideTxt}>
                Contact Us
              </Text>
            </View>
          </View>
          <View style={styles.Myprofiletextview}>
            <View style={styles.sideMainView}>
              <Text
                onPress={() => props.navigation.navigate('UserManagement')}
                style={styles.sideTxt}>
                Terms & Conditions
              </Text>
            </View>
          </View>
          {SyncStorage.get('_laundry_auth_user_') ?
            <View style={styles.Mylogoutview}>
              <View style={styles.sideMainView}>
                <Text onPress={() => _logout()} style={styles.sideTxt}>
                  Logout
                </Text>
              </View>
            </View>
            : ''}
        </View>
      </ScrollView>


      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView style={{width: '100%'}} behavior="position" enabled>
            <View style={styles.Footer}>
              <View style={{
                flexDirection: 'row', display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>

                <View style={{
                  flexDirection: 'row', display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Image style={styles.cleanImg} source={icons.Clean} />
                  <View style={{
                    flexDirection: 'column'
                  }}>
                    <Text style={{
                      fontFamily: 'Poppins-Medium',
                      marginLeft: -20,
                      color: Colors.black,
                      fontSize: Responsive.convertFontScale(20),
                    }}>Hi Laundry</Text>
                    <Text style={{
                      fontFamily: 'Poppins-Light',
                      marginLeft: -20,
                      color: Colors.black,
                      fontSize: Responsive.convertFontScale(12),
                    }}>Laundry made easy!</Text>
                  </View>
                </View>
                <FontAwesome5 onPress={() => { setVisible(false) }} style={{ marginRight: 30 }} name="times" color={Colors.black} size={15} />
              </View>
              <ScrollView style={{ flex: 1 }}>
                <View>
                  <Image style={styles.winterImg} source={icons.Winter} />
                </View>
                <View>
                  <TextInput value={mobileNumber ? mobileNumber : ''} onChangeText={txt => setMobileNumber(txt)} style={styles.inputNum} keyboardType='numeric' placeholder='+91  |  Mobile number*' />
                </View>
                <View style={styles.cndView}>
                  <Text style={styles.cndTxt}>By continuing, I agree to the</Text>
                  <TouchableOpacity>
                    <Text style={styles.trmTxt}>Terms & conditions</Text>
                  </TouchableOpacity>
                </View>
                <CustomsButtons
                  onPressButton={() => {
                    setVisible(false); handleLogin();
                    // setTimeout(() => {

                    //   props.navigation.navigate(navigationStrings.OTPSCREEN);
                    // }, 1000);
                  }}
                  title={'Continue'}
                  mainStyle={{
                    width: '90%',
                    marginTop: 20
                  }}
                />
                <View style={styles.hlpView}>
                  <Text style={styles.cndTxt}>Having trouble logging in? </Text>
                  <TouchableOpacity>
                    <Text style={styles.trmTxt}>Get help</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Sidemenubar;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 21, 27, 0.33)',
  },

  Footer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: Responsive.heightPercentageToDP('55%'),
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    // paddingHorizontal: 20,
  },
  cleanImg: {
    width: 72,
    height: 70,
    margin: 20,
  },
  winterImg: {
    height: 134,
    width: '100'
  },

  cndView: {
    flexDirection: 'row',
    marginLeft: 20
  },
  cndTxt: {
    fontFamily: 'Poppins-Medium',
    color: Colors.fontblack,
    fontSize: 12
  },
  trmTxt: {
    fontFamily: 'Poppins-Medium',
    color: Colors.green,
    marginLeft: 3,
    fontSize: 12
  },
  hlpView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20
  },
  inputNum: {
    paddingLeft: 20,
    borderWidth: 1,
    margin: 20,
    borderRadius: 12,
    height: 42,
    fontSize: 14,
    borderColor: Colors.grey,
    color: Colors.grey,

  },

  maiview: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  mainview1: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    textAlign: 'center'
  },
  imageview: {
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  firstimg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
  },
  salerview: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  salertext: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '400',
    lineHeight: 25,
    paddingTop: 25,
    height: 70,
  },
  Folowertext: {
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  Myprofiletextview: {
    width: windowWidth / 1.5,
    height: windowHeight / 20,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.borColor,
    paddingRight: 60
  },
  myWallet: {
    width: windowWidth / 1.5,
    height: windowHeight / 11,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
  },
  sideMainView: {
    height: windowHeight / 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  myWalletView: {
    flexDirection: 'row',
    flex: 1,
    textAlign: 'center'
  },
  sideTxt: {
    width: windowWidth / 2.5,
    alignSelf: 'center',
    color: Colors.Textblack,
    fontSize: 16,
    paddingBottom: 8,
    fontWeight: '400'
  },
  mywalletTxt: {
    width: windowWidth / 2.5,
    alignSelf: 'center',
    color: Colors.fontblack,
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 20
  },
  scdwalletTxt: {
    paddingLeft: 25,
    width: windowWidth / 2.5,
    alignSelf: 'center',
    color: Colors.fontblack,
    fontSize: 16,
    fontWeight: '400',
  },
  Mylogoutview: {
    // marginTop: 400,
    width: windowWidth / 1.5,
    height: windowHeight / 20,
    alignSelf: 'center',
    borderBottomWidth: 1.2,
    borderTopWidth: 1.2,
    borderColor: Colors.borColor,
    paddingRight: 60
  },
});
