import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNav from '../navigation/HomeStackNav';
import UpcomingStackNav from '../navigation/UpcomingStackNav';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View className="absolute bottom-10 h-auto flex-row self-center rounded-full border border-gray-200 bg-white p-2 shadow-md">
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        let iconName: string;
        switch (route.name) {
          case 'Home':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          case 'Tasks':
            iconName = isFocused ? 'bookmark' : 'bookmark-outline';
            break;
          case 'Profile':
            iconName = isFocused ? 'person' : 'person-outline';
            break;
          default:
            iconName = isFocused ? 'help-circle' : 'help-circle-outline';
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className={` aspect-square h-20 items-center justify-center ${isFocused ? 'rounded-full bg-green-bg' : ''}`}>
            <Ionicons name={iconName as any} size={24} color={isFocused ? '#4b8457' : 'gray'} />
            <Text
              className={`mt-1 text-xs font-bold ${isFocused ? 'text-primary' : 'text-gray-500'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStackNav} />
      <Tab.Screen name="Tasks" component={UpcomingStackNav} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
