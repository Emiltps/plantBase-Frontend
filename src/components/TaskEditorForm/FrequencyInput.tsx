import React from 'react';
import { View, Text, TextInput } from 'react-native';

type Props = {
  frequency: string;
  setFrequency: (val: string) => void;
};

export default function FrequencyInput({ frequency, setFrequency }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-base">Frequency (days)</Text>
      <TextInput
        value={frequency}
        onChangeText={setFrequency}
        keyboardType="numeric"
        placeholder="e.g. 3"
        className="rounded-lg border border-gray-300 p-2"
      />
    </View>
  );
}
