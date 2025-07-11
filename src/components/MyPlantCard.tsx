import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  return (
    <View className="flex-1 justify-center rounded-xl bg-lime-50 p-4">
      <Text className="text-lg font-bold">{plant.nickname}</Text>
      {plant.profile_description && (
        <Text className="text-sm text-gray-600">{plant.profile_description}</Text>
      )}
      <Text className="text-xs">Status: {plant.status}</Text>
    </View>
  );
};

export default MyPlantCard;
