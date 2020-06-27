import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import AddingHabitScreen from '../Screens/HomeScreen/AddingHabitScreen';
import EditingHabitScreen from '../Screens/HomeScreen/EditingHabitScreen';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='AddingHabitScreen' component={AddingHabitScreen} />
      <Stack.Screen name='EditingHabitScreen' component={EditingHabitScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
