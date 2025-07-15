import React from 'react';
import { Image, View } from 'react-native';

const PlantImageDisplay = ({ photo_url }: { photo_url: string }) => {
  return (
    
    <View className="w-full h-64 bg-lime-100">
      <Image
        source={{ uri: photo_url }}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};

export default PlantImageDisplay;