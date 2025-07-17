import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;
const typeStyles: Record<
  TaskType,
  { icon: IconName; bg: string; color: string; bgColor: string; containerBg: string }
> = {
  water: {
    icon: 'water',
    bg: 'bg-blue-200',
    color: '#2196F3',
    bgColor: '#BBDEFB',
    containerBg: '#E3F2FD',
  },
  fertilise: {
    icon: 'flower-tulip',
    bg: 'bg-yellow-200',
    color: '#FBC02D',
    bgColor: '#FFF9C4',
    containerBg: '#FFFDE7',
  },
  prune: {
    icon: 'scissors-cutting',
    bg: 'bg-purple-200',
    color: '#9C27B0',
    bgColor: '#E1BEE7',
    containerBg: '#F3E5F5',
  },
  other: {
    icon: 'help-circle',
    bg: 'bg-gray-200',
    color: '#757575',
    bgColor: '#CFD8DC',
    containerBg: '#FAFAFA',
  },
};

export default function TaskTypeDropdown({ selectedType, onTypeSelect }: Props) {
  return (
    <View className="mb-4 flex-row flex-wrap justify-between">
      {taskTypes.map((type) => (
        <TouchableOpacity
          key={type.id}
          onPress={() => onTypeSelect(type.id)}
          className="border-input-border mb-2 w-[49%] flex-row items-center rounded-full border p-2"
          style={
            selectedType === type.id
              ? { backgroundColor: typeStyles[type.id].containerBg, borderColor: '#fff' }
              : undefined
          }>
          <View
            className="mr-3 rounded-full p-4"
            style={{ backgroundColor: typeStyles[type.id].bgColor }}>
            <MaterialCommunityIcons
              name={typeStyles[type.id].icon}
              size={28}
              color={typeStyles[type.id].color}
            />
          </View>
          <Text className="text-base">{type.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
