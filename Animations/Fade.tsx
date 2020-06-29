import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

interface Props {
  fadeType: 'in' | 'out';
  duration: number;
}

const Fade: React.FC<Props> = (props) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { fadeType, duration } = props;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: fadeType === 'in' ? 1 : 0,
      duration: duration,
    }).start();
  }, [fadeType, duration]);

  return (
    <Animated.View // Special animatable View
      style={{
        opacity: opacity, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default Fade;
