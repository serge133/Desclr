import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { Colors } from '../constants/default-styles';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/actions/auth';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const StartupScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('WelcomeScreen');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;
      const formattedExpirationDate = new Date(expirationDate);

      if (formattedExpirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('WelcomeScreen');
        return;
      }

      dispatch(authenticate(token, userId));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator color={Colors.primary1} size='large' />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
