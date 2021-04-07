import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/default-styles';
import * as Text from '../UI/Text';

interface Props {
  data: number[];
  maximum: number;
}

const graphHeight = 200;

const BarGraph: React.FC<Props> = props => {
  const Bar = (barProps: { data: number }) => {
    const percentage =
      barProps.data === null ? 0 : barProps.data / props.maximum;
    const barHeight = Math.floor(percentage * graphHeight);
    return (
      <View
        style={[
          styles.bar,
          {
            height: barHeight > 200 ? graphHeight : barHeight,
          },
        ]}
      >
        <Text.H3 style={styles.barLabel}>{barProps.data.toString()}</Text.H3>
      </View>
    );
  };
  return (
    <View style={styles.barGraphContainer}>
      {props.data.map((b, index) => b > 0 && <Bar data={b} key={index} />)}
    </View>
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
    overflow: 'hidden',
  },
  bar: {
    width: '10%',
    backgroundColor: Colors.primary1,
    position: 'relative',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
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
