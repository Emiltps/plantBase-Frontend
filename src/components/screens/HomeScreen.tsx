import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllPlants } from '../../../api/plants';
import PlantPreviewCard from '../PlantPreviewCard';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

type Plant = {
  plant_id: number;
  nickname: string;
  profile_description: string;
  photo_url: string;
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
        const data = await getAllPlants();
        setPlants(data);
      } catch (err) {
        console.log('error fetching plants', err);
      }
    }
    fetchPlants();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-lime-50">
      <View className="px-4 py-6">
        <Text className="mb-2 text-xl font-semibold">Welcome back, {firstName || 'there'}! 🌿</Text>
        <Text className="mt-1 text-gray-600">{todayFormatted}</Text>
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
