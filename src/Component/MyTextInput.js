import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Colors from '../assets/Theme/Colors';
import Responsive from '../assets/Theme/Responsive';
const {width, height} = Dimensions.get('window');
export const MyTextInput = props => {
  return (
    <View style={[styles.container, props.ContainView]}>
      {props.leftIcon ? (
        <View style={{}}>
          <Pressable onPress={props.onPressLeftImage}>{props.Icon}</Pressable>
        </View>
      ) : null}
      {props.optionalView}
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        style={[
          styles.textInputStyle,
          {width: props.rightIcon ? '90%' : props.leftIcon ? '86%' : '100%'},
          props.InputStyle,
        ]}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        returnKeyType={'done'}
        maxLength={props.maxLength}
        editable={props.editable}
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : Colors.borColor
        }
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        onFocus={props.onFocus}
        onPressIn={props.onPressIn}
        onPressOut={props.onPressOut}
        onSubmitEditing={props.onSubmitEditing}
        textAlignVertical={props.textAlignVertical}
        clearButtonMode={props.clearButtonMode}
        ref={props.ref}
      />
      {props.rightIcon ? (
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onPressRightImage}>
            {props.Icon}
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: 43,
    borderWidth: 1,
    borderColor: Colors.borColor,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  textInputStyle: {
    fontSize: Responsive.convertFontScale('14'),
    letterSpacing: 0.4,
    height: '100%',
    color: Colors.black,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: Responsive.convertFontScale('12'),
  },
});
