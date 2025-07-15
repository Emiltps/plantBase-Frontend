import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlantInfoSection from '../PlantInfoSection';
import PlantImageDisplay from '../PlantImageDisplay'

const PlantDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { plant } = route.params;

  return (
    <ScrollView className="flex-1 bg-white">
         <PlantImageDisplay imageUrl={plant.imageUrl} />

      <View className="px-4 py-6">
        <PlantInfoSection plant={plant} />

        <TouchableOpacity
          onPress={() => navigation.navigate('EditPlant', { plant })}
          className="bg-green-600 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-base">Edit Plant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditSchedule', { plantId: plant.id })}
          className="bg-emerald-500 py-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-base">Add / Edit Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('UpcomingTasks', { plantId: plant.id })}
          className="bg-lime-500 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-base">Upcoming Tasks</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PlantDetailScreen;
