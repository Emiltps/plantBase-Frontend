import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Constants from 'expo-constants';
import { parseISO, startOfToday, endOfToday, endOfWeek, isWithinInterval } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import TaskViewSwitcher from '../TaskViewSwitcher';
import UpcomingTaskList, { CareTask } from '../UpcomingTaskList';
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

export default function UpcomingTasksScreen() {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState<CareTask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<CareTask[]>([]);
  const [view, setView] = useState<'today' | 'thisWeek'>('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userId = user.id;
        const headers = await getAuthHeaders();

        const tasksRes = await api.get<{ tasks: CareTask[] }>(`/api/users/${userId}/care_tasks`, {
          headers,
        });
        const tasks: CareTask[] = tasksRes.data.tasks;

        setAllTasks(tasks);
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
      <SafeAreaView
        edges={['top', 'bottom']}
        className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-bg pt-8">
      <Text className="mb-8 text-center text-2xl font-bold">Upcoming Tasks</Text>
      <TaskViewSwitcher selected={view} onSelect={setView} />
      <UpcomingTaskList tasks={filteredTasks} view={view} />
    </SafeAreaView>
  );
}
