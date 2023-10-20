import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SyncStorage from 'sync-storage';
import Feather from 'react-native-vector-icons/Feather';
import Responsive from '../../../assets/Theme/Responsive';
import Colors from '../../../assets/Theme/Colors';
import {cities} from '../../../assets/JSON/dummyData';
import BackHeader from '../../../Component/BackHeader';
import {MyTextInput} from '../../../Component/MyTextInput';
import {area} from '../../../assets/JSON/allAreas';

const Location = props => {
  const user = [
    {
      id: '1',
      name: 'The Palm Jumeirah',
    },
    {
      id: '2',
      name: 'Al Ain Road',
    },
    {
      id: '3',
      name: 'Al Baraha',
    },
    {
      id: '4',
      name: 'Al Barari',
    },
    {
      id: '5',
      name: 'Al Jaddaf',
    },
    {
      id: '6',
      name: 'Al Khail Road',
    },
    {
      id: '7',
      name: 'Al Qudra Road',
    },
    {
      id: '8',
      name: 'Al Quoz',
    },
    {
      id: '9',
      name: 'Al Satwa',
    },
    {
      id: '10',
      name: 'Al Sufouh',
    },
    {
      id: '11',
      name: 'Barsha Heights Tecom',
    },
  ];
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [cityId, setCityId] = useState(1);
  const [areaId, setAreaId] = useState('');
  useEffect(() => {
    SyncStorage.set('_laundry_location_city_', area?.city[0]);
    setFilteredDataSource(area?.city);
    setMasterDataSource(area?.city);
  }, []);
  const onSearch = txt => {
    
    // Check if searched text is not blank
    if (txt) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.cityName
          ? item.cityName.toUpperCase()
          : ''.toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      // console.log('newData', newData);
      setSearch(txt);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(txt);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <BackHeader title={'Pick a Region'} />
      <MyTextInput
        leftIcon
        value={search}
        placeholder={'Search for your city'}
        onChangeText={txt => onSearch(txt)}
        Icon={<Feather name="search" size={20} color={Colors.borColor} />}
        ContainView={{width: '95%', alignSelf: 'center'}}></MyTextInput>
      {search !== '' && filteredDataSource.length !== 0 && (
        <View style={{width: '88%', alignSelf: 'center', marginVertical: 5}}>
          <Text style={styles.popularTxt}>Popular cities</Text>
        </View>
      )}
      <View style={{marginVertical: 10}}>
        {/* {search !== '' && ( */}
          <FlatList
            data={filteredDataSource}
            extraData={filteredDataSource}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{width: 10}} />;
            }}
            contentContainerStyle={{
              paddingHorizontal: 12,
              // height: '60%',
            }}
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() => {SyncStorage.set('_laundry_location_city_', item);setCityId(item?.id)}}
                  style={{...styles.imgSet, backgroundColor: (cityId == item?.id)?'rgba(100, 200, 100, 0.1)':'rgba(100, 100, 100, 0.1)', borderColor: (cityId == item?.id)?'rgba(100, 255, 100, 0.3)':'rgba(100, 100, 100, 0.1)'}}>
                  <Image style={styles.abu_Dhabi} source={item.icon} />
                  <View style={{height: 3}} />
                  <Text style={styles.abuTxt}>{item?.cityName}</Text>
                </Pressable>
              );
            }}
          />
        {/* )} */}
      </View>
      <View style={{marginVertical: 10}}>
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
                  <Text style={styles.areaTxt}>Select Area</Text>
                </View>
              );
            }}
            renderItem={({item}) => {
              return (
                (item?.areaName.toUpperCase().indexOf(search.toUpperCase()) > -1)?

                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.borColor,
                  }}
                >
                <Pressable
                  onPress={() => setAreaId(item?.id)} // Save in local storage
                  style={{padding: 10}}>
                  <Text
                    onPress={() => {SyncStorage.set('_laundry_location_area_', item);props.navigation.navigate('MyDrawer')}}
                    style={styles.listTxt}>
                    {
                      (item?.areaName.toUpperCase().indexOf(search.toUpperCase()) > -1)?
                      item?.areaName
                      :''
                    }
                  </Text>
                </Pressable>
                </View>
                :''
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Location;

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
