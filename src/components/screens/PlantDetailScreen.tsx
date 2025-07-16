import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image } from 'react-native';
import { capitalizeWord } from '~/utils/utils';

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
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Image and Info */}
      <View className="mx-4 flex-row rounded-3xl bg-green-bg p-2">
        {/* Image */}
        <View className="relative" style={{ flex: 6.5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditPlant', { plant })}
            className="mb-2 w-full flex-row items-center justify-center rounded-2xl bg-white px-3 py-4">
            <FontAwesome6 name="edit" size={20} color="#4b8457" />
            <Text className="ml-2 text-lg font-semibold text-primary">Edit</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: plant.photo_url }}
            className="content-contain h-64 w-full rounded-2xl bg-gray-200"
            resizeMode="cover"
          />
        </View>
        {/* Stats */}

        <View
          className="ml-2 flex justify-center gap-6 rounded-2xl bg-light-green-bg p-6"
          style={{ flex: 3.5 }}>
          {/* Status */}
          <View>
            <Text className="text-sm font-semibold text-gray-400">Status</Text>
            <Text className="mt-1 text-xl font-bold text-text-green">
              {capitalizeWord(plant.status)}
            </Text>
          </View>
          {/* Created At */}
          <View>
            <Text className="text-sm font-semibold text-gray-400">Created At</Text>
            <Text className="mt-1 text-xl font-bold text-text-green">
              {new Date(plant.created_at).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
                year: '2-digit',
              })}
            </Text>
          </View>
          {/* Type */}
          <View>
            <Text className="text-sm font-semibold text-gray-400">Type</Text>
            <Text className="mt-1 text-xl font-bold text-text-green">{plant.nickname}</Text>
          </View>
        </View>
      </View>

      {/* View Care Schedule */}
      <View className="mt-6 flex-row px-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('EditScheduleScreen', { plantId: plant.id })}
          className="mr-2 aspect-square h-[64px] items-center justify-center rounded-2xl bg-primary">
          <FontAwesome6 name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpcomingTasksScreen', { plantId: plant.id })}
          className="flex-1 items-center justify-center rounded-2xl bg-primary py-5">
          <Text className="text-lg font-semibold text-white">View Care Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View className="mt-4 rounded-t-3xl bg-white px-4 pb-8 pt-6">
        <Text className="mb-5 text-center text-2xl font-semibold text-text-main">
          {plant.nickname}
        </Text>
        {/* Description */}
        <Text className="text-center text-lg text-gray-500">Description</Text>
        <View className="mb-4 mt-3 rounded-3xl bg-light-green-bg p-6">
          <Text className="text-xl text-text-main">{plant.profile_description}</Text>
        </View>
        {/* Notes */}
        <Text className="text-center text-lg text-gray-500">Notes</Text>
        <View className="mb-4 mt-3 rounded-3xl bg-light-green-bg p-6">
          <Text className="text-xl text-text-main">{plant.notes || 'No notes available.'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlantDetailScreen;
