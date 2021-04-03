// * Optimized
import React from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens/Stacks/Tabs
import StartupScreen from '../Screens/StartupScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import ArchiveScreen from '../Screens/ArchiveScreen';
import HomeStack from './Stacks/HomeStack';
import StreakTabs from './Tabs/StreakTabs';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

// Style
import { Colors } from '../constants/default-styles';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DesclrNavigator: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator
          drawerType='back'
          overlayColor='transparent'
          drawerStyle={{
            width: 150,
            backgroundColor: Colors.primary1,
          }}
          drawerContentOptions={{
            // activeBackgroundColor: 'white',
            activeTintColor: Colors.accent1,
            inactiveTintColor: Colors.text,
            labelStyle: {
              fontFamily: 'montserrat-bold',
              color: 'white',
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
