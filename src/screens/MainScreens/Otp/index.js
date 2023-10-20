import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import SyncStorage from 'sync-storage';

import { ApiRequest } from '../../../apiFriend';
import endUrls from '../../../apiFriend/EndUrls'
import jwt_decode from "jwt-decode";

// import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPInputView from './OTPHandler';
import navigationStrings from '../../../assets/Theme/navigationStrings';
<OTPInputView pinCount={6} />;

const OtpScreen = props => {
  const [notes, setNotes] = useState(SyncStorage.get('_laundry_notes_') ? SyncStorage.get('_laundry_notes_') : '');
  const [scheduleTime, setScheduleTime] = useState(SyncStorage.get('_laundry_scheduled_time_') ? SyncStorage.get('_laundry_scheduled_time_') : {});
  const [payment_method, setPaymentMethod] = useState(SyncStorage.get('_laundry_payment_method_') ? SyncStorage.get('_laundry_payment_method_') : 'CASH');

  const InitialData = {
    ContactName: '',
    ContactNumber: '',
    MakeDefault: true,
    OpenOnSunday: true,
    OpenOnSaturday: true,
    Type: '',
    Apartment: '',
    FlatNo: '',
    Street: '',
    CityName: '',
    City: '',
    StateName: '',
    State: '',
    PostalCode: '',
  }
  const [contactAddress, setContactAddress] = useState(SyncStorage.get('_laundry_address_') ? SyncStorage.get('_laundry_address_') : InitialData);
  
  let verifyOTP = (code) => {
    // alert("Your OTP is "+otp);
    // console.log(endUrls.login + SyncStorage.get('_laundry_auth_token_'), { 'Phone': SyncStorage.get('_laundry_phone_user_'), 'Otp': '0000' })
    ApiRequest(endUrls.login + SyncStorage.get('_laundry_auth_token_'), 'POST', {}, { 'Phone': SyncStorage.get('_laundry_phone_user_'), 'Otp': '0000' }).then(response => {
      // console.log('response', response);
      // console.log('_laundry_auth_user_', jwt_decode(response.data)['_id']);
      if(response?.status)
        SyncStorage.set('_laundry_auth_user_', jwt_decode(response.data)['_id']);
      // console.log(`Code is ${code}, you are good to go!`);

      let contactAddressTemp = {
        'Address': {
          'ContactName': contactAddress.ContactName,
          'ContactNumber': contactAddress.ContactNumber,
          'MakeDefault': contactAddress.MakeDefault,
          'OpenOnSunday': contactAddress.OpenOnSunday,
          'OpenOnSaturday': contactAddress.OpenOnSaturday,
          'Type': contactAddress.Type,
          'Apartment': contactAddress.Apartment,
          'FlatNo': contactAddress.FlatNo,
          'Street': contactAddress.Street,
          'City': contactAddress.City,
          'State': contactAddress.State,
          'PostalCode': contactAddress.PostalCode,
          'PickUpDetail': {
            'Time': scheduleTime.SelectedTime.text + ' ' + scheduleTime.meridium,
            'Date': scheduleTime.SelectedDate.date
          }
        },
        'OrderItems': [],
        'OrderTotalCost': 0,
        'OrderStatus': "Pending",
        'ExpectedDeliveryTime': new Date().toISOString(),
        'AssignedTo': jwt_decode(response.data)['_id'],
        'DeliveryStatus': 0,
        'PaymentStatus': "Pending",
        'PaymentMethod': payment_method,
        'AdditionalNotes': notes
      };
      let saveAddressURL = endUrls.saveAddress + jwt_decode(response.data)['_id'];
      let saveOrderURL = endUrls.saveOrder + jwt_decode(response.data)['_id'];
      // console.log(endUrls.saveAddress+SyncStorage.get('_laundry_auth_token_'), endUrls.saveOrder+SyncStorage.get('_laundry_auth_token_'), contactAddress);
      // console.log(saveAddressURL, contactAddress);
      if(response?.status)
        ApiRequest(saveAddressURL, 'POST', {}, { 'Addresses': contactAddress }).then(response => {
          // console.log('response1 ', response);
          // console.log(saveOrderURL, contactAddressTemp);
          if(response?.status)
            ApiRequest(saveOrderURL, 'POST', {}, contactAddressTemp).then(response => {
                // console.log('response2', response);
                // setTimeout(() => {
                if(response?.status)
                  props.navigation.navigate(navigationStrings.THANKYOU);
                // }, 10000)
              })
            })
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
      {/* <OTPInputView
        style={{width: '95%', height: 200}}
        pinCount={6}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}

        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(endUrls.login+SyncStorage.get('_laundry_auth_token_'), {'Phone': SyncStorage.get('_laundry_phone_user_'), 'Otp': '0000'})

          ApiRequest(endUrls.login+SyncStorage.get('_laundry_auth_token_'), 'POST', {}, {'Phone': SyncStorage.get('_laundry_phone_user_'), 'Otp': '0000'}).then(response => {
            console.log('response', response);
            console.log('_laundry_auth_user_', jwt_decode(response.data)['_id']);
            SyncStorage.set('_laundry_auth_user_', jwt_decode(response.data)['_id']);
            console.log(`Code is ${code}, you are good to go!`);
            props.navigation.navigate(navigationStrings.THANKYOU);
          })
        }}
      /> */}
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
