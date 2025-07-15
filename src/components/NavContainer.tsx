import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
};

const NavContainer = ({ children }: Props) => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    const clearSplashTimer = () => {
      clearTimeout(timer);
    };

    return clearSplashTimer;
  }, []);

  if (isSplashVisible) {
    return (
      <View className="flex-1 items-center justify-center bg-lime-50">
        <Image
          source={require('../../assets/plantBase_logo_v2-small.png')}
          className="h-auto w-3/4 max-w-[300px] object-contain"
        />
      </View>
    );
  }
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default NavContainer;
