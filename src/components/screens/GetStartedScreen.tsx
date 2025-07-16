import React from 'react';
import { StatusBar, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function GetStartedScreen() {
  const navigation = useNavigation<any>();

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../../assets/bg.jpg')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SafeAreaView className="flex-1 items-center justify-center">
          <Image
            source={require('../../../assets/logo-circle-zero.png')}
            className="mb-12 h-64 w-64 rounded-full border-[10px] border-white"
            resizeMode="contain"
          />
        </SafeAreaView>
        <View className="bg-light-green-bg absolute bottom-0 left-0 right-0 m-4 mb-8 items-center rounded-[24px] p-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="bg-primary mb-0 mb-4 w-full rounded-2xl py-6">
            <Text className="text-center text-xl font-semibold text-white">Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="border-primary w-full rounded-2xl border border-2">
            <Text className="text-primary p-5 text-center text-lg font-semibold">Log In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}
