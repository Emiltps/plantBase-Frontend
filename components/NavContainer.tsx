import React from 'react';
import { Text, View, Image } from 'react-native';

export const NavContainer = () => {
  return (
    <View className="flex-1 justify-center bg-lime-50">
      <View className="items-center justify-center">
        <Image source={require('../assets/plantBase_logo_v2.png')} className="h-1/2 w-1/2"></Image>
      </View>
    </View>
  );
};
