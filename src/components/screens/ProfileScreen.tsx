import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-lime-50 px-4">
      <Text className="mb-4 text-3xl font-medium text-gray-700">Profile</Text>
      {user ? (
        <View className="items-center space-y-2">
          <Text className="text-lg">Email: {user.email}</Text>
          <Text className="text-lg">User ID: {user.id}</Text>
          <TouchableOpacity
            onPress={() => signOut()}
            className="mt-6 rounded-lg bg-red-500 px-4 py-2">
            <Text className="text-center font-medium text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text className="text-lg text-gray-600">No user data available.</Text>
      )}
    </SafeAreaView>
  );
}
