import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? 'mb-0 rounded-s-2xl' : 'mb-4 rounded-2xl'} flex-row items-center justify-between bg-gray-200 px-6 py-6`}>
        <Text className="text-xl text-gray-600">
          {dummyPlantTypes.find((t) => t.id === selectedType)?.name ?? 'Select type'}
        </Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#6B7280" />
      </TouchableOpacity>

      {isOpen && (
        <View className={`${isOpen ? '' : ''} mb-4 rounded-e-2xl bg-gray-100`}>
          {dummyPlantTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => {
                onTypeSelect(type.id);
                setIsOpen(false);
              }}
              className={`${selectedType === type.id ? 'bg-gray-200' : ''} rounded-2xl border-t border-white px-4 py-6`}>
              <Text
                className={`ml-2 text-lg ${selectedType === type.id ? 'font-semibold text-primary' : 'text-text-main'}`}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
