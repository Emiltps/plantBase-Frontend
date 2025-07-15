import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootPlantId = {
  Plant: { plantId: string };
};

interface MyPlantCardProps {
  plant: {
    id: string;
    owner_id: string;
    plant_type_id: string;
    nickname: string;
    profile_description?: string;
    notes?: string;
    status: string;
    created_at: string;
    died_at: string | null;
  };
}

const MyPlantCard: React.FunctionComponent<MyPlantCardProps> = ({ plant }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootPlantId>>();

  const handlePress = () => {
    navigation.navigate('Plant', { plantId: plant.id });
  };

  return (
    <Pressable onPress={handlePress} className="flex-1 rounded-xl bg-lime-50 p-4">
      <Text className="text-lg font-bold">{plant.nickname}</Text>
      {plant.profile_description && (
        <Text className="text-sm text-gray-600">{plant.profile_description}</Text>
      )}
      <Text className="text-xs">Status: {plant.status}</Text>
    </Pressable>
  );
};

export default MyPlantCard;
