import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/Home/HomeScreen';
import AddingHabitScreen from '../../Screens/Home/AddingHabitScreen';
import EditingHabitScreen from '../../Screens/Home/EditingHabitScreen';
import Timer from '../../Screens/TimerScreen';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen
        name='TimerScreen'
        component={Timer}
        // One Hour
        // initialParams={{ milliseconds: 7260000 }}
      />
      <Stack.Screen name='AddingHabitScreen' component={AddingHabitScreen} />
      <Stack.Screen name='EditingHabitScreen' component={EditingHabitScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
