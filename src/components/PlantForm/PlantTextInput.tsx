import React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label: string;
  multiline?: boolean;
  numberOfLines?: number;
};

export default function PlantTextInput({
  label,
  multiline,
  numberOfLines,
  ...textInputProps
}: Props) {
  return (
    <View>
      <TextInput
        className="mb-4 rounded-2xl bg-gray-200 px-6 py-6 text-xl"
        placeholder={label}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        style={multiline && numberOfLines ? { height: numberOfLines * 24 } : undefined}
        {...textInputProps}
      />
    </View>
  );
}
