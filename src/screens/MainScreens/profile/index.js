import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SyncStorage from 'sync-storage';
import BackHeader from '../../../Component/BackHeader';
import Colors from '../../../assets/Theme/Colors';
import { MyTextInput } from '../../../Component/MyTextInput';
import Responsive from '../../../assets/Theme/Responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomsButtons from '../../../Component/CustomsButtons';
import navigationStrings from '../../../assets/Theme/navigationStrings';
import { cities } from '../../../assets/JSON/dummyData';
import { area } from '../../../assets/JSON/allAreas';
const Profile = props => {
  const [tabChange, setTabChange] = useState(0);
  const [region, handleRegion] = useState(false);
  const [areaVisibility, handleAreaVisibility] = useState(false);
  const [locationVisibility, setLocationVisibility] = useState(false);
  const [cityId, setCityId] = useState({});
  const [areaId, setAreaId] = useState({});
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(area?.city);
    setMasterDataSource(area?.city);
  }, []);

  let onPressLocation = () => {
    setLocationVisibility(!locationVisibility)
  }


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
  const [errorData, setErrorData] = useState({});
  const [errorStatus, setErrorStatus] = useState(0);
  let setAddressType = (index, item) => {
    setTabChange(index);
    setContactAddress({ ...contactAddress, ['Type']: item.name })
  }

  let isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  }

  let isText = (value) => {
    return /^[a-zA-Z ]*$/.test(value);
  }

  let isEmail = (value) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }

  let checkValidation = (name, value) => {
    let errorDataTemp = { name: name, status: 0, message: ' Invalid Data. ' };
    let errorstatus = 0;
    setErrorData({});
    // if (value == '') {
    //   setErrorData(errorDataTemp);
    //   errorstatus = 1;
    // } else 
    if (value != '' && name == 'ContactNumber' && !isNumeric(value)) {
      setErrorData(errorDataTemp);
      errorstatus = 1;
    } else if (value != '' && name == 'ContactName' && name != 'ContactNumber' && !isText(value)) {
      // console.log(value)
      setErrorData(errorDataTemp);
      errorstatus = 1;
    } else if (value != '' && name == 'Apartment' && name != 'ContactNumber' && !isText(value)) {
      // console.log(value)
      setErrorData(errorDataTemp);
      errorstatus = 1;
    } else if (value != '' && name == 'FlatNo' && name != 'ContactNumber' && !isText(value)) {
      // console.log(value)
      setErrorData(errorDataTemp);
      errorstatus = 1;
    } else if (value != '' && name == 'Street' && name != 'ContactNumber' && !isText(value)) {
      // console.log(value)
      setErrorData(errorDataTemp);
      errorstatus = 1;
    } else if (value != '' && name == 'email' && !isEmail(value)) {
      setErrorData(errorDataTemp);
      errorstatus = 1;
    } else { }
    console.log(name, value, name == 'ContactNumber', isText(value), errorstatus)
    return errorstatus;
  }

  let handleChange = (name, value) => {
    let errorstatus = checkValidation(name, value);
    // console.log(errorstatus)
    if (errorstatus) {
      // alert(errorData?.message ? errorData?.message : 'Invalid Data');
    } else {
      setContactAddress({ ...contactAddress, [name]: value })
    }
  }

  let handleChangeCheckbox = (name, value) => {
    setContactAddress({ ...contactAddress, [name]: value })
  }



  // const [tabChange, setTabChange] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surfaceBlack }}>
      <BackHeader title={'Profile'} />
      <View style={{ height: 10 }} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          backgroundColor: Colors.white,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: Colors.black,
            fontSize: Responsive.convertFontScale(17),
          }}>
          Contact details 
          {/* ( uid : {SyncStorage.get('_laundry_auth_user_')} ) */}
          {/* {JSON.stringify(contactAddress)} */}
        </Text>
        <View style={{ height: 10 }} />
        <MyTextInput
          onChangeText={(value) => handleChange('ContactName', value)}
          // value={contactAddress.ContactName}
          value={SyncStorage.get('_laundry_auth_user_')}
          InputStyle={{ paddingHorizontal: 10 }}
          placeholder={'Contact person name*'}
        />
        {errorData?.name == 'ContactName' ?
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="warning"
              size={12}
              color={'#f00'}
              style={{ marginTop: 4, marginLeft: 5 }}
            /><Text style={{ color: '#f00', fontFamily: 'Poppins-Regular' }}>{errorData.message}</Text>
          </View>
          : ''}
        <View style={{ height: 10 }} />
        <MyTextInput
          onChangeText={(value) => handleChange('ContactNumber', value)}
          value={contactAddress.ContactNumber}
          InputStyle={{ paddingHorizontal: 10 }}
          placeholder={'Contact no*'}
        />
        {errorData?.name == 'ContactNumber' ?
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="warning"
              size={12}
              color={'#f00'}
              style={{ marginTop: 4, marginLeft: 5 }}
            /><Text style={{ color: '#f00', fontFamily: 'Poppins-Regular' }}>{errorData.message}</Text>
          </View>
          : ''}
        <View style={{ height: 40 }} />
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: Colors.black,
            fontSize: Responsive.convertFontScale(17),
          }}>
          Address
        </Text>
        <View style={{ height: 10 }} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable onPress={() => handleRegion(!region)}>
            <View
              style={{
                height: 40,
                width: 160,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                borderColor: 'rgba(224, 229, 231, 1)',
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: Responsive.convertFontScale(15),
                  color: Colors.black,
                }}>
                {contactAddress.StateName ? contactAddress.StateName : cityId?.id ? cityId?.cityName : 'Choose Region'}
              </Text>
              <View
                style={{
                  height: 40,
                  width: 10,
                }}></View>
              <FontAwesome
                name="chevron-down"
                size={12}
                color={Colors.black}
                onPress={props.onPress}
              />
            </View>
          </Pressable>
          {cityId?.id ?
            <Pressable onPress={() => handleAreaVisibility(!areaVisibility)}>
              <View
                style={{
                  height: 40,
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  flexDirection: 'row',
                  borderColor: 'rgba(224, 229, 231, 1)',
                  backgroundColor: 'rgba(250, 250, 250, 1)',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: Responsive.convertFontScale(15),
                    color: Colors.black,
                  }}>
                  {contactAddress.CityName ? contactAddress.CityName : areaId?.id ? areaId?.areaName : 'Choose Area'}
                </Text>
                <View
                  style={{
                    height: 40,
                    width: 10,
                  }}></View>
                <FontAwesome
                  name="chevron-down"
                  size={12}
                  color={Colors.black}
                  onPress={props.onPress}
                />
              </View>
            </Pressable>
            : ''}
        </View>
        <View style={{ height: 10 }} />
        <MyTextInput
          onChangeText={(value) => handleChange('Apartment', value)}
          value={contactAddress.Apartment}
          InputStyle={{ paddingHorizontal: 10 }}
          placeholder={'Apartment number'}
        />

        {errorData?.name == 'Apartment' ?
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="warning"
              size={12}
              color={'#f00'}
              style={{ marginTop: 4, marginLeft: 5 }}
            /><Text style={{ color: '#f00', fontFamily: 'Poppins-Regular' }}>{errorData.message}</Text>
          </View>
          : ''}
        <View style={{ height: 10 }} />
        <MyTextInput
          onChangeText={(value) => handleChange('FlatNo', value)}
          value={contactAddress.FlatNo}
          InputStyle={{ paddingHorizontal: 10 }}
          placeholder={'Building name'}
        />
        {errorData?.name == 'FlatNo' ?
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="warning"
              size={12}
              color={'#f00'}
              style={{ marginTop: 4, marginLeft: 5 }}
            /><Text style={{ color: '#f00', fontFamily: 'Poppins-Regular' }}>{errorData.message}</Text>
          </View>
          : ''}
        <View style={{ height: 10 }} />
        <MyTextInput
          onChangeText={(value) => handleChange('Street', value)}
          value={contactAddress.Street}
          InputStyle={{ paddingHorizontal: 10 }}
          placeholder={'Notes (optional)'}
        />
        {errorData?.name == 'Street' ?
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="warning"
              size={12}
              color={'#f00'}
              style={{ marginTop: 4, marginLeft: 5 }}
            /><Text style={{ color: '#f00', fontFamily: 'Poppins-Regular' }}>{errorData.message}</Text>
          </View>
          : ''}
        <View style={{ height: 40 }} />
        <View style={{ backgroundColor: Colors.white }}>
          <CustomsButtons
            title={'Save'}
            onPressButton={() => {
              SyncStorage.set('_laundry_address_', contactAddress);
              props.navigation.navigate(navigationStrings.MYADDRESS);   // Save in Session Storage before Login
            }}
          />
          <View style={{ height: 10 }} />
        </View>
      </ScrollView>
      {region ?
        <>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: 10, position: 'absolute', width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ backgroundColor: '#ffffff', width: '90%', marginTop: '10%', height: '80%', marginRight: 'auto', marginLeft: 'auto', top: 30, zIndex: 9999 }}>

              <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                <FontAwesome
                  style={{ paddingHorizontal: 15 }}
                  name={'times'}
                  size={20}
                  color={Colors.black}
                  onPress={() => handleRegion(!region)}
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: Colors.black,
                    fontSize: Responsive.convertFontScale(17),
                  }}>
                  {/* {JSON.stringify(filteredDataSource)} */}
                </Text>
              </View>

              <ScrollView style={{ marginVertical: 10 }}>
                {/* <Text>{area}1
                  </Text> */}
                <FlatList
                  data={filteredDataSource}
                  extraData={filteredDataSource}
                  // horizontal
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => {
                    return <View style={{ width: 10 }} />;
                  }}
                  contentContainerStyle={{
                    paddingHorizontal: 12,
                    // height: '60%',
                  }}
                  renderItem={({ item }) => {
                    return (
                      <Pressable
                        onPress={() => { setCityId(item); handleChange('StateName', item?.cityName); handleChange('State', item?.id); handleRegion(!region); }}
                        style={styles.imgSet}>
                        <Image style={styles.abu_Dhabi} source={item.icon} />
                        <View style={{ height: 3 }} />
                        <Text style={styles.abuTxt}>{item?.cityName}</Text>
                      </Pressable>
                    );
                  }}
                />
              </ScrollView>
            </TouchableOpacity>
          </View>
        </>
        : ''
      }

      {areaVisibility ?
        <>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: 10, position: 'absolute', width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ backgroundColor: '#ffffff', width: '90%', marginTop: '10%', height: '80%', marginRight: 'auto', marginLeft: 'auto', top: 30, zIndex: 9999 }}>

              <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'flex-end' }}>
                <FontAwesome
                  style={{ paddingHorizontal: 15 }}
                  name={'times'}
                  size={20}
                  color={Colors.black}
                  onPress={() => handleAreaVisibility(!areaVisibility)}
                />
              </View>

              <ScrollView style={{ marginVertical: 10 }}>
                {/* <Text>1
                  </Text> */}
                {cityId?.id !== '' && (
                  <FlatList
                    data={
                      cityId?.id == 1
                        ? area?.dubaiCommunity
                        : cityId?.id == 2
                          ? area?.abuDhabiCommunity
                          : cityId?.id == 3
                            ? area?.sharjahCommunity
                            : area?.fujairahCommunity
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                      return (
                        <View
                          style={{
                            width: '88%',
                            alignSelf: 'center',
                            marginVertical: 5,
                          }}>
                          {/* <Text style={styles.areaTxt}>Select Area</Text> */}
                        </View>
                      );
                    }}
                    ItemSeparatorComponent={() => {
                      return (
                        <View
                          style={{
                            borderBottomWidth: 2,
                            borderBottomColor: Colors.borColor,
                          }}
                        />
                      );
                    }}
                    renderItem={({ item }) => {
                      return (
                        <Pressable
                          onPress={() => { setAreaId(item); handleChange('CityName', item?.areaName); handleChange('City', item?.id); handleAreaVisibility(!areaVisibility); }}
                          style={{ padding: 10 }}>
                          <Text
                            style={styles.listTxt}>
                            {item?.areaName}
                            {/* {JSON.stringify(item)} */}
                          </Text>
                        </Pressable>
                      );
                    }}
                  />
                )}
              </ScrollView>
            </TouchableOpacity>
          </View>
        </>
        : ''
      }
    </SafeAreaView>
  );
};

export default Profile;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainIcon: {
    marginTop: 20,
    fontSize: Responsive.convertFontScale(24),
    color: Colors.fontblack,
    marginLeft: 20,
  },
  mainTxt: {
    fontFamily: 'Roboto-Regular',
    marginTop: 20,
    fontSize: Responsive.convertFontScale(20),
    color: Colors.fontblack,
    fontWeight: '500',
    marginLeft: 90,
  },
  scndView: {
    marginTop: 30,
    margin: 20,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  inptIcon: {
    fontSize: Responsive.convertFontScale(20),
    marginLeft: 20,
  },
  inputTxt: {
    fontFamily: 'Roboto-Regular',
    paddingLeft: 20,
    fontSize: Responsive.convertFontScale(15),
  },
  ctyTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: Responsive.convertFontScale(18),
    padding: 16,
    fontWeight: '500',
    color: Colors.fontblack,
  },
  imgView: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imgSet: {
    borderWidth: 1,
    borderColor: Colors.borColor,
    flexDirection: 'row',
    // height: Responsive.heightPercentageToDP(100),
    // width: Responsive.widthPercentageToDP(21),
    width: '100%',
    marginTop: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 3,
  },
  abu_Dhabi: {
    marginLeft: 8,
    height: Responsive.heightPercentageToDP(3),
    width: Responsive.widthPercentageToDP(6),
  },

  abuTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.convertFontScale(12),
    fontWeight: '500',
    marginLeft: 8,
    marginTop: 2,
    color: Colors.fontblack,
  },
  areaTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: Responsive.convertFontScale(16),

    fontWeight: '500',
    color: Colors.fontblack,
  },
  popularTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: Responsive.convertFontScale(18),
    marginTop: 20,
    fontWeight: '500',
    color: Colors.fontblack,
  },
  listTxt: {
    fontFamily: 'Roboto-Regular',
    fontSize: Responsive.convertFontScale(14),
    // borderBottomWidth: 0.7,
    // padding: 10,
    color: Colors.fontblack,
    paddingLeft: 15,
  },
});

