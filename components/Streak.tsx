import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/default-styles';
import * as Text from './Text';
import Button from './Button';

interface Props {
  onPress: () => void;
  value: string;
  streak: number;
  type: 'active' | 'inactive';
}

const Streak = (props: Props) => {
  return (
    <View style={styles.streakContainer}>
      <Button
        onPress={() => {}}
        icon={{
          type: 'AntDesign',
          name: 'arrowright',
          size: 16,
        }}
        extra={
          <View
            style={{
              ...styles.counter,
              backgroundColor:
                props.type === 'active'
                  ? Colors.primary1
                  : Colors.semanticYellow1,
            }}
          >
            <Text.H3 style={styles.counterText}>
              {props.streak.toString()}
            </Text.H3>
          </View>
        }
      >
        {props.value}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    width: '100%',
    alignItems: 'center',
    // marginBottom: 24,
    paddingVertical: 16,
  },
  counter: {
    width: 30,
    height: 30,
    backgroundColor: Colors.primary1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -15,
    top: -15,
  },
  counterText: {
    color: 'white',
  },
});

export default Streak;
