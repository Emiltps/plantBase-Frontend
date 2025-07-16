import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updatePlant, getPlant } from '../../../api/MyPlantsApi';
import type { Plant } from '../../../api/MyPlantsApi';
import PlantTextInput from '../PlantForm/PlantTextInput';
import PlantStatusDropdown from '../PlantForm/PlantStatusDropdown';
import PrimaryButton from '../PlantForm/PrimaryButton';

type RootStackParamList = {
  EditPlantScreen: { plantId: string; onGoBack?: () => void };
};

type EditPlantRouteProp = RouteProp<RootStackParamList, 'EditPlantScreen'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditPlantScreen'>;

export default function EditPlantScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'EditPlantScreen'>>();
  const route = useRoute<EditPlantRouteProp>();
  const { plantId } = route.params;
  const [plant, setPlant] = useState<Plant | null>(null);
  const [nickname, setNickname] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPlantDetail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPlant(plantId);
      setPlant(data);
      setNickname(data.nickname);
      setNotes(data.notes || '');
      setStatus(data.status.toUpperCase());
    } catch {
      Alert.alert('Error', 'Could not load plant for editing');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [plantId, navigation]);

  useEffect(() => {
    fetchPlantDetail();
  }, [fetchPlantDetail]);

  useFocusEffect(
    useCallback(() => {
      fetchPlantDetail();
    }, [fetchPlantDetail])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#4b8457" className="flex-1 justify-center" />;
  }

  const handleSave = async () => {
    const statusLower = status.toLowerCase();
    const validStatuses = ['alive', 'infected', 'dead'];
    if (!validStatuses.includes(statusLower)) {
      Alert.alert(
        'Invalid Plant Status',
        'Please select a valid status: Alive, Infected, or Dead.'
      );
      return;
    }
    try {
      await updatePlant(String(plant!.plant_id), { nickname, notes, status: statusLower });
      Alert.alert('Success', 'Plant updated successfully.');
      navigation.goBack();
    } catch (error: any) {
      const msg = 'Failed to update plant';
      Alert.alert('Error', msg);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4" contentContainerStyle={{ paddingBottom: 132 }}>
      <Text className="mb-4 text-2xl font-bold">Edit Plant</Text>

      <PlantTextInput label="Nickname" value={nickname} onChangeText={setNickname} />

      <PlantTextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
      />

      <Text className="mb-2 font-medium">Status</Text>
      <PlantStatusDropdown selectedStatus={status} onStatusSelect={setStatus} />

      <PrimaryButton label="Save" onPress={handleSave} />
    </ScrollView>
  );
}
