import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import getPlants from '../api/MyPlantsApi';
import MyPlantList from '../components/MyPlantList';
import MyPlantAddPlantButton from '../components/MyPlantAddPlantButton';

const MyPlantScreen = () => {
  const [myPlants, setMyPlants] = useState([]);
  const fetchPlants = async () => {
    try {
      const userId = '123';
      const res = await getPlants(userId);
      setMyPlants(res.data);
    } catch (error) {
      console.error('Failed to fetch plants', error);
    }
  };
  useEffect(() => {
    fetchPlants();
  }, []);
  return (
    <>
      <ScrollView className="flex-1 bg-lime-50">
        {myPlants.length > 0 ? (
          <MyPlantList plants={myPlants} />
        ) : (
          <Text className="text-base text-gray-500">No plants. Add plants to continue! </Text>
        )}
      </ScrollView>
      <MyPlantAddPlantButton />
    </>
  );
};

export default MyPlantScreen;
