import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//// import AddingHabitScreen from '../../Screens/Home/AddingHabitScreen';
import AddingScreen from '../../../Screens/Home/Adding/AddingScreen';
import AddingHabitScreen from '../../../Screens/Home/Adding/AddingHabitScreen';
import PersonalizeHabitScreen from '../../../Screens/Home/Adding/PersonalizeHabitScreen';

const Stack = createStackNavigator();

const AddingStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='AddingScreen' component={AddingScreen} />
      <Stack.Screen
        name='PersonalizeHabitScreen'
        component={PersonalizeHabitScreen}
      />
      <Stack.Screen name='AddingHabitScreen' component={AddingHabitScreen} />
    </Stack.Navigator>
  );
};

export default AddingStack;
