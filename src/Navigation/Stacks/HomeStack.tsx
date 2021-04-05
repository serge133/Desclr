import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/Home/HomeScreen';
import EditingHabitScreen from '../../Screens/Home/EditingHabitScreen';
import Timer from '../../Screens/TimerScreen';
//// import AddingHabitScreen from '../../Screens/Home/AddingHabitScreen';

// ! ----- Experimental ------
import AddingOneScreen from '../../Screens/Home/Adding/AddingScreen';
import AddingStack from './Home/AddingStack';
// This is a test
const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='TimerScreen' component={Timer} />
      <Stack.Screen name='AddingScreen' component={AddingStack} />
      <Stack.Screen name='EditingHabitScreen' component={EditingHabitScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
