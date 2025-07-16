import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export default function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-6 flex-row items-center items-center justify-center rounded-2xl bg-primary py-6">
      <Text className="font-large text-xl font-bold text-white">{label}</Text>
    </TouchableOpacity>
  );
}
