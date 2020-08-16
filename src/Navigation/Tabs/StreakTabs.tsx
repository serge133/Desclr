import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../constants/default-styles';
import RenderIcon from '../../components/UI/RenderIcon';
import ActiveStreakStack from '../Stacks/Streaks/ActiveStreakStack';
import InactiveStreakStack from '../Stacks/Streaks/InactiveStreakStack';

const Tab = createBottomTabNavigator();

const StreakTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary1,
        inactiveTintColor: Colors.text,
        labelStyle: {
          fontFamily: 'montserrat-bold',
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name='ActiveStreaks'
        component={ActiveStreakStack}
        options={{
          title: 'Active',
          tabBarIcon: ({ color }) => (
            <RenderIcon
              type='AntDesign'
              name='clockcircleo'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='InactiveStreaks'
        component={InactiveStreakStack}
        options={{
          title: 'Inactive',
          tabBarIcon: ({ color }) => (
            <RenderIcon
              type='AntDesign'
              name='pausecircleo'
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StreakTabs;
