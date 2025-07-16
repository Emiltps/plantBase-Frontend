import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updatePlant, getPlant } from '../../../api/MyPlantsApi';
import type { Plant } from '../../../api/MyPlantsApi';
import PlantTextInput from '../PlantForm/PlantTextInput';
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

  const [description, setDescription] = useState(plant?.profile_description || '');
  const [imageUri, setImageUri] = useState<string | undefined>(plant?.photo_url);

  const fetchPlantDetail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPlant(plantId);
      setPlant(data);
      setNickname(data.nickname);
      setNotes(data.notes || '');
      setStatus(data.status.toUpperCase());
      setDescription(data.profile_description);
      setImageUri(data.photo_url);
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
      await updatePlant(String(plant!.plant_id), {
        nickname,
        notes,
        status: statusLower,
        profile_description: description,
        photo_url: imageUri,
      });
      Alert.alert('Success', 'Plant updated successfully.');
      navigation.goBack();
    } catch (error: any) {
      const msg = 'Failed to update plant';
      Alert.alert('Error', msg);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setImageUri(undefined);
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
      <PlantTextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <View className="mb-4 flex-row">
        {/* Alive */}
        <TouchableOpacity
          onPress={() => setStatus('ALIVE')}
          className={`mr-2 flex-1 items-center rounded-2xl py-6 ${
            status === 'ALIVE' ? 'bg-green-bg' : 'bg-gray-200'
          }`}>
          <Text
            className={`text-xl ${status === 'ALIVE' ? 'font-medium text-primary' : 'text-text-main'}`}>
            Alive
          </Text>
        </TouchableOpacity>
        {/* Infected */}
        <TouchableOpacity
          onPress={() => setStatus('INFECTED')}
          className={`mr-2 flex-1 items-center rounded-2xl py-6 ${
            status === 'INFECTED' ? 'bg-orange-200' : 'bg-gray-200'
          }`}>
          <Text
            className={`text-xl ${status === 'INFECTED' ? 'font-medium text-orange-900' : 'text-text-main'}`}>
            Infected
          </Text>
        </TouchableOpacity>
        {/* Dead */}
        <TouchableOpacity
          onPress={() => setStatus('DEAD')}
          className={`flex-1 items-center rounded-2xl py-6 ${
            status === 'DEAD' ? 'bg-black' : 'bg-gray-200'
          }`}>
          <Text
            className={`text-xl ${status === 'DEAD' ? 'font-medium text-white' : 'text-text-main'}`}>
            Dead
          </Text>
        </TouchableOpacity>
      </View>

      {/* Description */}

      {/* Image Preview & Controls */}
      <View className="mb-4">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="aspect-square w-full rounded-2xl border border-8 border-green-bg bg-gray-200"
            resizeMode="cover"
          />
        ) : (
          <View className="h-40 w-full rounded-2xl bg-gray-200" />
        )}
        <View className="mt-2 flex-row">
          <TouchableOpacity
            onPress={handlePickImage}
            className="flex-1 flex-row items-center justify-center rounded-2xl bg-gray-100 px-6 py-6">
            <FontAwesome6 name="image" size={20} color="gray" />
            <Text className="ml-3 text-xl text-gray-600">Change Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRemoveImage}
            className="ml-2 items-center justify-center rounded-2xl bg-red-light px-8 py-6">
            <FontAwesome6 name="trash" size={20} color="#b01d3e" />
          </TouchableOpacity>
        </View>
      </View>

      <PrimaryButton label="Save" onPress={handleSave} />
    </ScrollView>
  );
}
