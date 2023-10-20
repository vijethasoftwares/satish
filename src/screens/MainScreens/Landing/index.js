import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SyncStorage from 'sync-storage';
import BackHeader from '../../../Component/BackHeader';
import CustomImageCarousalLandscape from '../../../Component/CustomImageCarousalLandscape';
import icons from '../../../assets/icons';
import Colors from '../../../assets/Theme/Colors';

import Responsive from '../../../assets/Theme/Responsive';
import { tabData, clothes } from '../../../assets/JSON/dummyData';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomsButtons from '../../../Component/CustomsButtons';
import navigationStrings from '../../../assets/Theme/navigationStrings';
import {area} from '../../../assets/JSON/allAreas';
const Landing = props => {
  const [changeArrow, setChangeArrow] = useState(false);
  const [dataItem, setDataItem] = useState(tabData);
  const [locationVisibility, setLocationVisibility] = useState(false);
  const [cityDataSelected, setCityDataSelected] = useState(SyncStorage.get('_laundry_location_city_')?SyncStorage.get('_laundry_location_city_'):{});
  const [areaDataSelected, setAreaDataSelected] = useState(SyncStorage.get('_laundry_location_area_')?SyncStorage.get('_laundry_location_area_'):{});
  const [cityId, setCityId] = useState(SyncStorage.get('_laundry_location_city_')?SyncStorage.get('_laundry_location_city_')['id']:0);
  const [areaId, setAreaId] = useState('');

  useEffect(() => {
    setCityDataSelected(SyncStorage.get('_laundry_location_city_')?SyncStorage.get('_laundry_location_city_'):{})
    setAreaDataSelected(SyncStorage.get('_laundry_location_area_')?SyncStorage.get('_laundry_location_area_'):{})
    setCityId(SyncStorage.get('_laundry_location_city_')?SyncStorage.get('_laundry_location_city_')['id']:0)
  })

  let onPressLocation = () => {
    setLocationVisibility(!locationVisibility)
  }

  let areaHandler = (item) => {
    SyncStorage.set('_laundry_location_area_', item);
    setAreaDataSelected(item)
  }
  const data = [
    {
      id: 0,
      image: icons.Dry,
    },
    {
      id: 1,
      image: icons.Dry,
    },
    {
      id: 2,
      image: icons.Dry,
    },
  ];
  const handleItem = item => {
    let temp = tabData;
    temp.map(ele => {
      if (item.id == ele.id) {
        ele.status = !ele.status;
      }
    });
    console.log('temp', [...temp]);
    setDataItem([...temp]);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <BackHeader
        leftIcon
        homeIcon
        locTitle={cityDataSelected?.id ? cityDataSelected?.cityName : ''}
        onPress={() => props.navigation.openDrawer()}
        onPressLocation={onPressLocation}
      />
      <ScrollView
        style={{}}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#ffffff' }}
        showsVerticalScrollIndicator={false}>
        <View style={{ width: '95%', alignSelf: 'center' }}>
          <Text
            style={{
              width: '85%',
              fontFamily: 'Poppins-SemiBold',
              color: Colors.black,
              fontWeight: '400',
              fontSize: Responsive.convertFontScale(21),
            }}>
            Which laundry service do you need today?
          </Text>
        </View>
        <View style={{ width: '95%', alignSelf: 'center', marginVertical: 5 }}>
          <Text
            style={{
              fontFamily: 'Roboto-SemiBold',
              color: Colors.grey,
              fontWeight: '400',
              fontSize: Responsive.convertFontScale(14),
            }}>
            Get first order free
          </Text>
        </View>
        <View style={{ width: '100%', marginVertical: 10, padding: 0 }}>
          <CustomImageCarousalLandscape
            data={data}
            autoPlay={true}
            pagination={true}>
            {/* {bannerButton()} */}
          </CustomImageCarousalLandscape>
        </View>
        <View style={{ width: '95%', alignSelf: 'center' }}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: Colors.black,
              fontWeight: '400',
              fontSize: Responsive.convertFontScale(22),
            }}>
            Services
          </Text>
        </View>
        <View>
          {dataItem?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  paddingVertical: 15,
                  height: undefined,
                  // alignItems: 'center',
                  borderTopWidth: 1,
                  borderTopColor: Colors.borColor,
                }}>
                <Pressable
                  onPress={() => handleItem(item)}
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      color: Colors.black,
                      fontSize: Responsive.convertFontScale(14),
                    }}>
                    {item?.title}
                  </Text>
                  <FontAwesome
                    // name={!item?.status ? 'angle-down' : 'angle-up'}
                    name={'angle-up'}
                    size={20}
                    color={Colors.black}
                  />
                </Pressable>
                {/* {item?.status && ( */}
                {(
                  <View
                    horizontal
                    style={{
                      width: '95%',
                      flexDirection: 'column',
                      alignSelf: 'center',
                    }}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable
                          onPress={() =>
                            props.navigation.navigate(
                              navigationStrings.PRICELIST,
                            )
                          }>
                          <Text
                            style={{
                              marginVertical: 10,
                              textAlign: 'right',
                              textDecorationLine: 'underline',
                              color: Colors.black,
                              fontSize: Responsive.convertFontScale(15),
                            }}>
                            Check all prices
                          </Text>
                        </Pressable>
                      </View>
                      <View
                        style={{ flex: 1, flexDirection: 'row', }}>
                        {[...clothes, { id: 7, name: 'Check all prices' }].map(
                          (ele, index) => {
                            return (
                              (ele.id == item.id) ?
                                <ScrollView horizontal={true}
                                  key={index} scrollEnabled={true}
                                  style={{
                                    flexDirection: 'row',
                                    // marginLeft: ele?.id == 0 ? 1 : 10,
                                  }}>
                                  <View
                                    style={{ flex: 1, flexDirection: 'row', }}>
                                    {ele && ele.data ?
                                      ele.data.map((valx, index2) => {
                                        return (
                                          <View
                                            style={{
                                              marginTop: 5,
                                              padding: 7,
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                            }}>
                                            <Image
                                              source={valx?.image}
                                              resizeMode="contain"
                                              style={{
                                                height: Responsive.heightPercentageToDP(6),
                                                width: Responsive.heightPercentageToDP(6),
                                              }}
                                            />
                                            <Text style={{ fontFamily: 'Poppins-Medium' }}>{valx?.name}</Text>
                                            <Text style={{ fontFamily: 'Poppins-Medium' }}>{valx?.price}</Text>
                                          </View>
                                        )
                                      }) : ''
                                    }
                                  </View>
                                </ScrollView>
                              : ''  
                            )
                          }
                        )}
                      </View>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <CustomsButtons
          title={'Schedule Pickup'}
          onPressButton={() => {
            props.navigation.navigate(navigationStrings.MYADDRESS);
          }}
        />
        <View style={{ height: 10 }} />
      </ScrollView>

      {locationVisibility?
      <>
        <View style={{backgroundColor: 'rgba(0,0,0,0.3)',  height: 10, position: 'absolute', width: '100%', height: '100%' }}>
          <TouchableOpacity style={{backgroundColor: '#ffffff', width: '90%', marginTop: '10%', height: '80%', marginRight: 'auto', marginLeft: 'auto', top: 30, zIndex: 9999}}>

            <View style={{marginVertical: 10, justifyContent: 'center', alignItems: 'flex-end'}}>
              <FontAwesome
                style={{paddingHorizontal: 15 }}
                name={'times'}
                size={20}
                color={Colors.black}
                onPress={onPressLocation}
              />
              {/* <Text>{JSON.stringify(cityDataSelected)}</Text> */}
            </View>
            
            <ScrollView style={{marginVertical: 10}}>
              {cityId !== '' && (
                <FlatList
                  data={
                    cityId == 1
                      ? area?.dubaiCommunity
                      : cityId == 2
                      ? area?.abuDhabiCommunity
                      : cityId == 3
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
                  renderItem={({item}) => {
                    return (
                      <Pressable
                        onPress={() => {areaHandler(item); setAreaId(item?.id); onPressLocation()}}
                        style={{padding: 10}}>
                        <Text
                          // onPress={onPressLocation}
                          style={styles.listTxt}>
                          {item?.areaName}
                          {/* {"selected: "+SyncStorage.get('_laundry_location_area_').areaName} */}
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
      :''}
    </SafeAreaView>
  );
};

export default Landing;

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

    height: Responsive.heightPercentageToDP(10),
    width: Responsive.widthPercentageToDP(21),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  abu_Dhabi: {
    height: Responsive.heightPercentageToDP(4),
    width: Responsive.widthPercentageToDP(8),
  },

  abuTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Responsive.convertFontScale(12),
    fontWeight: '500',
    // marginLeft: 8,
    marginTop: 2,
    color: Colors.fontblack,
  },
  areaTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: Responsive.convertFontScale(16),
    
    fontWeight: '500',
    color: Colors.fontblack,
  },
  popularTxt:{
    fontFamily: 'Poppins-Regular',
    fontSize: Responsive.convertFontScale(18),
    marginTop:20,
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

