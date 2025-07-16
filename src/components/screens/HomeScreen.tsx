import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllPlants } from '../../../api/plants';
import PlantPreviewCard from '../PlantPreviewCard';
import { useNavigation } from '@react-navigation/native';
import getUserPlants from '../../../api/MyPlantsApi';
import { supabase } from '../../../api/supabaseClient';

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

  const navigation = useNavigation() as any;

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
    <SafeAreaView className="flex-1 bg-lime-50">
      <View className="px-4 py-6">
        <Text className="mb-2 text-xl font-semibold">Welcome back! 🌿</Text>
        <Text className="text-md text-gray-600">
          You have {plants.length} plant{plants.length === 1 ? '' : 's'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddPlant')}
        className="mb-5 mr-4 self-end rounded bg-lime-200 px-4 py-2">
        <Text className="text-lg font-semibold text-green-800">＋ Add</Text>
      </TouchableOpacity>

      <FlatList
        data={plants}
        keyExtractor={(item) => item.plant_id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => <PlantPreviewCard plant={item} />}
      />
    </SafeAreaView>
  );
}
