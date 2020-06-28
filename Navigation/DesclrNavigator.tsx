import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StartupScreen from '../Screens/StartupScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { Colors } from '../constants/default-styles';
import SettingsScreen from '../Screens/SettingsScreen';
import HomeStack from './HomeStack';
import ArchiveScreen from '../Screens/ArchiveScreen';
import StreakTabs from './StreakTabs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DesclrNavigator: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator
          drawerType='back'
          overlayColor='transparent'
          // sceneContainerStyle={{
          //   backgroundColor: 'white',
          // }}
          drawerStyle={{
            width: 150,
            backgroundColor: '#efefef',
          }}
          drawerContentOptions={{
            activeBackgroundColor: Colors.primary1,
            activeTintColor: 'white',
            inactiveTintColor: Colors.text,
            labelStyle: {
              fontFamily: 'montserrat-bold',
              fontSize: 16,
            },
          }}
        >
          <Drawer.Screen
            name='HomeScreen'
            component={HomeStack}
            options={{
              title: 'Home',
            }}
          />
          <Drawer.Screen
            name='StreaksScreen'
            component={StreakTabs}
            options={{
              title: 'Streaks',
            }}
          />
          <Drawer.Screen
            name='ArchiveScreen'
            component={ArchiveScreen}
            options={{
              title: 'Archive',
            }}
          />
          <Drawer.Screen
            name='SettingsScreen'
            component={SettingsScreen}
            options={{
              title: 'Settings',
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='StartupScreen' component={StartupScreen} />
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default DesclrNavigator;
