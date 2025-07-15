import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { getProfile } from '../../../api/ProfileApi';
import { supabase } from '../../../api/supabaseClient';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      (async () => {
        setEmail(user.email ?? '');
        setFullName(user.user_metadata?.full_name ?? '');
        setAvatarUrl(user.user_metadata?.avatar_url ?? null);

        setLoading(true);
        try {
          const response = await getProfile(user.id);
          const profile = response.data.profile;
          setUsername(profile.username);
          setAvatarUrl(profile.profile_image);
        } catch (e: any) {
          console.warn('Error fetching profile via API:', e.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const { error: updateUserError } = await supabase.auth.updateUser({
      email,
      data: { full_name: fullName },
    });
    if (updateUserError) {
      setLoading(false);
      return Alert.alert('Update failed', updateUserError.message);
    }

    setLoading(false);
    Alert.alert('Success', 'Your profile has been updated.');
    return;
  };

  if (!user) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-600">No user is logged in.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white px-6 pt-4">
      <Text className="mb-8 mt-6 text-center text-3xl">Your Profile</Text>

      <View className="mb-8 items-center">
        <Image
          source={avatarUrl ? { uri: avatarUrl } : require('../../../assets/dummy_profile.png')}
          className="h-48 w-48 rounded-full"
        />
      </View>

      <Text className="mb-1 text-sm text-gray-700">Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
        className="mb-4 rounded-md border-2 border-gray-300 px-4 py-4 text-lg"
      />

      {/* Username */}
      <Text className="mb-1 text-sm text-gray-700">Username</Text>
      <TextInput
        value={username}
        editable={false}
        placeholder="Choose a username"
        className="mb-4 rounded-md border-2 border-gray-300 bg-gray-100 px-4 py-4 text-lg"
      />

      <Text className="mb-1 text-sm text-gray-700">Email Address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="mb-4 rounded-md border-2 border-gray-300 px-4 py-4 text-lg"
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        className="mb-4 items-center rounded-md bg-green-500 py-4">
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="font-large text-lg font-bold text-white">Save</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => signOut()}
        className="items-center rounded-md border border-red-500 bg-red-600 py-4">
        <Text className="font-large text-lg font-bold text-white">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
