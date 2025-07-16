import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        Alert.alert('Login failed', error.message);
      }
    } catch (e) {
      Alert.alert('Login error', `${e}`);
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../../../assets/bg.jpg')}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SafeAreaView edges={['top']} className="flex-1 px-6">
            <View className="h-fit grow items-center justify-center">
              <Image
                source={require('../../../assets/logo-circle-zero.png')}
                className="mx-auto h-44 w-44 rounded-full border-[6px] border-white"
                resizeMode="contain"
              />
            </View>
            <View className="bg-light-green-bg w-screen rounded-3xl p-6 pb-12">
              <Text className="text-text-green pb-10 pt-4 text-center text-3xl font-bold">
                Log In
              </Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="mb-4 rounded-2xl bg-white px-6 py-6 text-xl"
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="mb-4 rounded-2xl bg-white px-6 py-6 text-xl"
              />
              <TouchableOpacity onPress={handleLogin} className="bg-primary mb-6 rounded-2xl py-6">
                <Text className="text-center text-xl font-bold text-white">Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-center text-lg text-gray-600">
                  Don’t have an account? <Text className="text-primary font-bold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
