import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SyncStorage from 'sync-storage';
import { ApiRequest } from '../../../apiFriend';
import endUrls from '../../../apiFriend/EndUrls';
import BackHeader from '../../../Component/BackHeader';
import Colors from '../../../assets/Theme/Colors';
import CustomsButtons from '../../../Component/CustomsButtons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Responsive from '../../../assets/Theme/Responsive';
import navigationStrings from '../../../assets/Theme/navigationStrings';
import icons from '../../../assets/icons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
const MyAddress = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [userData, setUserData] = useState({});
  const [payment_method, setPaymentMethod] = useState(SyncStorage.get('_laundry_payment_method_') ? SyncStorage.get('_laundry_payment_method_') : 'CASH');
  const [isReload, setIsReload] = useState(false);
  let [notes, setNotes] = useState(SyncStorage.get('_laundry_notes_') ? SyncStorage.get('_laundry_notes_') : '');
  let [coupon, setCoupon] = useState(SyncStorage.get('_laundry_coupon_') ? SyncStorage.get('_laundry_coupon_') : '');
  let [scheduleTime, setScheduleTime] = useState(SyncStorage.get('_laundry_scheduled_time_') ? SyncStorage.get('_laundry_scheduled_time_') : {});
  let Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  // let contactAddress = SyncStorage.get('_laundry_address_') ? SyncStorage.get('_laundry_address_') : InitialData;
  let [contactAddress, setContactAddress] = useState(SyncStorage.get('_laundry_address_') ? SyncStorage.get('_laundry_address_') : InitialData);

  const [tabChange, setTabChange] = useState(0);

  useEffect(() => {

    if (SyncStorage.get('_laundry_auth_user_')) {
      // console.log(endUrls.FetchAddress + SyncStorage.get('_laundry_auth_user_'))
      ApiRequest(endUrls.FetchAddress + SyncStorage.get('_laundry_auth_user_'), 'GET', {}, {}).then(response => {
        if (response?.status) {
          // console.log("Addresses1 : ", response.data.Addresses)
          setUserData(response.data.Addresses)
        }
        // console.log("response 1 ", response);
        // if (response?.status) {
        //   SyncStorage.set('_laundry_auth_token_', response?.data?.token)
        //   SyncStorage.set('_laundry_phone_user_', mobileNumber)
        //   setIsReload(true);
        //   props.navigation.navigate(navigationStrings.OTPSCREEN);
        // } else {
        //   alert(response?.message)
        // }
      })
    }
  }, [])


  let ReloadData = () => {
    setCoupon(SyncStorage.get('_laundry_coupon_') ? SyncStorage.get('_laundry_coupon_') : '')
    setScheduleTime(SyncStorage.get('_laundry_scheduled_time_') ? SyncStorage.get('_laundry_scheduled_time_') : {})
    setContactAddress(SyncStorage.get('_laundry_address_') ? SyncStorage.get('_laundry_address_') : InitialData)
    setNotes(SyncStorage.get('_laundry_notes_') ? SyncStorage.get('_laundry_notes_') : '')
    setIsReload(false);
    console.log('_laundry_scheduled_time_', SyncStorage.get('_laundry_scheduled_time_'))
  }

  let handleAsSoonAsPossible = () => {
    let data = {
      "SelectedDate":
      {
        "date": "Thu Oct 19 2023 17:45:43 GMT+0530",
        "days": "Wednesday",
        "status": 2
      },
      "SelectedTime":
      {
        "end_time": "09:30",
        "id": 1,
        "start_time": "08:30",
        "text": "8:30 - 9:30"
      },
      "meridium": "PM"
    }
    SyncStorage.set('_laundry_scheduled_time_', data)
    ReloadData();
  }



  let handleLogin = () => {
    // console.log(endUrls)
    // if(payment_method == '') {

    // } else if(!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate) {
    //   alert("")
    // } else if(!contactSyncStorage.get('_laundry_address_')?.ContactName) {

    // } else 
    if (SyncStorage.get('_laundry_auth_user_')) {
      // props.navigation.navigate(navigationStrings.THANKYOU);

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
        'AssignedTo': SyncStorage.get('_laundry_auth_user_'),
        'DeliveryStatus': 0,
        'PaymentStatus': "Pending",
        'PaymentMethod': payment_method,
        'AdditionalNotes': notes
      };
      let saveAddressURL = endUrls.saveAddress + SyncStorage.get('_laundry_auth_user_');
      let saveOrderURL = endUrls.saveOrder + SyncStorage.get('_laundry_auth_user_');
      // console.log(endUrls.saveAddress+SyncStorage.get('_laundry_auth_token_'), endUrls.saveOrder+SyncStorage.get('_laundry_auth_token_'), contactAddress);
      console.log(saveAddressURL, contactAddress);
      ApiRequest(saveAddressURL, 'POST', {}, { 'Addresses': contactAddress }).then(response => {
        console.log('response1 ', response);
        // console.log(saveOrderURL, contactAddressTemp);
        ApiRequest(saveOrderURL, 'POST', {}, contactAddressTemp).then(response => {
          console.log('response2', response);
          // setTimeout(() => {
          props.navigation.navigate(navigationStrings.THANKYOU);
          // }, 10000)
        })
      })
    } else {
      ApiRequest(endUrls.otp, 'POST', {}, { 'Phone': mobileNumber }).then(response => {
        console.log(response);
        if (response?.status) {
          SyncStorage.set('_laundry_auth_token_', response?.data?.token)
          SyncStorage.set('_laundry_phone_user_', mobileNumber)
          setIsReload(true);
          props.navigation.navigate(navigationStrings.OTPSCREEN);
        } else {
          alert(response?.message)
        }
      })
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surfaceBlack }}>
      <BackHeader title={'Schedule Pickup'} />
      <ScrollView style={{ flex: 1 }}>
        {!isReload ? '' :
          <Pressable onPress={ReloadData}>
            <View style={{}}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginVertical: 10, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#ffffff' }}>Reload</Text>
              </View>
            </View>
          </Pressable>
        }
        <View style={{ height: 10 }} />
        <View
          style={{
            flex: 0.8,
            width: '95%',
            alignSelf: 'center',
          }}>
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            backgroundColor: Colors.white
          }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: Colors.black,
                  fontSize: Responsive.convertFontScale(17),
                  fontWeight: '500',
                }}>
                Address
              </Text>

              <FontAwesome5 name="edit" color={Colors.black} size={15} onPress={() => { setIsReload(true); props.navigation.navigate(navigationStrings.ADDADDRESS) }} />
            </View>
            {/* <Text>1{(SyncStorage.get('_laundry_auth_user_'))}{JSON.stringify(userData)}{((SyncStorage.get('_laundry_auth_user_')) && userData && userData.length > 0)}</Text> */}

            {((SyncStorage.get('_laundry_auth_user_')) && userData && userData.length > 0) ?
              userData.map((val, index) => {
                return (
                  <>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontFamily: 'Poppins-Regular' }}>{val?.ContactName ? val?.ContactName : ''}</Text>
                      {val?.MakeDefault ? 
                      <View style={{ backgroundColor: '#EEF7FE', paddingVertical: 3, paddingHorizontal: 10 }}>
                        <Text style={{ color: '#3BA2F4', fontFamily: 'Poppins-Regular' }}>{val?.MakeDefault ? val?.MakeDefault : ''}</Text>
                      </View>
                      : ''}
                    </View>
                    {/* <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 30,
                        color: Colors.black,
                        fontWeight: '500',
                        fontSize: Responsive.convertFontScale(14),
                      }}>
                      {val?.ContactName ? val?.ContactName : ''}
                    </Text> */}
                    <View style={{ flexDirection: 'row' }}>
                      <FontAwesome5 name="phone-alt" style={{ lineHeight: 30 }} color={Colors.black} size={10} />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Light',
                          lineHeight: 30,
                          color: Colors.black,
                          fontWeight: '400',
                          fontSize: Responsive.convertFontScale(14),
                        }}>
                        {val?.ContactNumber ? val?.ContactNumber : ''}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <FontAwesome5 name="map-pin" style={{ lineHeight: 30 }} color={Colors.black} size={15} />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Light',
                          lineHeight: 30,
                          color: Colors.black,
                          fontWeight: '300',
                          fontSize: Responsive.convertFontScale(14),
                        }}>


                        {val?.Apartment ? val?.Apartment + ', ' : ''}
                        {val?.FlatNo ? val?.FlatNo + ', ' : ''}
                        {val?.Street ? val?.Street + ', ' : ''}
                        {val?.CityName ? val?.CityName + ', ' : ''}
                        {val?.StateName ? val?.StateName + ', ' : ''}
                        {val?.PostalCode ? val?.PostalCode + ', ' : ''}
                      </Text>
                    </View>
                  </>
                )
              })
              :
              contactAddress?.ContactName ?
                <>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>{contactAddress?.ContactName ? contactAddress?.ContactName : ''}</Text>
                    {contactAddress?.MakeDefault ? 
                    <View style={{ backgroundColor: '#EEF7FE', paddingVertical: 3, paddingHorizontal: 10 }}>
                      <Text style={{ color: '#3BA2F4', fontFamily: 'Poppins-Regular' }}>{contactAddress?.MakeDefault ? 'DEFAULT' : ''}</Text>
                    </View>
                    : ''}
                  </View>
                  {/* <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 30,
                    color: Colors.black,
                    fontWeight: '500',
                    fontSize: Responsive.convertFontScale(14),
                  }}>
                  {contactAddress?.ContactName ? contactAddress.ContactName : ''}
                </Text> */}
                  <View style={{ flexDirection: 'row' }}>
                    <FontAwesome5 name="phone-alt" style={{ lineHeight: 30 }} color={Colors.black} size={10} />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Light',
                        lineHeight: 30,
                        color: Colors.black,
                        fontWeight: '400',
                        fontSize: Responsive.convertFontScale(14),
                      }}>
                      &nbsp; &nbsp;{contactAddress?.ContactNumber ? contactAddress.ContactNumber : ''}
                      {/* Lorem Ipsum (Lorem Ipsum, Dubai) {JSON.stringify(SyncStorage.get('_laundry_address_'))} */}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <FontAwesome5 name="map-pin" style={{ lineHeight: 30 }} color={Colors.black} size={15} />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Light',
                        lineHeight: 30,
                        color: Colors.black,
                        fontWeight: '300',
                        fontSize: Responsive.convertFontScale(14),
                      }}> &nbsp; &nbsp;
                      {contactAddress?.Apartment ? contactAddress?.Apartment + ', ' : ''}
                      {contactAddress?.FlatNo ? contactAddress?.FlatNo + ', ' : ''}
                      {contactAddress?.Street ? contactAddress?.Street + ', ' : ''}
                      {contactAddress?.CityName ? contactAddress?.CityName + ', ' : ''}
                      {contactAddress?.StateName ? contactAddress?.StateName + ', ' : ''}
                      {contactAddress?.PostalCode ? contactAddress?.PostalCode + ', ' : ''}
                      {/* Lorem Ipsum (Lorem Ipsum, Dubai) {JSON.stringify(SyncStorage.get('_laundry_address_'))} */}
                    </Text>
                  </View>
                </>
                : ''
            }
          </View>
          <View style={{ height: 10 }} />
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            backgroundColor: Colors.white
          }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: 'Poppins-Medium',
                  fontSize: Responsive.convertFontScale(17),
                  fontWeight: '500',
                }}>
                Time
              </Text>

              <FontAwesome5 name="edit" color={Colors.black} size={15} onPress={() => { setIsReload(true); props.navigation.navigate(navigationStrings.ADDTIME) }} />

            </View>
            {SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ?
              <>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    lineHeight: 30,
                    color: Colors.black,
                    fontWeight: '300',
                    fontSize: Responsive.convertFontScale(14),
                  }}>
                  {!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ? '' : SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate.days},  {!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ? '' : Months[new Date(SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate.date)?.toISOString().split('T')[0].split('-')[1] - 1]} {!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ? '' : new Date(SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate.date).toISOString().split('T')[0].split('-')[2]}, {!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ? '' : new Date(SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate.date).toISOString().split('T')[0].split('-')[0]} | {!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ? '' : SyncStorage.get('_laundry_scheduled_time_')?.SelectedTime?.text}  {!SyncStorage.get('_laundry_scheduled_time_')?.SelectedDate ? '' : SyncStorage.get('_laundry_scheduled_time_')?.meridium}
                </Text>
              </>
              : ''}
                <Pressable onPress={handleAsSoonAsPossible}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.green,
                      width: '45%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // paddingHorizontal: 5,
                      borderRadius: 10,
                      height: 30,
                      // marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        color: Colors.green,
                        fontSize: Responsive.convertFontScale(12),
                        fontWeight: '400',
                      }}>
                      As soon as possible
                    </Text>
                  </View>
                </Pressable>
          </View>
          <View style={{ height: 10 }} />
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            backgroundColor: Colors.white
          }}>
            <View>
              <View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: Colors.black,
                      fontSize: Responsive.convertFontScale(17),
                      fontWeight: '500',
                    }}>
                    Apply Coupon/offers
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Light',
                        color: Colors.green,
                        fontSize: Responsive.convertFontScale(13),
                        fontWeight: '400',
                        marginRight: 10,
                      }} onPress={() => { setIsReload(true); props.navigation.navigate(navigationStrings.ADDCOUPON) }}>
                      All Coupons
                    </Text>
                    <FontAwesome5
                      name="angle-right"
                      color={Colors.green}
                      size={25}
                      onPress={() => { setIsReload(true); props.navigation.navigate(navigationStrings.ADDCOUPON) }}
                    />
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      color: Colors.sky_blue,
                      fontSize: Responsive.convertFontScale(14),
                      fontWeight: '700',
                      marginRight: 10,
                    }}>
                    {coupon ? 'Applied Coupon : ' + coupon : ''}
                  </Text>
                </View>
              </View>
              {SyncStorage.get('_laundry_auth_user_') ? '' :
                <Text
                  onPress={() => { setIsReload(true); setVisible(true) }}
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: Colors.green,
                    fontSize: Responsive.convertFontScale(13),
                    fontWeight: '400',
                    marginVertical: 7,
                  }}>
                  Login{' '}
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      color: Colors.black,
                      fontSize: Responsive.convertFontScale(13),
                      fontWeight: '400',
                      marginRight: 10,
                    }}>
                    to see best coupons for you
                  </Text>
                </Text>
              }
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            backgroundColor: Colors.white
          }}>
            <View style={{}}>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: 'Poppins-Medium',
                  fontSize: Responsive.convertFontScale(17),
                  fontWeight: '500',
                }}>
                Payment Method
              </Text>
            </View>
            <View style={{ height: 10 }} />
            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 2,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Pressable onPress={() => { setIsReload(true); setPaymentMethod('CASH'); SyncStorage.set('_laundry_payment_method_', 'CASH'); }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 20 / 2,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: Colors.grey,
                  }}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 10 / 2,
                      backgroundColor: (payment_method == 'CASH') ? Colors.green : Colors.grey,
                    }}
                  />
                </View>
              </Pressable>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 10,
                  color: Colors.black,
                  fontSize: Responsive.convertFontScale(14),
                  fontWeight: '400',
                }}>
                Cash
              </Text>
            </View>
            <View style={{ height: 10 }} />
            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 2,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Pressable onPress={() => { setIsReload(true); setPaymentMethod('WALLET'); SyncStorage.set('_laundry_payment_method_', 'WALLET'); }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 20 / 2,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: Colors.grey,
                  }}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 10 / 2,
                      backgroundColor: (payment_method == 'WALLET') ? Colors.green : Colors.grey,
                    }}
                  />
                </View>
              </Pressable>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 10,
                  color: Colors.black,
                  fontSize: Responsive.convertFontScale(14),
                  fontWeight: '400',
                }}>
                Wallet
              </Text>
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            backgroundColor: Colors.white
          }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: Colors.black,
                  fontSize: Responsive.convertFontScale(17),
                  fontWeight: '500',
                }}>
                Additional note
              </Text>

              <FontAwesome5 name="edit" color={Colors.black} size={15} onPress={() => { setIsReload(true); props.navigation.navigate(navigationStrings.ADDADDITIONALNOTE) }} />
            </View>
            <View style={{ height: 10 }} />
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: Colors.black,
                  fontSize: Responsive.convertFontScale(14),
                  fontWeight: '300',
                }}>
                {notes}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: Colors.white, flex: 0.2 }}>
        <CustomsButtons
          title={'Confirm Pickup'}
          onPressButton={() => {
            // setModalVisible(true);
            setIsReload(true);
            if (payment_method == '') {
              alert("Payment Method is required.")
            } else if (!SyncStorage.get('_laundry_scheduled_time_')) {
              alert("Pickup Time is required.")
            } else if (!SyncStorage.get('_laundry_address_')) {
              alert("Address is required.")
            } else if (!SyncStorage.get('_laundry_auth_user_')) {
              setIsReload(true);
              setVisible(true)
            } else {
              // props.navigation.navigate(navigationStrings.THANKYOU);
              handleLogin();
            }
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.Footer}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                width: '90%',
                alignSelf: 'center',
              }}>
              <Pressable
                onPress={() => setTabChange(0)}
                style={{
                  borderWidth: 1.5,
                  borderColor: Colors.green,
                  paddingHorizontal: 13,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: tabChange == 0 ? Colors.green : Colors.white,
                }}>
                <Text
                  style={{
                    color: tabChange == 0 ? Colors.white : Colors.green,
                    fontWeight: '600',
                    fontSize: Responsive.convertFontScale(12),
                  }}>
                  {'AM'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTabChange(1)}
                style={{
                  borderWidth: 1.5,
                  borderColor: Colors.green,
                  paddingHorizontal: 13,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: tabChange == 1 ? Colors.green : Colors.white,
                }}>
                <Text
                  style={{
                    color: tabChange == 1 ? Colors.white : Colors.green,
                    fontWeight: '600',
                    fontSize: Responsive.convertFontScale(12),
                  }}>
                  {'PM'}
                </Text>
              </Pressable>
            </View>

            <CustomsButtons
              onPressButton={() => {
                setModalVisible(false);
                setTimeout(() => {
                  // props.navigation.navigate(navigationStrings.LOCATION);
                }, 1000);
              }}
              title={'Save'}
              mainStyle={{
                width: '90%',
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisible(!visible);
        }}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView style={{ width: '100%' }} behavior="position" enabled>
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

export default MyAddress;

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
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
  Image: {
    marginLeft: '20%',
    height: Responsive.heightPercentageToDP('30%'),
    width: Responsive.widthPercentageToDP('60%'),
  },
  txt: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: Responsive.convertFontScale(25),
    paddingTop: 20,
    color: Colors.fontblack,
  },
  scnd_txt: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: Responsive.convertFontScale(17),
    color: Colors.fontblack,
  },
  scnd_txt: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: Responsive.convertFontScale(17),
    color: Colors.fontblack,
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
  }
});
