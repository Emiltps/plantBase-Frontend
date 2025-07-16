import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import PlantTextInput from '../PlantForm/PlantTextInput';
import PlantTypeDropdown from '../PlantForm/PlantTypeDropdown';
import PlantImagePicker from '../PlantForm/PlantImagePicker';
import PrimaryButton from '../PlantForm/PrimaryButton';
import { useAuth } from '../../contexts/AuthContext';
import { createPlant } from '../../../api/MyPlantsApi';
import { useNavigation } from '@react-navigation/native';

export default function AddPlantScreen() {
  const { user } = useAuth();
  const navigation = useNavigation() as any;

  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [plantTypeId, setPlantTypeId] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    const plantTypeIdNumber = parseInt(plantTypeId, 10);
    if (!nickname || !plantTypeId || isNaN(plantTypeIdNumber)) {
      Alert.alert('Please enter a name and select a valid plant type');
      return;
    }

    const plantData = {
      nickname,
      plant_type_id: plantTypeIdNumber,
      profile_description: description,
      notes,
      photo_url: imageUri ?? '',
      status: 'alive',
      died_at: null,
    };

    try {
      const newPlant = await createPlant(plantData);
      Alert.alert('Success', `Plant ${newPlant.nickname} added!`);
      navigation.navigate('HomeMain', { newPlant });
    } catch (err: any) {
      Alert.alert('Error', 'Failed to create plant');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4" contentContainerStyle={{ paddingBottom: 132 }}>
      <Text className="mb-4 text-2xl font-bold">Add Plant</Text>

      <PlantTextInput label="Plant Name" value={nickname} onChangeText={setNickname} />
      <PlantTypeDropdown selectedType={plantTypeId} onTypeSelect={setPlantTypeId} />
      <PlantTextInput label="Description" value={description} onChangeText={setDescription} />
      <PlantTextInput label="Note" value={notes} onChangeText={setNotes} />
      <PlantImagePicker imageUri={imageUri} setImageUri={setImageUri} />
      <PrimaryButton label="Add" onPress={handleSubmit} />
    </ScrollView>
  );
}
