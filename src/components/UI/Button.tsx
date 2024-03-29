import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import * as Gradients from './Gradient';
import * as Text from './Text';
import { Shadow, Colors } from '../../constants/default-styles';
import RenderIcon, { IconTypes } from './RenderIcon';

export interface Button {
  name: string;
  onPress: () => void;
  type?: 'colorful';
  icon?: {
    type: IconTypes;
    name: string;
    size: number;
  };
}

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  children: string;
  type?: 'colorful';
  disabled?: boolean;
  style?: {};
  icon?: {
    type: IconTypes;
    name: string;
    size: number;
  };
}

const Button: React.FC<Props> = props => {
  if (props.type === 'colorful') {
    return (
      <TouchableOpacity
        style={{
          ...styles.buttonContainer,
          ...props.style,
        }}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Gradients.Primary style={styles.buttonGradient}>
          <View
            style={{
              ...styles.colorfulButton,
              justifyContent: props.icon ? 'space-between' : 'center',
            }}
          >
            <Text.H3
              style={
                props.disabled
                  ? styles.disabledButtonText
                  : styles.colorfulButtonText
              }
            >
              {props.children}
            </Text.H3>
            {props.icon && (
              <RenderIcon
                type={props.icon?.type}
                name={props.icon?.name}
                size={props.icon?.size}
                color='white'
              />
            )}
          </View>
        </Gradients.Primary>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <View
        style={{
          ...styles.button,
          justifyContent: props.icon ? 'space-between' : 'center',
        }}
      >
        <Text.H3 style={props.disabled && styles.disabledButtonText}>
          {props.children}
        </Text.H3>
        {props.icon && (
          <RenderIcon
            type={props.icon?.type}
            name={props.icon?.name}
            size={props.icon?.size}
            color={Colors.text}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '80%',
    borderRadius: 20,
    ...Shadow,
  },
  colorfulButton: {
    width: '100%',
    height: 68,
    padding: 24,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGradient: {
    borderRadius: 20,
  },
  colorfulButtonText: {
    color: 'white',
  },
  // Default Button Style
  button: {
    width: '100%',
    height: 68,
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    // ...Shadow,
  },
  disabledButtonText: {
    color: Colors.grey4,
  },
});

export default Button;
