import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/default-styles';
import RenderIcon, { IconTypes } from './RenderIcon';
import * as Text from './Text';

interface Props {
  children: string;
  backgroundColor: string;
  iconType: IconTypes;
  iconName: string;
  onPress: () => void;
}

/**
 * Box button takes 100% width plus height because it is assumed to be in a grid
 */

const BoxButton = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={{ ...styles.box, backgroundColor: props.backgroundColor }}>
        <View style={styles.iconContainer}>
          <RenderIcon
            color={'white'}
            name={props.iconName}
            type={props.iconType}
            size={50}
          />
        </View>
        <Text.H3 style={styles.label}>{props.children}</Text.H3>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 150,
    marginBottom: 30,
  },
  box: {
    height: '100%',
    width: '100%',
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    display: 'flex',
    padding: 10,
  },

  iconContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    textAlign: 'center',
  },
});

export default BoxButton;
