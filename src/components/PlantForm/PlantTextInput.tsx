import React from 'react';
import { TextInput, Text, View } from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function PlantTextInput({ label, value, onChangeText }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-base">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="rounded-lg border border-gray-300 p-2"
      />
    </View>
  );
}
