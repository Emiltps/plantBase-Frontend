import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
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
};

export default function TaskList({ plant_id }: TaskListProps) {
  const [schedule, setSchedule] = useState<CareSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `https://plantbase-be.onrender.com/plants/${plant_id}/care_schedules`
        );
        setSchedule(response.data);
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
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View className="mb-4 rounded-xl bg-lime-100 p-4">
          <Text>Next Due: {new Date(item.next_due).toLocaleDateString()}</Text>
          <Text>
            Every {item.interval_days} day{item.interval_days !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    />
  );
}
