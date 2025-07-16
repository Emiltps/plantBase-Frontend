import React from 'react';
import { TextInput, Text, View } from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function PlantTextInput({ label, value, onChangeText }: Props) {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="mb-4 rounded-2xl bg-gray-200 px-6 py-6 text-xl"
        placeholder={label}
      />
    </View>
  );
}
