import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlantInfoSection from '../PlantInfoSection';
import PlantImageDisplay from '../PlantImageDisplay'

const mockPlant = 
  {
    owner_id: "12e3f4a5-b6c7-4d89-8e01-23f45c67d890",
    plant_type_id: 4,
    nickname: "Fernie",
    photo_url: "https://www.houseplant.co.uk/cdn/shop/files/Boston_Fern_Green_Moment_Indoor_Tropical_Houseplant.jpg?v=1737121676",
    profile_description: "A vibrant Boston fern thriving in the living room.",
    notes: "Needs watering every 3 days.",
    status: "alive",
    created_at: "2024-05-01T10:30:00Z",
    died_at: null,
  };

const PlantDetailScreen = () => {
  const navigation = useNavigation();
  const  plant  = mockPlant//route.params;

  return (
    <ScrollView className="flex-1 bg-white">
         <PlantImageDisplay photo_url={plant.photo_url} />

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
