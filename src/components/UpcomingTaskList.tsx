import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { parseISO, format } from 'date-fns';
import { differenceInDays } from 'date-fns';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { completeTask } from '../../api/myCareTasks';

export type CareTask = {
  care_tasks_id: number;
  schedule_id: number;
  plant_id: number;
  task_type: string;
  due_at: string;
  completed_at: string | null;
  created_at: string;
  nickname: string;
  photo_url: string;
};

type Props = {
  tasks: CareTask[];
  view: 'today' | 'thisWeek';
};

export default function UpcomingTaskList({ tasks, view }: Props) {
  const [localTasks, setLocalTasks] = useState<CareTask[]>(tasks);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  if (localTasks.length === 0) {
    return (
      <View className="mt-8 items-center">
        <Text className="text-gray-500">No tasks found for this view.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={localTasks}
      keyExtractor={(item, index) => `${item.plant_id}-${item.task_type}-${index}`}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 132 }}
      className="w-full flex-1"
      renderItem={({ item }) => {
        const dueDate = parseISO(item.due_at);
        const days = differenceInDays(dueDate, new Date());
        const dueText =
          days <= 0
            ? 'Due Today'
            : days < 7
              ? `Due in ${days} Day${days > 1 ? 's' : ''}`
              : `Due in ${Math.floor(days / 7)} Week${Math.floor(days / 7) > 1 ? 's' : ''}`;

        return (
          <View className="mb-1 mt-2 flex-row items-center justify-between rounded-3xl border border-gray-200 bg-white p-3">
            {item.photo_url ? (
              <Image
                source={{ uri: item.photo_url }}
                className="h-28 w-28 rounded-xl border border-gray-100 bg-green-100"
              />
            ) : (
              <View className="h-16 w-16 rounded-md bg-light-green-bg" />
            )}

            <View className="flex-1 px-4">
              <Text className="text-lg font-bold text-text-main">{item.nickname}</Text>
              <Text className="text-base font-semibold capitalize text-text-green">
                {item.task_type}
              </Text>
              <Text className="text-gray-600">{dueText}</Text>
            </View>

            <TouchableOpacity
              className={`h-28 w-16 items-center justify-center rounded-xl ${
                item.completed_at ? 'bg-primary' : 'bg-gray-200'
              }`}
              onPress={async () => {
                const prev = localTasks;
                if (view === 'today') {
                  const updated = prev.map((t) =>
                    t.care_tasks_id === item.care_tasks_id
                      ? { ...t, completed_at: new Date().toISOString() }
                      : t
                  );
                  setLocalTasks(updated);
                } else {
                  setLocalTasks(prev.filter((t) => t.care_tasks_id !== item.care_tasks_id));
                }
                try {
                  await completeTask(item.care_tasks_id);
                } catch (e: any) {
                  setLocalTasks(prev);
                  Alert.alert('Error', 'Could not mark task complete');
                }
              }}>
              <FontAwesome5
                name="check"
                size={24}
                color={`${item.completed_at ? 'white' : 'gray'}`}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}
