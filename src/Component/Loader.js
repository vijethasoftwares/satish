import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../assets/Theme/Colors';
const {height, width} = Dimensions.get('screen');

const Loader = ({visible}) => {
  if (visible === true) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.green} size="large" />
      </View>
    );
  }

  return null;
};

const mapStateToProps = ({loader}) => ({visible: loader?.status});
export default connect(mapStateToProps, {})(Loader);

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
