import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PlantInfoSection from '../PlantInfoSection';
import PlantImageDisplay from '../PlantImageDisplay';

type PlantType = {
  id?: string;
  owner_id: string;
  plant_type_id: number;
  nickname: string;
  photo_url: string;
  profile_description: string;
  notes?: string;
  status: string;
  created_at: string;
  died_at?: string | null;
};

type RootStackParamList = {
  PlantDetailScreen: { plant: PlantType };
  EditPlant: { plant: PlantType };
  EditScheduleScreen: { plantId?: string };
  UpcomingTasksScreen: { plantId?: string };
};

type PlantDetailScreenRouteProp = RouteProp<RootStackParamList, 'PlantDetailScreen'>;

const mockPlant = {
  owner_id: '12e3f4a5-b6c7-4d89-8e01-23f45c67d890',
  plant_type_id: 4,
  nickname: 'Fernie',
  photo_url:
    'https://www.houseplant.co.uk/cdn/shop/files/Boston_Fern_Green_Moment_Indoor_Tropical_Houseplant.jpg?v=1737121676',
  profile_description: 'A vibrant Boston fern thriving in the living room.',
  notes: 'Needs watering every 3 days.',
  status: 'alive',
  created_at: '2024-05-01T10:30:00Z',
  died_at: null,
};

const PlantDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PlantDetailScreenRouteProp>();

  const plant = route.params?.plant ?? mockPlant;

  return (
    <ScrollView className="flex-1 bg-lime-50">
      <PlantImageDisplay photo_url={plant.photo_url} />

      <View className="px-4 py-6">
        <PlantInfoSection plant={plant} />

        <TouchableOpacity
          onPress={() => navigation.navigate('EditPlant', { plant })}
          className="mb-4 rounded-lg bg-green-600 py-3">
          <Text className="text-center text-base font-semibold text-white">Edit Plant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditScheduleScreen', { plantId: plant.id })}
          className="mb-4 rounded-lg bg-emerald-500 py-3">
          <Text className="text-center text-base font-semibold text-white">
            Add / Edit Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('UpcomingTasksScreen', { plantId: plant.id })}
          className="rounded-lg bg-lime-500 py-3">
          <Text className="text-center text-base font-semibold text-white">Upcoming Tasks</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PlantDetailScreen;
