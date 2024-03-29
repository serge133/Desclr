import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/UI/Header';
import { DrawerActions, DrawerActionType } from '@react-navigation/native';
import Button from '../components/UI/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

interface Props {
  navigation: {
    dispatch: (action: DrawerActionType) => void;
  };
}

const SettingsScreen: React.FC<Props> = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Header
        headerLeft={{
          type: 'Ionicons',
          name: 'ios-menu',
          onPress: () =>
            props.navigation.dispatch(DrawerActions.toggleDrawer()),
        }}
      >
        Setting
      </Header>
      <View style={styles.content}></View>
      <Button style={styles.button} onPress={() => dispatch(logout())}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginBottom: 40,
  },
});

export default SettingsScreen;
