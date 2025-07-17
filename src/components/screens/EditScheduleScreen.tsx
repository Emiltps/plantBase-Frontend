import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import PlantTextInput from '../PlantForm/PlantTextInput';
import PrimaryButton from '../PlantForm/PrimaryButton';
import TaskTypeDropdown, { TaskType } from '../CareScheduleForm/TaskTypeDropdown';
import FrequencyInput from '../CareScheduleForm/FrequencyInput';
import StartDatePicker from '../CareScheduleForm/StartDatePicker';
import { updateSchedule, deleteSchedule } from 'api/myCareSchedules';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type CareSchedule = {
  care_schedule_id: number;
  plant_id: number;
  task_type: TaskType;
  interval_days: number;
  next_due: string;
  created_at?: string;
};

export default function EditScheduleScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const schedule: CareSchedule = route.params?.schedule;

  const [taskType, setTaskType] = useState<TaskType>(schedule.task_type);
  const [frequency, setFrequency] = useState(schedule.interval_days.toString());
  const [startDate, setStartDate] = useState(new Date(schedule.next_due));
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!taskType || !frequency) {
      Alert.alert('Missing fields', 'Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      await updateSchedule(schedule.care_schedule_id, {
        task_type: taskType,
        interval_days: parseInt(frequency, 10),
        next_due: startDate.toISOString(),
      });

      Alert.alert('Success', 'Schedule updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('Error', 'Failed to update schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this schedule?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await deleteSchedule(schedule.care_schedule_id);
            Alert.alert('Deleted', 'Schedule deleted successfully.', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          } catch (error) {
            console.error('Delete failed:', error);
            Alert.alert('Error', 'Failed to delete schedule. Please try again.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{ paddingBottom: 132 }}
        keyboardShouldPersistTaps="handled">
        <Text className="mb-8 text-center text-2xl font-bold">Edit Schedule</Text>

        <TaskTypeDropdown selectedType={taskType} onTypeSelect={setTaskType} />
        <FrequencyInput frequency={frequency} setFrequency={setFrequency} />
        <StartDatePicker date={startDate} onChange={setStartDate} />
        <PlantTextInput label="Notes" value={notes} onChangeText={setNotes} />

        <PrimaryButton
          label={loading ? 'Saving...' : 'Save'}
          onPress={handleSave}
          disabled={loading}
        />
        <TouchableOpacity
          onPress={handleDelete}
          className="flex-row items-center justify-center rounded-2xl bg-red-light px-4 py-4 py-6"
          disabled={loading}>
          <MaterialIcons name="delete-outline" size={24} color="#b01d3e" />
          <Text className="ml-2 text-lg font-bold text-red-main">Delete Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
