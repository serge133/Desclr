import React, { useRef, ReactNode, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  children: ReactNode;
  durationFadeOut: number;
  durationFadeIn: number;
}

// Duration is in milliseconds

const Breath: React.FC<Props> = props => {
  const opacity = useRef(new Animated.Value(1)).current;
  const { durationFadeIn, durationFadeOut } = props;

  const startAnim = useCallback(() => {
    // Infinite loop
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.2,
        duration: durationFadeOut,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: durationFadeIn,
        useNativeDriver: false,
      }),
    ]).start(startAnim);
  }, [durationFadeIn, durationFadeOut]);

  useEffect(() => startAnim(), [startAnim]);

  return (
    <Animated.View
      style={{
        opacity: opacity,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default Breath;

const styles = StyleSheet.create({});
