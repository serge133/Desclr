import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/UI/Header';
import { DrawerActionType } from '@react-navigation/native';
import BarGraph from '../../components/UI/BarGraph';
import Dropdown from '../../components/UI/Dropdown';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
    goBack: () => void;
  };
}

const DashboardScreen: React.FC<Props> = props => {
  //  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'AntDesign',
          name: 'arrowleft',
          onPress: () => props.navigation.goBack(),
        }}
      >
        Trends
      </Header>
      <View style={styles.content}>
        <BarGraph data={[0.3, 0.4, 0.5, 0.6, 5]} />
        <Dropdown
          chosenEntry='Minutes Needed/Max Minutes'
          entries={[
            { index: 0, label: 'Minutes Needed/Max Minutes' },
            { index: 1, label: 'Procrastination' },
          ]}
          onEntryPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 8,
  },
});

export default DashboardScreen;
