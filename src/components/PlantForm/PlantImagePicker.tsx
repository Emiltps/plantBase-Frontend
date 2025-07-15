import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
};

export default function PlantImagePicker({ imageUri, setImageUri }: Props) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={pickImage}
        className="items-center rounded border border-dashed border-gray-400 p-4">
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="h-24 w-24 rounded" />
        ) : (
          <Text>Add Image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
