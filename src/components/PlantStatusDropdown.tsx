import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  selectedStatus: string;
  onStatusSelect: (id: string) => void;
};

const plantStatus = [
  { id: 'alive', name: 'Alive' },
  { id: 'infected', name: 'Infected' },
  { id: 'dead', name: 'Dead' },
];

export default function PlantStatusDropdown({ selectedStatus, onStatusSelect }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-base">Task Type</Text>
      {plantStatus.map((status) => (
        <TouchableOpacity
          key={status.id}
          onPress={() => onStatusSelect(status.id)}
          className={`mb-1 rounded border p-2 ${
            selectedStatus === status.id ? 'bg-green-200' : 'bg-white'
          }`}>
          <Text>{status.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
