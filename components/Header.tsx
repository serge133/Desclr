import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import * as Text from './Text';
import { Colors } from '../constants/default-styles';
import RenderIcon, { IconTypes } from './RenderIcon';

interface Props {
  children: string;
  style?: {};
  headerLeft?: {
    name: string;
    type: IconTypes;
    onPress: (event: GestureResponderEvent) => void;
  };
  headerRight?: {
    name: string;
    type: IconTypes;
    onPress: (event: GestureResponderEvent) => void;
  };
}

const Header: React.FC<Props> = (props) => {
  const text = props.children;
  const firstLetter = text[0];

  return (
    <View style={{ ...styles.header, ...props.style }}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          {props.headerLeft && (
            <TouchableOpacity onPress={props.headerLeft.onPress}>
              <RenderIcon
                type={props.headerLeft!.type}
                name={props.headerLeft!.name}
                size={30}
                color={Colors.primary1}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.title}>
          <Text.H1 style={{ color: Colors.primary1 }}>{firstLetter}</Text.H1>
          <Text.H1>{text.replace(firstLetter, '')}</Text.H1>
        </View>
        <View style={styles.headerRight}>
          {props.headerRight && (
            <TouchableOpacity onPress={props.headerRight.onPress}>
              <RenderIcon
                type={props.headerRight!.type}
                name={props.headerRight!.name}
                size={30}
                color={Colors.primary1}
                style={{
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  title: {
    flexDirection: 'row',
    flex: 1,
  },
  headerRight: {
    flex: 1,
  },
  headerLeft: {
    flex: 1,
  },
});

export default Header;
