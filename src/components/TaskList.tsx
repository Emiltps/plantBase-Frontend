import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../api/supabaseClient';
import Constants from 'expo-constants';
import Feather from '@expo/vector-icons/Feather';

import axios from 'axios';

type CareSchedule = {
  plant_id: number;
  task_type: string;
  interval_days: number;
  next_due: string;
  created_at: string;
};

type TaskListProps = {
  plant_id: number;
  onPressTask?: (schedule: CareSchedule) => void;
};

const API_BASE = Constants.expoConfig?.extra?.apiBaseUrl;

const api = axios.create({
  baseURL: API_BASE,
});

async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${session?.access_token}`,
  };
}

export default function TaskList({ plant_id, onPressTask }: TaskListProps) {
  const [schedule, setSchedule] = useState<CareSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const headers = await getAuthHeaders();
        const response = await api.get(`/api/plants/${plant_id}/care_schedules`, { headers });
        setSchedule(response.data.schedules);
      } catch (err: any) {
        setError(err.message || 'Error fetching care schedule');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [plant_id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="items-center p-4">
        <Text className="text-red-500">Error: {error}</Text>
      </View>
    );
  }
  if (schedule.length === 0) {
    return (
      <View className="items-center p-4">
        <Text className="italic text-gray-500">No care schedule found for this plant.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={schedule}
      keyExtractor={(item) => `${item.task_type}-${item.next_due}`}
      contentContainerStyle={{ padding: 16, paddingBottom: 128 }}
      renderItem={({ item }) => (
        <View className="mb-3 flex-row items-center justify-between rounded-3xl border border-gray-200 bg-white p-3">
          {/* Type icon */}
          <View
            className="m-4 mr-6 items-center justify-center rounded-full p-3"
            style={{
              backgroundColor:
                item.task_type.toLowerCase() === 'water'
                  ? '#BBDEFB'
                  : item.task_type.toLowerCase() === 'fertilise'
                    ? '#FFF9C4'
                    : item.task_type.toLowerCase() === 'prune'
                      ? '#E1BEE7'
                      : '#CFD8DC',
            }}>
            {item.task_type.toLowerCase() === 'water' && (
              <MaterialCommunityIcons name="water" size={24} color="#2196F3" />
            )}
            {item.task_type.toLowerCase() === 'fertilise' && (
              <MaterialCommunityIcons name="flower-tulip" size={24} color="#FBC02D" />
            )}
            {item.task_type.toLowerCase() === 'prune' && (
              <MaterialCommunityIcons name="scissors-cutting" size={24} color="#9C27B0" />
            )}
          </View>
          {/* Task info */}
          <View className="flex-1 pr-2">
            <Text className="text-xl font-semibold text-text-main">
              {item.task_type.charAt(0).toUpperCase() + item.task_type.slice(1)}
            </Text>
            <Text className="mt-1 text-gray-500">
              Once every {item.interval_days} day{item.interval_days !== 1 ? 's' : ''}
            </Text>
            <Text className="mt-1 text-gray-500">
              Next due:{' '}
              {new Date(item.next_due).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
          {/* Action button */}
          <TouchableOpacity
            className="h-[73px] w-14 items-center justify-center rounded-xl bg-primary"
            onPress={() => onPressTask?.(item)}>
            <Feather name="edit" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
