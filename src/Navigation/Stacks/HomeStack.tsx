import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/Home/HomeScreen';
import EditingHabitScreen from '../../Screens/Home/EditingHabitScreen';
import Timer from '../../Screens/TimerScreen';
//// import AddingHabitScreen from '../../Screens/Home/AddingHabitScreen';

// ! ----- Experimental ------
import AddingOneScreen from '../../Screens/Home/Adding/AddingScreen';
import AddingStack from './Home/AddingStack';
import ViewHabitScreen from '../../Screens/Home/ViewHabitScreen';
import HabitSettingsScreen from '../../Screens/Home/HabitSettingsScreen';
// This is a test
const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='AddingScreen' component={AddingStack} />
      <Stack.Screen name='ViewHabitScreen' component={ViewHabitScreen} />
      <Stack.Screen
        name='HabitSettingsScreen'
        component={HabitSettingsScreen}
      />
      <Stack.Screen name='EditingHabitScreen' component={EditingHabitScreen} />
      {/* Not Functional <Stack.Screen name='TimerScreen' component={Timer} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
