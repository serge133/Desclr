import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';

interface Props {
  navigation: {
    navigate: Function;
  };
}

const WelcomeScreen: React.FC<Props> = (props) => {
  const handleGetIn = () => {
    return props.navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.screen}>
      <Header>Desclr</Header>
      <View style={styles.content}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <Button
        onPress={handleGetIn}
        type='colorful'
        style={styles.button}
        icon={{ type: 'AntDesign', name: 'arrowright', size: 16 }}
      >
        Get In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 130,
    height: 130,
  },
  button: {
    marginBottom: 40,
  },
});

export default WelcomeScreen;
