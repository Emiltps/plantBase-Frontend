import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type TaskType = 'water' | 'fertilise' | 'prune' | 'other';

type Props = {
  selectedType: TaskType;
  onTypeSelect: (id: TaskType) => void;
};

const taskTypes: { id: TaskType; name: string }[] = [
  { id: 'water', name: 'Water' },
  { id: 'prune', name: 'Prune' },
  { id: 'fertilise', name: 'Fertilise' },
  { id: 'other', name: 'Other' },
];

export default function TaskTypeDropdown({ selectedType, onTypeSelect }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-base">Task Type</Text>
      {taskTypes.map((type) => (
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
