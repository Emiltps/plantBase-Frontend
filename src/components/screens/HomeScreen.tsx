import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlantPreviewCard from '../PlantPreviewCard';
import { useNavigation } from '@react-navigation/native';
import getUserPlants from '../../../api/MyPlantsApi';
import { supabase } from '../../../api/supabaseClient';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

type Plant = {
  plant_id: number;
  nickname: string;
  profile_description: string;
  photo_url?: string;
  owner_id: string;
  plant_type_id: string;
  notes?: string;
  status: string;
  created_at: string;
  died_at: string | null;
};

export default function HomeScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);

  const { user } = useAuth();
  const navigation = useNavigation() as any;
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';
  const todayFormatted = format(new Date(), "'Today is' EEEE, do 'of' MMMM");

  useEffect(() => {
    async function fetchPlants() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user) {
          console.error('Error fetching user:', error);
          return;
        }

        const response = await getUserPlants(user.id);
        setPlants(response.data.plants);
      } catch (err) {
        console.log('error fetching plants', err);
      }
    }
    fetchPlants();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="m-4 rounded-[25px] bg-green-bg px-4 py-10">
        <Text className="mb-2 text-center text-4xl font-bold text-primary">Hi, {firstName}!</Text>
        <Text className="text-center text-xl font-semibold text-text-main">{todayFormatted}</Text>
      </View>
      <View className="mb-4 flex-row items-center justify-between px-4">
        <Text className="ml-2 text-2xl font-semibold text-text-main">Your Plants</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddPlant')}
          className="flex-row items-center rounded-3xl bg-primary px-10 py-4">
          <Ionicons name="add-outline" size={20} color="#ffffffff" />
          <Text className="ml-2 text-xl font-semibold text-white">Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.plant_id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => <PlantPreviewCard plant={item} />}
      />
    </SafeAreaView>
  );
}
