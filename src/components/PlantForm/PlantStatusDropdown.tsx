import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  selectedStatus: string;
  onStatusSelect: (id: string) => void;
};

const dummyStatuses = [
  { id: 'ALIVE', name: 'Alive' },
  { id: 'INFECTED', name: 'Infected' },
  { id: 'DEAD', name: 'Dead' },
];

export default function PlantStatusDropdown({ selectedStatus, onStatusSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? 'mb-0 rounded-s-2xl' : 'mb-4 rounded-2xl'} flex-row items-center justify-between bg-gray-200 px-6 py-6`}>
        <Text className="text-xl text-gray-600">
          {dummyStatuses.find((s) => s.id === selectedStatus)?.name ?? 'Select status'}
        </Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#6B7280" />
      </TouchableOpacity>

      {isOpen && (
        <View className={`${isOpen ? '' : ''} mb-4 rounded-e-2xl bg-gray-100`}>
          {dummyStatuses.map((status) => (
            <TouchableOpacity
              key={status.id}
              onPress={() => {
                onStatusSelect(status.id);
                setIsOpen(false);
              }}
              className={`rounded-2xl border-t border-white px-4 py-6 ${
                selectedStatus === status.id ? 'bg-gray-200' : ''
              }`}>
              <Text
                className={`ml-2 text-lg ${
                  selectedStatus === status.id ? 'font-semibold text-primary' : 'text-text-main'
                }`}>
                {status.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
