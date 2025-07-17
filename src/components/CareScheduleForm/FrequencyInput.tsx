import React from 'react';
import { View, Text, TextInput } from 'react-native';

type Props = {
  frequency: string;
  setFrequency: (val: string) => void;
};

export default function FrequencyInput({ frequency, setFrequency }: Props) {
  return (
    <View>
      <Text className="text-md mb-2 ml-3 text-gray-500">Frequency (days)</Text>
      <TextInput
        value={frequency}
        onChangeText={setFrequency}
        keyboardType="numeric"
        placeholder="e.g. 3"
        className="bg-bg-gray-input border-input-border mb-4 rounded-2xl border px-6 py-6 text-xl"
      />
    </View>
  );
}
