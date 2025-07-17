import type { Plant } from '../../../api/MyPlantsApi';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { getPlant } from '../../../api/MyPlantsApi';
import TaskList from '../TaskList';
import PlantPreviewCard from '../PlantPreviewCard';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RouteParams = {
  plantId: number;
  plantName: string;
};

export default function PlantCareScheduleScreen() {
  const route = useRoute();
  const navigation = useNavigation() as any;
  const { plantId, plantName } = route.params as RouteParams;
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const fetchPlant = async () => {
    try {
      setLoading(true);
      const data = await getPlant(plantId.toString());
      setPlant(data);
    } catch (e) {
      console.error('Error loading plant preview', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, [plantId]);

  useFocusEffect(
    useCallback(() => {
      fetchPlant();
      setReloadKey((prev) => prev + 1);
    }, [plantId])
  );

  return (
    <View className="flex-1 bg-bg">
      <View className="px-4 py-4">
        {loading
          ? null
          : plant && (
              <PlantPreviewCard
                plant={plant}
                showArrow={false}
                pressable={false}
                imageSizeClass="h-44 w-44"
              />
            )}
        <Text className="mt-6 text-center text-2xl font-bold">Care Schedules</Text>
      </View>
      <TaskList
        key={reloadKey}
        plant_id={plantId}
        onPressTask={(schedule) => navigation.navigate('EditScheduleScreen', { schedule })}
      />
    </View>
  );
}
