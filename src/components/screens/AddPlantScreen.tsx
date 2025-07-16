import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import PlantTextInput from '../PlantForm/PlantTextInput';
import PlantTypeDropdown from '../PlantForm/PlantTypeDropdown';
import PlantImagePicker from '../PlantForm/PlantImagePicker';
import PrimaryButton from '../PlantForm/PrimaryButton';
import { createPlant } from '../../../api/plants';

const token = 'bearer-token';
const userId = 'user-id';

export default function AddPlantScreen() {
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [plantTypeId, setPlantTypeId] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!nickname || !plantTypeId) {
      Alert.alert('Please enter a name and select a plant type');
      return;
    }

    try {
      const newPlant = await createPlant(
        userId,
        {
          nickname,
          plant_type_id: plantTypeId,
          profile_description: description,
          notes,
          photo_url: imageUri ?? '',
          status: 'ALIVE',
          died_at: null,
        },
        token
      );
      Alert.alert('Success', `Plant ${newPlant.nickname} added!`);
    } catch (err) {
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
