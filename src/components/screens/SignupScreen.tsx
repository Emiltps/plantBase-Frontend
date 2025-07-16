import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignup = async () => {
    const { error } = await signUp(email, password, fullName);
    if (error) {
      Alert.alert('Sign-up failed', error.message);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
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
              {/* Logo */}
              <View className="h-fit grow items-center justify-center">
                <Image
                  source={require('../../../assets/logo-circle-zero.png')}
                  className="mx-auto h-44 w-44 rounded-full border-[6px] border-white"
                  resizeMode="contain"
                />
              </View>
              {/* Form */}
              <View className="bg-light-green-bg w-screen rounded-3xl p-6 pb-12">
                <Text className="text-text-green pb-10 pt-4 text-center text-3xl font-bold">
                  Create Account
                </Text>
                <TextInput
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  className="mb-4 rounded-2xl bg-white px-6 py-6 text-xl"
                />
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
                  className="mb-6 rounded-2xl bg-white px-6 py-6 text-xl"
                />
                <TouchableOpacity
                  onPress={handleSignup}
                  className="bg-primary mb-6 rounded-2xl py-6">
                  <Text className="text-center text-xl font-bold text-white">Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text className="text-center text-lg text-gray-600">
                    Already have an account? <Text className="text-primary font-bold">Log In</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </>
  );
}
