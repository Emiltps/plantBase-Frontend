import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Plant: { plantId: string }; 
};

type Props = {
  plant_id: string;
  nickname: string;
  profile_description: string;
  photo_url?: string;
};

export default function PlantPreviewCard({ plant_id, nickname, profile_description, photo_url }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handlePress = () => {
    navigation.navigate('PlantDetailScreen', { plantId: plant_id });
  };
  return (
     <Pressable onPress={handlePress} className="mb-3 rounded-lg bg-white p-4 shadow-sm">
      {photo_url ? (
        <Image source={{ uri: photo_url }} className="mb-2 h-32 w-full rounded-md" />
      ) : null}

      <Text className="text-lg font-semibold text-green-800">{nickname}</Text>
      <Text className="text-sm text-gray-600">{profile_description}</Text>
    </Pressable>
  );
}
