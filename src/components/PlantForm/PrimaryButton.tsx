import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export default function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className="mt-2 items-center rounded-lg bg-green-500 py-3">
      <Text className="text-lg font-semibold">{label}</Text>
    </TouchableOpacity>
  );
}
