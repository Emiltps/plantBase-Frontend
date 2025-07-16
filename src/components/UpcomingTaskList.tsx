import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { parseISO, format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

type CareTask = {
  schedule_id: number;
  due_at: string;
  completed_at: string;
  created_at: string;
  task_type?: string;
  plant_id?: number;
};

type Props = {
  tasks: CareTask[];
  plantsMap: Record<number, string>;
};

export default function UpcomingTaskList({ tasks, plantsMap }: Props) {
  const navigation = useNavigation() as any;

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
      keyExtractor={(item, index) => `${item.schedule_id}-${index}`}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditTask', { task: item })}
          className="mb-4 rounded-xl bg-lime-100 px-6 py-4">
          <Text className="mb-1 text-lg font-semibold capitalize">🪴 {item.task_type}</Text>
          <Text className="text-gray-700">
            Plant: {plantsMap[item.plant_id ?? 0] ?? `ID ${item.plant_id}`}
          </Text>
          <Text className="text-gray-600">Due: {format(parseISO(item.due_at), 'PPP')}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
