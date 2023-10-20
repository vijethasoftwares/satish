import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import SyncStorage from 'sync-storage';
import BackHeader from '../../../Component/BackHeader';
import Colors from '../../../assets/Theme/Colors';
import { MyTextInput } from '../../../Component/MyTextInput';
import Feather from 'react-native-vector-icons/Feather';
import { tabData, clothes } from '../../../assets/JSON/dummyData';
import Responsive from '../../../assets/Theme/Responsive';
import CustomsButtons from '../../../Component/CustomsButtons';
import navigationStrings from '../../../assets/Theme/navigationStrings';
const PriceList = props => {
  const [tabChange, setTabChange] = useState(0);
  const [category, setCategory] = useState(0);
  const [cityDataSelected, setCityDataSelected] = useState(SyncStorage.get('_laundry_location_city_') ? SyncStorage.get('_laundry_location_city_') : {});
  const [areaDataSelected, setAreaDataSelected] = useState(SyncStorage.get('_laundry_location_area_') ? SyncStorage.get('_laundry_location_area_') : {});
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surfaceBlack }}>
      <View style={{ backgroundColor: Colors.white }}>
        <BackHeader leftIcon
          locTitle={cityDataSelected?.id ? cityDataSelected?.cityName : ''} title={'Price List'} />
        <MyTextInput
          leftIcon
          onChangeText={txt => setSearch(txt)}
          InputStyle={{ paddingHorizontal: 10 }}
          placeholder={'Search for clothes'}
          Icon={<Feather name="search" size={20} color={Colors.black} />}
          ContainView={{ width: '95%', alignSelf: 'center' }} ></MyTextInput>
      </View>

      <View>
        <FlatList
          data={tabData}
          horizontal
          ItemSeparatorComponent={() => {
            return <View style={{ width: 15 }} />;
          }}
          contentContainerStyle={{
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => setTabChange(index)}
                style={{
                  borderWidth: 1.5,
                  borderColor: Colors.green,
                  paddingHorizontal: 13,
                  height: 28,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor:
                    tabChange == index ? Colors.green : Colors.white,
                }}>
                <Text
                  style={{
                    color: tabChange == index ? Colors.white : Colors.green,
                    fontFamily: 'Poppins-Medium',
                    lineHeight: 28,
                    fontWeight: '500',
                    fontSize: Responsive.convertFontScale(12),
                  }}>
                  {item?.title}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      <FlatList
        data={clothes}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 5 }} />;
        }}
        contentContainerStyle={{
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => {
          return <View style={{ height: 20 }} />;
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View>
                    {/* <Text> ({JSON.stringify(item)}-{index}) </Text> */}
              {(parseInt(category) == 0 || category == index) && (
                <>
                  {(item?.categoryName.toUpperCase().indexOf(search.toUpperCase()) > -1)?
                  <Pressable onPress={() => setCategory(index)}>
                    <Text>{item?.categoryName}</Text>
                  </Pressable>
                  :''}
                  <View>
                    {item?.data?.map((ele, indexEle) => {

                      return (
                        (ele?.name.toUpperCase().indexOf(search.toUpperCase()) > -1)?
                        <View
                          style={{
                            justifyContent: 'space-between',
                            marginVertical: 5,
                            paddingHorizontal: 15,
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: Colors.white,
                          }}>
                          <View
                            style={{
                              width: '40%',
                              padding: 10,
                              flexDirection: 'row',
                              // justifyContent: 'center',
                              // alignItems: 'center',
                            }}>
                            <Image
                              source={ele?.image}
                              resizeMode="contain"
                              style={{
                                height: Responsive.heightPercentageToDP(5),
                                width: Responsive.heightPercentageToDP(5),
                              }}
                            />
                            <View style={{ width: 15 }} />
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 16, textTransform: 'capitalize', color: Colors.black }}>{ele?.name}</Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '40%',
                            }}>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 15, textDecorationLine: 'line-through' }}>
                              {ele?.price}
                            </Text>
                          </View>
                          <Text style={{ fontFamily: 'Poppins-Light', fontSize: indexEle ? 15 : 18 }}>{ele?.discount_price}</Text>
                        </View>
                        :''
                      );
                    })}
                  </View>
                </>
              )}
            </View>
          );
        }}
      />
      <View style={{ backgroundColor: Colors.white }}>
        <CustomsButtons
          title={'Schedule Pickup'}
          onPressButton={() => {
            props.navigation.navigate(navigationStrings.MYADDRESS);
          }}
        />
        <View style={{ height: 10 }} />
      </View>
    </SafeAreaView>
  );
};

export default PriceList;

const styles = StyleSheet.create({});
