import React, { useState } from 'react';
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
  // Dynamic height for multiline input
  const [inputHeight, setInputHeight] = useState(
    multiline && numberOfLines ? numberOfLines * 24 : 0
  );
  return (
    <View>
      <TextInput
        className="mb-4 rounded-2xl bg-gray-200 px-6 py-6 text-xl"
        placeholder={label}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        onContentSizeChange={(event) => {
          if (multiline) {
            setInputHeight(event.nativeEvent.contentSize.height);
          }
        }}
        style={[
          multiline
            ? { height: Math.max(inputHeight, numberOfLines ? numberOfLines * 24 : 0) }
            : {},
          textInputProps.style,
        ]}
        {...textInputProps}
      />
    </View>
  );
}
