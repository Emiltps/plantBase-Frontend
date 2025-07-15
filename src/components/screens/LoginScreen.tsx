import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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
    <SafeAreaView edges={['top']} className="flex-1 justify-center bg-white px-6">
      <Text className="mb-8 text-center text-2xl font-bold">Welcome Back</Text>
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
      <TouchableOpacity onPress={handleLogin} className="mb-4 rounded-lg bg-green-500 py-3">
        <Text className="text-center font-medium text-white">Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text className="text-center text-gray-600">
          Don’t have an account? <Text className="text-green-500">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
