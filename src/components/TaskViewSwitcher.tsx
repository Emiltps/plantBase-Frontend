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
    <View className="mx-4 my-2 flex-row rounded-3xl bg-green-bg p-2">
      {options.map((opt) => (
        <Pressable
          key={opt.key}
          onPress={() => onSelect(opt.key)}
          className={`w-half flex-1 rounded-2xl px-4 py-4 ${
            selected === opt.key ? 'bg-primary' : 'bg-transparent'
          }`}>
          <Text
            className={`text-center text-lg font-medium ${
              selected === opt.key ? 'text-white' : 'text-text-main'
            }`}>
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
