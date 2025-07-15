import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const { error } = await signUp(email, password);
    if (error) {
      Alert.alert('Sign-up failed', error.message);
    } else {
      Alert.alert('Success', 'Check your email to verify your account.');
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <SafeAreaView edges={['top']} className="flex-1 justify-center bg-white px-6">
        <Text className="mb-8 text-center text-2xl font-bold">Create Account</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="mb-4 rounded-lg border border-gray-300 px-4 py-2"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="mb-6 rounded-lg border border-gray-300 px-4 py-2"
        />
        <TouchableOpacity onPress={handleSignup} className="mb-4 rounded-lg bg-green-500 py-3">
          <Text className="text-center font-medium text-white">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-center text-gray-600">
            Already have an account? <Text className="text-green-500">Log In</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
