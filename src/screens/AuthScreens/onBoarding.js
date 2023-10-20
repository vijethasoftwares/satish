import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import React from 'react';
import icons from '../../assets/icons';
import Colors from '../../assets/Theme/Colors';
import Responsive from '../../assets/Theme/Responsive';
import FontSize from '../../assets/Theme/FontSize';
import CustomsButtons from '../../Component/CustomsButtons';
import navigationStrings from '../../assets/Theme/navigationStrings';

const OnBoarding = (props) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.Footer}>
        <Image style={styles.Image} source={icons.Location} />
        <Text style={styles.txt}>Hey there! Where are you?</Text>
        <Text style={styles.scnd_txt}>Get dry clean facilities at your doorstep!</Text>
        <CustomsButtons  onPressButton={() => props.navigation.navigate(navigationStrings.LOCATION) } title={'Select Location'}/>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.darkgray,
  },
  Footer: {
    backgroundColor: Colors.white,
    height: Responsive.heightPercentageToDP('50%'),
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,
  Image: {
    marginLeft: '20%',
    height: Responsive.heightPercentageToDP('30%'),
    width: Responsive.widthPercentageToDP('60%'),
  },
  txt: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: Responsive.convertFontScale(25),
    paddingTop: 20,
    color: Colors.fontblack,
  },
  scnd_txt: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: Responsive.convertFontScale(17),
    fontWeight: '400',
    color: Colors.fontblack,
  },
  scnd_txt:{
    fontFamily: 'Poppins-Regular',
    textAlign:'center',
    paddingTop:10,
    fontSize:Responsive.convertFontScale(17),
    fontWeight:'400',
    color:Colors.fontblack,
  },
});
