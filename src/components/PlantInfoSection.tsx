import React from 'react';
import { View, Text } from 'react-native';

const PlantInfoSection = ({ plant }) => {
  return (
    <View className="mb-4">
      <Text className="text-2xl font-bold text-green-800 mb-1">Name:{ plant.nickname}</Text>
            <Text className="text-base text-gray-700 mb-2 italic">Status:{ plant.status}</Text>
      <Text className="text-base text-gray-700 mb-2 italic">Created at:{ plant.created_at}</Text>
      {plant.profile_description && (
        <Text className="text-sm text-gray-600">Description:{ plant.profile_description}</Text>
      )}
            {plant.notes && (
        <Text className="text-sm text-gray-600">Notes:{ plant.notes}</Text>
      )}
    </View>
  );
};

export default PlantInfoSection;