import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import SyncStorage from 'sync-storage';
import BackHeader from '../../../Component/BackHeader';
import Colors from '../../../assets/Theme/Colors';
import { MyTextInput } from '../../../Component/MyTextInput';
import Responsive from '../../../assets/Theme/Responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomsButtons from '../../../Component/CustomsButtons';
import navigationStrings from '../../../assets/Theme/navigationStrings';
const AddCoupon = props => {
  const [coupon, setCoupon] = useState(0);
  const [openChange, setOpenChange] = useState(false);
  const [saveDefault, setSaveDefault] = useState(false);
  // const [tabChange, setTabChange] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surfaceBlack }}>
      <BackHeader title={'Coupon'} />
      <View style={{ height: 10 }} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          height: '100%',
          paddingHorizontal: 20,
          backgroundColor: Colors.white,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: Colors.black,
            fontSize: Responsive.convertFontScale(17),
          }}>
          Coupon
        </Text>
        <View style={{ height: 10 }} />
        <MyTextInput
          InputStyle={{ paddingHorizontal: 10 }}
          placeholder={'Coupon Code'}
          onChangeText={(value) => setCoupon(value)}
          
        // numberOfLines={5}
        // multiline={true}
        />
        <View style={{ height: 40 }} />

        <View style={{ padding: 15, borderColor: '#ddd', borderWidth: 1, borderRadius: 20, backgroundColor: '#ffffff', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: 'inherit', left: 0, right: 0 }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{
              color: Colors.black,
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              fontWeight: '500',
            }}>Maximum Savings: </Text>
            <Text style={{
              color: Colors.black,
              fontSize: 20,
              fontFamily: 'Roboto-Regular',
              fontWeight: '500',
            }}>AED 0</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                SyncStorage.set('_laundry_coupon_', coupon);
                props.navigation.navigate(navigationStrings.MYADDRESS);
              }}
              style={{
                width: Responsive.widthPercentageToDP('30%'),
                height: 35,
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 6,
                fontSize: 16,
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: Colors.sky_blue,
                marginTop: 0,
              }}
            >
              <Text style={{
                color: Colors.white,
                fontSize: 16,
                fontFamily: 'Roboto-Regular',
                fontWeight: '500',
              }}>Apply</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ height: 10 }} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCoupon;
