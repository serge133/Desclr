import React from 'react';
import { StyleSheet, View, Slider, SliderProps } from 'react-native';
import * as Text from './Text';
import { Colors } from '../../constants/default-styles';

interface Props extends SliderProps {
  label?: string;
  visibleSliderInformation?: string;
}

const CustomSlider = (props: Props) => {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.labelContainer}>
        {props.label && <Text.H3>{props.label}</Text.H3>}
        {props.visibleSliderInformation && (
          <Text.Body1>{props.visibleSliderInformation}</Text.Body1>
        )}
      </View>
      <Slider
        style={styles.slider}
        minimumTrackTintColor={Colors.primary1}
        maximumTrackTintColor={Colors.primary4}
        thumbTintColor={Colors.primary1}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 24,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  slider: {
    width: '100%',
  },
});

export default CustomSlider;
