import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/default-styles';
import * as Text from './Text';

interface Props {
  data: number[];
}

const graphHeight = 200;

const BarGraph: React.FC<Props> = props => {
  const Bar = (barProps: { decimal: number }) => (
    <View
      style={[
        styles.bar,
        {
          height: Math.floor(barProps.decimal * graphHeight),
        },
      ]}
    />
  );
  return (
    <>
      <View style={styles.barGraphContainer}>
        {props.data.map((b, index) => (
          <Bar decimal={b} key={b} />
        ))}
      </View>
      {/* <View style={styles.legend}>
        {props.data.map((s, index) => (
          <Text.Body3 key={s.label}>{`${index + 1}. ${s.label}`}</Text.Body3>
        ))}
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  barGraphContainer: {
    width: '100%',
    height: graphHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderBottomColor: Colors.primary1,
    borderBottomWidth: 0.5,
    marginBottom: 8,
  },
  bar: {
    width: '10%',
    backgroundColor: Colors.primary1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  barLabel: {
    color: 'white',
  },
  legend: {
    alignSelf: 'flex-start',
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default BarGraph;
