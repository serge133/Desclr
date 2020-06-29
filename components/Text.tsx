import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../constants/default-styles';

interface Props {
  children: string;
  style?: {};
}

export const H1: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat-bold',
        fontSize: 34,
        color: Colors.text,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const H2: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat-bold',
        fontSize: 26,
        color: Colors.text,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const H3: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: Colors.text,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const H4: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat-bold',
        fontSize: 14,
        color: Colors.text,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const Body1: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat',
        fontSize: 16,
        color: Colors.text,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const Body2: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat-light',
        fontSize: 14,
        color: Colors.text,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const Body3: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat-light',
        fontSize: 11,
        color: Colors.text,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const Error: React.FC<Props> = (props) => {
  return (
    <Text
      style={{
        fontFamily: 'montserrat-light',
        fontSize: 13,
        color: Colors.error,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};
