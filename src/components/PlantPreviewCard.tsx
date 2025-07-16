import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PlantType = {
  plant_id: number;
  nickname: string;
  profile_description: string;
  photo_url?: string;
  owner_id: string;
  plant_type_id: number;
  notes?: string;
  status: string;
  created_at: string;
  died_at: string | null;
};

type RootStackParamList = {
  PlantDetailScreen: { plant: PlantType };
};
type Props = {
  plant: PlantType;
};

export default function PlantPreviewCard({ plant }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate('PlantDetailScreen', { plant });
  };
  return (
    <Pressable
      onPress={handlePress}
      className="mb-3 flex-row items-center justify-between rounded-3xl border border-gray-200 bg-white p-3">
      {plant.photo_url ? (
        <Image
          source={{ uri: plant.photo_url }}
          className="mr-4 h-32 w-32 rounded-xl border border-gray-100 bg-green-100"
        />
      ) : (
        <View className="mr-4 h-20 w-20 rounded-md bg-green-100" />
      )}

      <View className="mr-4 flex-1">
        <Text className="mb-1 text-xl font-bold text-text-main">{plant.nickname}</Text>
        <Text className="text-md text-text-green">{plant.profile_description}</Text>
      </View>

      <View className="h-32 w-16 items-center justify-center rounded-lg bg-light-green-bg">
        <Ionicons name="chevron-forward" size={24} color="#306739" />
      </View>
    </Pressable>
  );
}
