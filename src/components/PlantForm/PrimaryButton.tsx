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
      className={`mb-6 flex-row items-center items-center justify-center rounded-2xl bg-primary py-6 ${disabled ? 'opacity-50' : ''}`}>
      <Text className="font-large text-xl font-bold text-white">{label}</Text>
    </TouchableOpacity>
  );
}
