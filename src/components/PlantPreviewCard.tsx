import React from 'react';
import { View, Text, Image } from 'react-native';

type Props = {
  nickname: string;
  profile_description: string;
  photo_url?: string;
};

export default function PlantPreviewCard({ nickname, profile_description, photo_url }: Props) {
  return (
    <View className="mb-3 rounded-lg bg-white p-4 shadow-sm">
      {photo_url ? (
        <Image source={{ uri: photo_url }} className="mb-2 h-32 w-full rounded-md" />
      ) : null}

      <Text className="text-lg font-semibold text-green-800">{nickname}</Text>
      <Text className="text-sm text-gray-600">{profile_description}</Text>
    </View>
  );
}
