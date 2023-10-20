import {StyleSheet, Text, View, SafeAreaView, Modal, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Responsive from '../../assets/Theme/Responsive';
import navigationStrings from '../../assets/Theme/navigationStrings';
import Colors from '../../assets/Theme/Colors';
import CustomsButtons from '../../Component/CustomsButtons';
import icons from '../../assets/icons';

const Splash = props => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      setModalVisible(true);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>LOGO</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.Footer}>
            <Image style={styles.Image} source={icons.Location} />
            <Text style={styles.txt}>Hey there! Where are you?</Text>
            <Text style={styles.scnd_txt}>
              Get dry clean facilities at your doorstep!
            </Text>
            <CustomsButtons
              onPressButton={() => {
                setModalVisible(false);
                setTimeout(() => {
                  props.navigation.navigate(navigationStrings.LOCATION);
                }, 1000);
              }}
              title={'Select Location'}
              mainStyle={{
                width: '90%',
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Splash;

const styles = StyleSheet.create({
  mainTxt: {
    textAlign: 'center',
    marginTop: '75%',
    fontSize: Responsive.convertFontScale(70),
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 21, 27, 0.33)',
  },

  Footer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: Responsive.heightPercentageToDP('55%'),
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  shadowColor: '#000',
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
    fontSize: Responsive.convertFontScale(21),
    paddingTop: 20,
    color: Colors.fontblack,
  },
  scnd_txt: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: Responsive.convertFontScale(15),
    fontWeight: '400',
    color: Colors.fontblack,
  },
  scnd_txt: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: Responsive.convertFontScale(15),
    fontWeight: '400',
    color: Colors.fontblack,
  },
});
