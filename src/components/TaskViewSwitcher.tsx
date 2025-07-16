import React from 'react';
import { View, Text, Pressable } from 'react-native';

type ViewOption = 'today' | 'thisWeek';

type Props = {
  selected: ViewOption;
  onSelect: (view: ViewOption) => void;
};

const options: { key: ViewOption; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'thisWeek', label: 'This Week' },
];

export default function TaskViewSwitcher({ selected, onSelect }: Props) {
  return (
    <View className="flex-row items-center justify-center">
      {options.map((opt) => (
        <Pressable
          key={opt.key}
          onPress={() => onSelect(opt.key)}
          className={`rounded-full px-6 py-4 ${
            selected === opt.key ? 'bg-lime-600' : 'bg-transparent'
          }`}>
          <Text
            className={`text-lg font-medium ${selected === opt.key ? 'text-white' : 'text-lime-700'}`}>
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
