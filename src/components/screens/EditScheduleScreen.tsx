import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PlantTextInput from '../PlantForm/PlantTextInput';
import PrimaryButton from '../PlantForm/PrimaryButton';
import TaskTypeDropdown from '../CareScheduleForm/TaskTypeDropdown';
import FrequencyInput from '../CareScheduleForm/FrequencyInput';
import StartDatePicker from '../CareScheduleForm/StartDatePicker';

type CareSchedule = {
  plant_id: number;
  task_type: string;
  interval_days: number;
  next_due: string;
  created_at: string;
};

export default function EditScheduleScreen() {
  const route = useRoute<any>();
  const schedule: CareSchedule = route.params?.schedule;

  const [taskType, setTaskType] = useState(schedule.task_type);
  const [frequency, setFrequency] = useState(schedule.interval_days.toString());
  const [startDate, setStartDate] = useState(new Date(schedule.next_due));
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!taskType || !frequency) {
      Alert.alert('Missing fields', 'Please fill out all required fields.');
      return;
    }

    // TODO: Replace with real backend call
    Alert.alert('Saved', `Schedule updated!`);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">Edit Schedule</Text>

      <TaskTypeDropdown selectedType={taskType} onTypeSelect={setTaskType} />
      <FrequencyInput frequency={frequency} setFrequency={setFrequency} />
      <StartDatePicker date={startDate} onChange={setStartDate} />
      <PlantTextInput label="Notes" value={notes} onChangeText={setNotes} />

      <PrimaryButton label="Save" onPress={handleSave} />
    </ScrollView>
  );
}
