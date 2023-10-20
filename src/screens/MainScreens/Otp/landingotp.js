import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import SyncStorage from 'sync-storage';

import {ApiRequest} from '../../../apiFriend';
import endUrls from '../../../apiFriend/EndUrls'
import jwt_decode from "jwt-decode";

// import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPInputView from './OTPHandler'
import navigationStrings from '../../../assets/Theme/navigationStrings';
{/* <OTPInputView pinCount={6} />; */}

const OtpScreen = props => {
  const verifyOTP = (code) => {
    // console.log(endUrls.login+SyncStorage.get('_laundry_auth_token_'), {'Phone': SyncStorage.get('_laundry_phone_user_'), 'Otp': '0000'})

    ApiRequest(endUrls.login+SyncStorage.get('_laundry_auth_token_'), 'POST', {}, {'Phone': SyncStorage.get('_laundry_phone_user_'), 'Otp': '0000'}).then(response => {
      // console.log('response', response);
      // console.log('_laundry_auth_user_', jwt_decode(response.data)['_id']);
      SyncStorage.set('_laundry_auth_user_', jwt_decode(response.data)['_id']);
      // console.log(`Code is ${code}, you are good to go!`);
      props.navigation.navigate(navigationStrings.LANDING);
    })
  }

  return (
    <View>
      <View style={styles.vryView}>
        <Text style={styles.vryTxt}>Verify your number</Text>
      </View>

      <View style={styles.codeView}>
        <Text style={styles.codeTxt}>Enter verification code</Text>
        <Text style={styles.scndTxt}>We have sent a verification code to</Text>
        <Text style={styles.noTxt}>+{SyncStorage.get('_laundry_phone_user_')}</Text>
      </View>
      <View style={styles.mainView}></View>
      <OTPInputView verifyOTP={(otp) => verifyOTP(otp)}></OTPInputView>
      <View style={styles.resendView}>
        <Text style={styles.resendTxt}>Didn’t receive the code?</Text>
        <TouchableOpacity>
          <Text style={styles.btnTxt} onPress={() => navigationStrings}>
            Resend now
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastView}>
        <Text style={styles.troubleTxt}>Having trouble logging in?</Text>
        <TouchableOpacity>
          <Text style={styles.btnTxt}>Get help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
    borderWidth: 1,
    padding: 5,
    borderWidth: 1,
  },

  underlineStyleBase: {
    color: 'black',
    width: 46,
    height: 52,
    borderWidth: 0,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
    padding: 5,
  },
  //  our css
  vryView: {
    marginTop: 10,
  },
  mainView: {
    marginTop: 50,
    height: 0,
  },
  vryTxt: {
    fontFamily: 'Poppins-Medium',
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  codeView: {
    marginTop: 50,
    alignSelf: 'center',
  },
  codeTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  scndTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    margin: 5,
  },
  noTxt: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  resendView: {
    marginTop: 100,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  resendTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    fontWeight: '500',
    color: 'grey',
  },
  troubleTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
  },
  btnTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    fontWeight: '500',
    color: '#61C589',
    marginLeft: 5,
  },
  lastView: {
    marginTop: 150,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
