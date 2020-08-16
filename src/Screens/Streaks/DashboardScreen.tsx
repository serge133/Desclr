import React from 'react';
import { View, StyleSheet} from 'react-native';
import Header from '../../components/UI/Header';
import { DrawerActionType } from '@react-navigation/native';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
    goBack: () => void
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
	    onPress: () => props.navigation.goBack()
        }}
      >
	Track
      </Header>
      <View style={styles.content}>
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
  },
});

export default DashboardScreen;
