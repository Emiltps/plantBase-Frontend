import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updatePlant } from '../../../api/MyPlantsApi';
import PlantStatusDropdown from '../PlantStatusDropdown';

type RootStackParamList = {
  EditPlant: { plant: Plant };
};

type EditPlantRouteProp = RouteProp<RootStackParamList, 'EditPlant'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Plant = {
  plant_id: number;
  nickname: string;
  profile_description: string;
  photo_url?: string;
  owner_id: string;
  plant_type_id: string;
  notes?: string;
  status: string;
  created_at: string;
  died_at: string | null;
};

export default function EditPlantScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditPlantRouteProp>();
  const plant = route.params.plant;

  const [nickname, setNickname] = useState(plant.nickname);
  const [notes, setNotes] = useState(plant.notes || '');
  const [status, setStatus] = useState(plant.status);

  const handleSave = async () => {
    try {
      await updatePlant(String(plant.plant_id), { nickname, notes, status });
      Alert.alert('Success', 'Plant updated successfully.');
      navigation.goBack();
    } catch (error: any) {
      console.error('failed to update');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">Edit Plant</Text>

      <Text className="mb-2 font-medium">Nickname</Text>
      <TextInput
        className="mb-4 rounded border border-gray-300 p-2"
        value={nickname}
        onChangeText={setNickname}
      />

      <Text className="mb-2 font-medium">Notes</Text>
      <TextInput
        className="mb-4 rounded border border-gray-300 p-2"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Text className="mb-2 font-medium">Status</Text>
      <PlantStatusDropdown selectedStatus={status} onStatusSelect={setStatus} />

      <TouchableOpacity onPress={handleSave} className="mt-6 rounded-lg bg-green-600 py-3">
        <Text className="text-center text-base font-semibold text-white">Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
