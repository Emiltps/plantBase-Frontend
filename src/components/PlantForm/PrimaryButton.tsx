import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ label, onPress, disabled }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full items-center justify-center rounded-lg bg-green-600 py-3 ${disabled ? 'opacity-50' : ''}`}>
      <Text className="text-base font-semibold text-white">{label}</Text>
    </TouchableOpacity>
  );
}
