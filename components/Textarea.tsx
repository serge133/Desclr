import React from 'react';
import { StyleSheet, View, TextInput, TextInputProps } from 'react-native';
import * as Text from './Text';
import { Colors } from '../constants/default-styles';

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: object;
}

const Textarea: React.FC<Props> = (props) => {
  return (
    <View style={{ ...styles.textareaContainer, ...props.containerStyle }}>
      {props.label ? (
        <View style={styles.label}>
          <Text.H3>{props.label}</Text.H3>
        </View>
      ) : null}
      <TextInput style={styles.textarea} multiline {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  textareaContainer: {
    width: '100%',
  },
  label: {
    marginBottom: 13,
  },
  textarea: {
    borderLeftColor: Colors.primary4,
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontFamily: 'montserrat',
    fontSize: 14,
  },
});

export default Textarea;
