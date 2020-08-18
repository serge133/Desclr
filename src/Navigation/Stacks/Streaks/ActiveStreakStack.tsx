import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActiveStreaksScreen from '../../../Screens/Streaks/ActiveStreaksScreen';
import DashboardScreen from '../../../Screens/Streaks/TrendsScreen';

const Stack = createStackNavigator();

const ActiveStreakStack: React.FC = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen
        name='ActiveStreaksScreen'
        component={ActiveStreaksScreen}
      />
      <Stack.Screen name='DashboardScreen' component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default ActiveStreakStack;
