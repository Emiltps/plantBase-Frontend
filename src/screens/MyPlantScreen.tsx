import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import getPlants from '../api/MyPlantsApi';
import MyPlantCard from '../components/MyPlantCard';

export const MyPlantScreen = () => {
  const [myPlants, setMyPlants] = useState([]);
};
useEffect(() => {
  getPlants();
}, []);
