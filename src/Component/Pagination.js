import {StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  processColor,
} from 'react-native-reanimated';
import Colors from '../assets/Theme/Colors';
const Pagination = ({data, x, size}) => {
  return (
    <View style={styles.paginationContainer}>
      {data &&
        data.length &&
        data.map((_, i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const animatedDotStyle = useAnimatedStyle(() => {
            const widthAnimation = interpolate(
              x.value,
              [(i - 1) * size, i * size, (i + 1) * size],
              [10, 20, 10],
              Extrapolate.CLAMP,
            );
            const opacityAnimation = interpolate(
              x.value,
              [(i - 1) * size, i * size, (i + 1) * size],
              [0.5, 1, 0.5],
              Extrapolate.CLAMP,
            );

            return {
              width: widthAnimation,
              opacity: opacityAnimation,
              backgroundColor: processColor(Colors.sky_blue),
            };
          });
          return (
            <Animated.View
              style={[styles.dots, {backgroundColor: '#000'}, animatedDotStyle]}
              key={i}
            />
          );
        })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    height: 6,

    marginHorizontal: 10,
    borderRadius: 5,
  },
});
