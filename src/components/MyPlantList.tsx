import React from 'react';
import { FlatList } from 'react-native';
import MyPlantCard from './MyPlantCard';

interface MyPlantListProps {
  plants: any[];
}

const MyPlantList: React.FunctionComponent<MyPlantListProps> = ({ plants }) => (
  <FlatList
    data={plants}
    renderItem={({ item }) => <MyPlantCard plant={item} />}
    keyExtractor={(item) => item.id}
  />
);

export default MyPlantList;
