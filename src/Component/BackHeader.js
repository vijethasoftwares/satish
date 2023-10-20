import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from 'react-native';
import React, { useState } from 'react';
import SyncStorage from 'sync-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/Theme/Colors';
import Responsive from '../assets/Theme/Responsive';
import { useNavigation } from '@react-navigation/native';
const BackHeader = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {props.homeIcon ? (
          <FontAwesome
            name="navicon"
            size={20}
            color={Colors.black}
            onPress={props.onPress}
          />
        ) : (
          <FontAwesome
            name="angle-left"
            size={25}
            color={Colors.black}
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
      <View
        style={{
          marginRight: props.leftIcon ? -80 : 20,
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontWeight: '300',
            fontSize: Responsive.convertFontScale(17),
            color: Colors.black,
          }}>
          {props.title}
        </Text>
      </View>
      {props.leftIcon && (
        <Pressable
          onPress={props.onPressLocation}
        >
          <View
            style={{
              height: 30,
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
                fontFamily: 'Poppins-Regular',
                // fontWeight: '500',
                fontSize: Responsive.convertFontScale(15),
                color: Colors.black,
              }}>
              {props.locTitle}
            </Text>
            <View
              style={{
                height: 40,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <FontAwesome
                name="chevron-down"
                size={12}
                color={Colors.black}
              />
            </View>
          </View>
        </Pressable>
      )}
      <View
        style={{
          height: 40,
          width: 10,
        }}></View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({});
