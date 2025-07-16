import React, { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image } from 'react-native';
import { capitalizeWord } from '~/utils/utils';
import { getPlant } from '../../../api/MyPlantsApi';
import { deletePlant } from '../../../api/MyPlantsApi';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const API_BASE = Constants.expoConfig?.extra?.apiBaseUrl || '';

type PlantType = {
  plant_id: number;
  owner_id: string;
  plant_type_id: number;
  nickname: string;
  photo_url?: string;
  profile_description: string;
  notes?: string;
  status: string;
  created_at: string;
  died_at?: string | null;
};

type RootStackParamList = {
  PlantDetailScreen: { plantId: string };
  EditPlantScreen: { plantId: string };
  EditScheduleScreen: { plantId?: string };
  UpcomingTasksScreen: { plantId?: string };
};

type PlantDetailScreenRouteProp = RouteProp<RootStackParamList, 'PlantDetailScreen'>;

const PlantDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PlantDetailScreenRouteProp>();

  const { plantId } = route.params;
  const [plant, setPlant] = useState<PlantType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlantDetail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPlant(plantId);
      setPlant(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [plantId]);

  useEffect(() => {
    fetchPlantDetail();
  }, [fetchPlantDetail]);

  useFocusEffect(
    useCallback(() => {
      fetchPlantDetail();
    }, [fetchPlantDetail])
  );

  const handleDelete = async () => {
    try {
      await deletePlant(plant!.plant_id.toString());
      Alert.alert('Deleted', 'Plant deleted successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.msg || 'Failed to delete plant');
    }
  };

  if (loading || !plant) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={50} color="#4b8457" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Image and Info */}
      <View className="mx-4 flex-row rounded-3xl bg-green-bg p-2">
        {/* Image */}
        <View className="relative" style={{ flex: 6.5 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditPlantScreen', { plantId: plant.plant_id.toString() })
            }
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
          onPress={() =>
            navigation.navigate('EditScheduleScreen', { plantId: plant.plant_id.toString() })
          }
          className="mr-2 aspect-square h-[64px] items-center justify-center rounded-2xl bg-primary">
          <FontAwesome6 name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UpcomingTasksScreen', { plantId: plant.plant_id.toString() })
          }
          className="flex-1 items-center justify-center rounded-2xl bg-primary py-5">
          <Text className="text-lg font-semibold text-white">View Care Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View className="mt-4 rounded-t-3xl bg-white px-4 pt-6">
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

      {/* Delete Button */}
      <View className="mb-12 px-4">
        <TouchableOpacity
          onPress={handleDelete}
          className="flex-row items-center justify-center rounded-2xl bg-red-light px-4 py-4 py-6">
          <MaterialIcons name="delete-outline" size={24} color="#b01d3e" />
          <Text className="ml-2 text-lg font-bold text-red-main">Delete Plant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PlantDetailScreen;
