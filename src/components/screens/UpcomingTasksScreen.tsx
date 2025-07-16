import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { parseISO, startOfToday, endOfToday, endOfWeek, isWithinInterval } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import TaskViewSwitcher from '../TaskViewSwitcher';
import UpcomingTaskList from '../UpcomingTaskList';
import { supabase } from '../../../api/supabaseClient';

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

type CareTask = {
  schedule_id: number;
  due_at: string;
  completed_at: string;
  created_at: string;
  task_type?: string;
  plant_id?: number;
};

export default function UpcomingTasksScreen() {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState<CareTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<CareTask[]>([]);
  const [plantsMap, setPlantsMap] = useState<Record<number, string>>({});
  const [view, setView] = useState<'today' | 'thisWeek'>('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userId = user.id;
        const headers = await getAuthHeaders();

        const tasksRes = await api.get(`/users/${userId}/care_tasks`, { headers });
        const plantsRes = await api.get(`/users/${userId}/plants`, { headers });

        const tasks: CareTask[] = tasksRes.data?.tasks ?? [];
        const plants = plantsRes.data?.plants ?? [];

        const plantMap: Record<number, string> = {};
        plants.forEach((plant: any) => {
          plantMap[plant.plant_id] = plant.nickname;
        });
        setPlantsMap(plantMap);

        const scheduleResponses = await Promise.allSettled(
          plants.map((plant: any) =>
            api.get(`/plants/${plant.plant_id}/care_schedules`, { headers }).then((res) =>
              res.data.map((schedule: any) => ({
                schedule_id: schedule.schedule_id,
                task_type: schedule.task_type,
                plant_id: plant.plant_id,
              }))
            )
          )
        );

        const allSchedules = scheduleResponses
          .filter((r) => r.status === 'fulfilled')
          .flatMap((r: any) => r.value);

        const scheduleMap: Record<number, { task_type: string; plant_id: number }> = {};
        allSchedules.forEach((s) => {
          scheduleMap[s.schedule_id] = {
            task_type: s.task_type,
            plant_id: s.plant_id,
          };
        });

        const enrichedTasks = tasks.map((task) => {
          const schedule = scheduleMap[task.schedule_id];
          return {
            ...task,
            task_type: schedule?.task_type ?? 'Unknown',
            plant_id: schedule?.plant_id ?? 0,
          };
        });

        setAllTasks(enrichedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const now = new Date();
    const filtered = allTasks.filter((task) => {
      const dueDate = parseISO(task.due_at);
      if (view === 'today') {
        return isWithinInterval(dueDate, { start: startOfToday(), end: endOfToday() });
      } else if (view === 'thisWeek') {
        return isWithinInterval(dueDate, {
          start: startOfToday(),
          end: endOfWeek(now, { weekStartsOn: 1 }),
        });
      }
      return false;
    });

    setFilteredTasks(filtered);
  }, [view, allTasks]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text className="py-3 text-2xl font-bold text-lime-800">Upcoming Tasks</Text>
      <TaskViewSwitcher selected={view} onSelect={setView} />
      <UpcomingTaskList tasks={filteredTasks} plantsMap={plantsMap} />
    </SafeAreaView>
  );
}
