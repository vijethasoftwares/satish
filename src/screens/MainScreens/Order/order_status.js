import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import Colors from '../../../assets/Theme/Colors';
import React, { useState, useEffect } from 'react';
import BackHeader from '../../../Component/BackHeader';

import Responsive from '../../../assets/Theme/Responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomsButtons from '../../../Component/CustomsButtons';
import navigationStrings from '../../../assets/Theme/navigationStrings';
import SyncStorage from 'sync-storage';


import { ApiRequest } from '../../../apiFriend';
import endUrls from '../../../apiFriend/EndUrls'

const orderStatus = () => {
  const [orderlist, setOrderList] = useState([]);

  useEffect(() => {
    let listOrderURL = endUrls.listOrder + SyncStorage.get('_laundry_auth_user_');

    ApiRequest(listOrderURL, 'GET', {}, {}).then(response => {
      console.log('response2', response);
      if (response?.statusCode == 200) {
        setOrderList(response?.data?.records?.ordersInfo);
      }
      // setTimeout(() => {
      //   // props.navigation.navigate(navigationStrings.LANDING);
      // }, 10000)
    })
  }, []);

  console.log("orderlist", orderlist)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surfaceBlack }}>
      <BackHeader title={'Order Status'} />
      <View style={{ height: 10 }} />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"> */}
      <ScrollView
          style={{}}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }}
          showsVerticalScrollIndicator={false}>
        {orderlist && orderlist.length > 0 ?
          orderlist.map((SingleOrder, index) => {
            return (

              <View
                style={{
                  backgroundColor: '#ffffff', flex: 1, padding: 20, marginTop: 5,
                }}>
                {/* Order Status Screen */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontFamily: 'Poppins' }}>{new Date(SingleOrder.Address.PickUpDetail.Date).toISOString().split('T')[0]}</Text>
                  <View style={{ backgroundColor: '#EEF7FE', paddingVertical: 3, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#3BA2F4', fontFamily: 'Poppins' }}>{SingleOrder?.OrderStatus}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>Order ID: {SingleOrder?._id}</Text>
                  <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>Amt:  AED {SingleOrder?.OrderTotalCost}</Text>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ borderStyle: 'dashed', borderLeftWidth: 1, borderLeftColor: '#000000' }}>
                      <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                      <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Picked</Text>
                    </View>
                    <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}>{new Date(SingleOrder.Address.PickUpDetail.Date).toISOString().split('T')[0]}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ borderStyle: 'dashed', borderLeftWidth: 1, borderLeftColor: '#000000' }}>
                      {/* <View style={{ borderRadius: 5, backgroundColor: '#000000' }}></View> */}
                      <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                      <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Delivered to service provider</Text>
                    </View>
                    <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}>5 Aug 2023</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ borderStyle: 'dashed', borderLeftWidth: 1, borderLeftColor: '#000000' }}>
                      {/* <View style={{ borderRadius: 5, backgroundColor: '#000000' }}></View> */}
                      <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                      <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Picked up from service provider</Text>
                    </View>
                    <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}></Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{}}>
                      {/* <View style={{ borderRadius: 5, backgroundColor: '#000000' }}></View> */}
                      <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                      <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Delivered</Text>
                    </View>
                    <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}></Text>
                    </View>
                  </View>
                </View>
                {/* <Text>2</Text> */}
                {/* <SplashScreen isAppReady={true} /> */}
              </View>

            );
          }) : ''}
        {/* <View
          style={{
            backgroundColor: '#ffffff', flex: 1, padding: 20, marginTop: 5,
          }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Poppins' }}>Fri, 4 Aug</Text>
            <View style={{ backgroundColor: '#EEF7FE', paddingVertical: 3, paddingHorizontal: 10 }}>
              <Text style={{ color: '#3BA2F4', fontFamily: 'Poppins' }}>Ongoing</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>Order ID: 190776</Text>
            <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>Amt:  AED 20</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ borderStyle: 'dashed', borderLeftWidth: 1, borderLeftColor: '#000000' }}>
                <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Picked</Text>
              </View>
              <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}>4 Aug 2023</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ borderStyle: 'dashed', borderLeftWidth: 1, borderLeftColor: '#000000' }}>
                <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Delivered to service provider</Text>
              </View>
              <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}>5 Aug 2023</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ borderStyle: 'dashed', borderLeftWidth: 1, borderLeftColor: '#000000' }}>
                <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Picked up from service provider</Text>
              </View>
              <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}></Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{}}>
                <View style={{ marginLeft: -8, marginTop: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: '#000000' }}><View style={{ width: 12, height: 12, marginTop: 2, marginLeft: 2, borderRadius: 6, backgroundColor: '#ffffff' }}><View style={{ width: 8, height: 8, borderRadius: 5, backgroundColor: '#000000', marginTop: 2, marginLeft: 2 }}><Text>1</Text></View></View></View>
                <Text style={{ fontWeight: '400', marginLeft: 15, marginTop: -18, paddingBottom: 15, fontFamily: 'Poppins' }}>Delivered</Text>
              </View>
              <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: '400', paddingBottom: 15, fontFamily: 'Poppins' }}></Text>
              </View>
            </View>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default orderStatus;
