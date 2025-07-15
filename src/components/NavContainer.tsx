import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
};

export default function NavContainer({ children }: Props) {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <ImageBackground source={require('../../assets/bg.jpg')} style={styles.background}>
        <SafeAreaView className="flex-1 items-center justify-center">
          <Image
            source={require('../../assets/logo-circle-zero.png')}
            className="mb-12 h-64 w-64 rounded-full border-[10px] border-white"
            resizeMode="contain"
          />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return <NavigationContainer>{children}</NavigationContainer>;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
