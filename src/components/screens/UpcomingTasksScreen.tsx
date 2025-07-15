import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TaskViewSwitcher from '../TaskViewSwitcher';
import UpcomingTaskList from '../UpcomingTaskList';
import { startOfToday, endOfToday, endOfWeek, isWithinInterval, parseISO } from 'date-fns';

type CareSchedule = {
  plant_id: number;
  task_type: string;
  interval_days: number;
  next_due: string;
  created_at: string;
};

type Plant = {
  plant_id: number;
  nickname: string;
};

export default function UpcomingTasksScreen() {
  const [allTasks, setAllTasks] = useState<CareSchedule[]>([]);
  const [plantsMap, setPlantsMap] = useState<Record<number, string>>({});
  const [filteredTasks, setFilteredTasks] = useState<CareSchedule[]>([]);
  const [view, setView] = useState<'today' | 'thisWeek'>('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (!storedUserId) throw new Error('User ID not found');
        const userId = parseInt(storedUserId);

        const [tasksRes, plantsRes] = await Promise.all([
          axios.get<CareSchedule[]>(`https://plantbase-be.onrender.com/users/${userId}/care_tasks`),
          axios.get<Plant[]>(`https://plantbase-be.onrender.com/user/${userId}/plants`),
        ]);

        setAllTasks(tasksRes.data);

        const plantMap: Record<number, string> = {};
        plantsRes.data.forEach((plant) => {
          plantMap[plant.plant_id] = plant.nickname;
        });
        setPlantsMap(plantMap);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const now = new Date();

    const filtered = allTasks.filter((task) => {
      const dueDate = parseISO(task.next_due);
      if (view === 'today') {
        return isWithinInterval(dueDate, {
          start: startOfToday(),
          end: endOfToday(),
        });
      }
      if (view === 'thisWeek') {
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
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <TaskViewSwitcher selected={view} onSelect={setView} />
      <UpcomingTaskList tasks={filteredTasks} plantsMap={plantsMap} />
    </View>
  );
}
