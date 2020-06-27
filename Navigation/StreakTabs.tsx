import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActiveStreaksScreen from '../Screens/ActiveStreaksScreen';
import InactiveStreaksScreen from '../Screens/InactiveStreaksScreen';
import { Colors } from '../constants/default-styles';
import RenderIcon from '../components/RenderIcon';

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
        component={ActiveStreaksScreen}
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
        component={InactiveStreaksScreen}
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
