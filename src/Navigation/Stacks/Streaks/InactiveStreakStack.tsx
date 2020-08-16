import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../../../Screens/Streaks/DashboardScreen';
import InactiveStreaksScreen from '../../../Screens/Streaks/InactiveStreaksScreen';


const Stack = createStackNavigator();

const InactiveStreakStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
	name='ActiveStreaksScreen'
	component={InactiveStreaksScreen}
      />
      <Stack.Screen
	name='DashboardScreen'
	component={DashboardScreen}
      />
    </Stack.Navigator>
  );
};

export default InactiveStreakStack;
