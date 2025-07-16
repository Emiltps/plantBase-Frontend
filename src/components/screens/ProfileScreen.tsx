import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { getProfile } from '../../../api/ProfileApi';
import { supabase } from '../../../api/supabaseClient';
import Feather from '@expo/vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={50}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView edges={['top']} className="flex-1 bg-white px-6 pt-4">
          <View className="mb-8 mt-4 items-center">
            <Image
              source={avatarUrl ? { uri: avatarUrl } : require('../../../assets/dummy_profile.png')}
              className="h-48 w-48 rounded-full"
            />
          </View>

          <Text className="text-md mb-2 ml-3 text-gray-500">Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            className="mb-4 rounded-2xl bg-bg px-6 py-6 text-xl"
          />

          {/* Username */}
          <Text className="text-md mb-2 ml-3 text-gray-500">Username</Text>
          <TextInput
            value={username}
            editable={false}
            placeholder="Choose a username"
            className="mb-4 rounded-2xl bg-gray-200 px-6 py-6 text-xl"
          />

          <Text className="text-md mb-2 ml-3 text-gray-500">Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-4 rounded-2xl bg-bg px-6 py-6 text-xl"
          />

          <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            className="mb-6 flex-row items-center items-center justify-center rounded-2xl bg-primary py-6">
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Feather name="save" size={24} color="white" />
                <Text className="font-large ml-2 text-xl font-bold text-white">Save</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => signOut()}
            className="flex-row items-center justify-center rounded-2xl bg-red-light px-4 py-4 py-6">
            <Feather name="log-out" size={24} color="#b01d3e" />
            <Text className="ml-2 text-lg font-bold text-red-main">Log Out</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
