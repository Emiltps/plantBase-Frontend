import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { parseISO, format } from 'date-fns';

type CareSchedule = {
  plant_id: number;
  task_type: string;
  interval_days: number;
  next_due: string;
  created_at: string;
};

type Props = {
  tasks: CareSchedule[];
  plantsMap: Record<number, string>;
};

export default function UpcomingTaskList({ tasks, plantsMap }: Props) {
  if (tasks.length === 0) {
    return (
      <View className="mt-8 items-center">
        <Text className="text-gray-500">No tasks found for this view.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => `${item.plant_id}-${item.task_type}-${index}`}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View className="mb-4 rounded-xl bg-lime-100 px-24 py-4">
          <Text className="mb-1 text-lg font-semibold capitalize">🪴 {item.task_type}</Text>
          <Text className="text-gray-700">
            Plant: {plantsMap[item.plant_id] ?? `ID ${item.plant_id}`}
          </Text>
          <Text className="text-gray-600">Due: {format(parseISO(item.next_due), 'PPP')}</Text>
        </View>
      )}
    />
  );
}
