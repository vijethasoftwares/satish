import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import SyncStorage from 'sync-storage';
import React from 'react'
import icons from '../../../assets/icons'
import Colors from '../../../assets/Theme/Colors'
import { useState, useEffect } from 'react'

import { ApiRequest } from '../../../apiFriend';
import endUrls from '../../../apiFriend/EndUrls'
import navigationStrings from '../../../assets/Theme/navigationStrings';

const Thankyou = (props) => {
  // console.log("scheduleTime", scheduleTime)

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(navigationStrings.LANDING);
    }, 10000)
  }, [])

  let ReorderRequest = () => {
    props.navigation.navigate(navigationStrings.LANDING);
  }
  // Need to call api for address add if user is not logged in
  return (
    <SafeAreaView>
      <View style={styles.carView}>
        <Image style={styles.CarImg} source={icons.Car} />
        <Text style={styles.orderTxt}>Order confirmed!</Text>
      </View>
      <View style={styles.opicityView}>
        <Text style={styles.simpleTxt}>Do you want to repeat order?</Text>
        <TouchableOpacity onPress={ReorderRequest}>
          <Text style={styles.opicityTxt}> Repeat Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Thankyou

const styles = StyleSheet.create({
  CarImg: {
    height: 232,
    width: 328,
    alignSelf: 'center',
    marginTop: '55%'
  },
  orderTxt: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
    color: Colors.fontblack,
    marginTop: 10
  },
  opicityView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30
  },
  simpleTxt: {
    fontFamily: 'Poppins-Medium',
    color: Colors.fontblack,
    fontSize: 14,
    fontWeight: '500'
  },
  opicityTxt: {
    fontFamily: 'Poppins-Medium',
    color: Colors.green,
    fontSize: 14,
    fontWeight: '500'
  }
})