import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { getAllPlants } from '../../../api/plants';

export default function HomeScreen() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const data = await getAllPlants();
        setPlants(data);
      } catch (err) {
        console.log('error fetching plants', err);
      }
    }
    fetchPlants();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-lime-50">
      <View className="px-4 py-6">
        <Text className="mb-2 text-xl font-semibold">Welcome back!</Text>
        <Text className="text-md text-gray-600">You have {plants.length} plant(s)</Text>
      </View>
    </SafeAreaView>
  );
}
