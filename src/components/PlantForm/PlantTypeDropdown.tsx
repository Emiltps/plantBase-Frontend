import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

type Props = {
  selectedType: string;
  onTypeSelect: (id: string) => void;
};

const dummyPlantTypes = [
  { id: 't1', name: 'Fern' },
  { id: 't2', name: 'Cactus' },
  { id: 't3', name: 'Succulent' },
];

export default function PlantTypeDropdown({ selectedType, onTypeSelect }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-base">Type</Text>
      {dummyPlantTypes.map((type) => (
        <TouchableOpacity
          key={type.id}
          onPress={() => onTypeSelect(type.id)}
          className={`mb-1 rounded border p-2 ${
            selectedType === type.id ? 'bg-green-200' : 'bg-white'
          }`}>
          <Text>{type.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
