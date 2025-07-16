import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
import HomeStackNav from '../navigation/HomeStackNav';
import UpcomingStackNav from '../navigation/UpcomingStackNav';
import UpcomingTasksScreen from '../screens/UpcomingTasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          marginHorizontal: 16,
          marginBottom: 8,
          backgroundColor: '#ffffff',
          borderWidth: 2,
          borderColor: 'gray',
          shadowColor: 'transparent',
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          borderTopWidth: 2,
          borderRadius: 16,
          height: 72,
          paddingTop: 8,
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Tasks':
              iconName = 'bookmark-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            default:
              iconName = 'help';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}>
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      {/* <Tab.Screen name="Tasks" component={UpcomingTasksScreen} /> */}
      <Tab.Screen name="Home" component={HomeStackNav} />
      <Tab.Screen name="Tasks" component={UpcomingStackNav} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
