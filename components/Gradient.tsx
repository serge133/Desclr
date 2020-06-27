import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';

interface Props {
  style?: {};
  children: React.ReactNode;
}

// linear-gradient(163.44deg, #4135F3 -2.1%, #7168F6 69.22%)
// linear-gradient(150.98deg, #BE52F2 0%, #DBA5F5 104.69%)

export const Primary: React.FC<Props> = (props) => {
  return (
    <LinearGradient
      colors={['#4135F3', '#7168F6']}
      style={props.style}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
    >
      {props.children}
    </LinearGradient>
  );
};

export const Accent: React.FC<Props> = (props) => {
  return (
    <LinearGradient
      colors={['#BE52F2', '#DBA5F5']}
      style={props.style}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
    >
      {props.children}
    </LinearGradient>
  );
};
