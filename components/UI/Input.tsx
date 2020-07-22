import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { Colors } from '../../constants/default-styles';
import * as Text from './Text';
import RenderIcon, { IconTypes } from './RenderIcon';

interface Props extends TextInputProps {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  iconButton?: {
    type: IconTypes;
    name: string;
    onPress: (event: GestureResponderEvent) => void;
  };
  containerStyle?: object;
}

const CustomInput: React.FC<Props> = props => {
  return (
    <View style={{ ...styles.inputContainer, ...props.containerStyle }}>
      {props.label && (
        <View style={styles.label}>
          <Text.H3>{props.label}</Text.H3>
        </View>
      )}
      <View>
        <TextInput
          style={props.isError ? styles.errorInput : styles.input}
          {...props}
        />
        {props.iconButton && (
          <TouchableOpacity
            onPress={props.iconButton.onPress}
            style={styles.iconButton}
          >
            <RenderIcon
              type={props.iconButton.type}
              name={props.iconButton.name}
              color={Colors.grey1}
              size={23}
            />
          </TouchableOpacity>
        )}
      </View>
      {typeof props.errorMessage === 'string' && props.isError && (
        <Text.Body2 style={styles.errorMessage}>
          {props.errorMessage}
        </Text.Body2>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // marginTop: 24,
    width: '100%',
  },
  label: {
    marginBottom: 13,
  },
  input: {
    width: '100%',
    paddingBottom: 8,
    fontFamily: 'montserrat',
    fontSize: 14,
    borderBottomColor: Colors.primary4,
    borderBottomWidth: 1,
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    bottom: 8,
  },
  errorInput: {
    width: '100%',
    paddingBottom: 8,
    fontFamily: 'montserrat',
    fontSize: 14,
    borderBottomColor: Colors.error,
    borderBottomWidth: 1,
  },
  errorMessage: {
    color: Colors.error,
  },
});

export default CustomInput;
