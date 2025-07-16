import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PlantType = {
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
    <Pressable onPress={handlePress} className="mb-3 rounded-lg bg-white p-4 shadow-sm">
      {plant.photo_url ? (
        <Image source={{ uri: plant.photo_url }} className="mb-2 h-32 w-full rounded-md" />
      ) : null}

      <Text className="text-lg font-semibold text-green-800">{plant.nickname}</Text>
      <Text className="text-sm text-gray-600">{plant.profile_description}</Text>
    </Pressable>
  );
}
