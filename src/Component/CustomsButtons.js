import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../assets/Theme/Colors';
import Responsive from '../assets/Theme/Responsive';

const {height, width} = Dimensions.get('screen');

const CustomsButtons = ({
  title,
  source,
  onPressButton = () => {},
  mainStyle,
  style,
}) => {
  return (
    <View style={{marginTop: 95}}>
    <View style={{ padding: 15, borderColor: '#ddd', backgroundColor: '#ffffff', position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: 'inherit', left: 0, right: 0 }}>
    {/* <View> */}
      <TouchableOpacity
        onPress={onPressButton}
        style={[styles.button, {...mainStyle}]}>
        <Text style={[styles.text, {...style}]}>{title}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default CustomsButtons;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    fontWeight: '500',
  },
  button: {
    width: Responsive.widthPercentageToDP('90%'),
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.sky_blue,
    marginTop: 0,
  },
});
