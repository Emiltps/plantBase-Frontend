import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

if (typeof (global as any).structuredClone !== 'function') {
  (global as any).structuredClone = (value: any) => JSON.parse(JSON.stringify(value));
}

const extra =
  (Constants.manifest?.extra as Record<string, string> | undefined) ??
  (Constants.expoConfig?.extra as Record<string, string> | undefined);

const supabaseUrl = extra?.supabaseUrl!;
const supabaseAnonKey = extra?.supabaseAnonKey!;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and ANON key must be defined in expo.extra');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
