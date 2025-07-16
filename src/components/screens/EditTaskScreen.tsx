import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PlantTextInput from '../PlantForm/PlantTextInput';
import PrimaryButton from '../PlantForm/PrimaryButton';
import TaskTypeDropdown from '../TaskEditorForm/TaskTypeDropdown';
import FrequencyInput from '../TaskEditorForm/FrequencyInput';
import StartDatePicker from '../TaskEditorForm/StartDatePicker';

type CareSchedule = {
  plant_id: number;
  task_type: string;
  interval_days: number;
  next_due: string;
  created_at: string;
};

export default function EditTaskScreen() {
  const route = useRoute<any>();
  const task: CareSchedule = route.params?.task;

  const [taskName, setTaskName] = useState(task.task_type);
  const [taskType, setTaskType] = useState(task.task_type);
  const [frequency, setFrequency] = useState(task.interval_days.toString());
  const [startDate, setStartDate] = useState(new Date(task.next_due));
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!taskName || !taskType) {
      Alert.alert('Missing fields', 'Please fill out task name and type.');
      return;
    }

    // TODO: Replace with real backend call
    Alert.alert('Saved', `Task "${taskName}" updated!`);
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">Edit Task</Text>

      <PlantTextInput label="Task Name" value={taskName} onChangeText={setTaskName} />
      <TaskTypeDropdown selectedType={taskType} onTypeSelect={setTaskType} />
      <FrequencyInput frequency={frequency} setFrequency={setFrequency} />
      <StartDatePicker date={startDate} onChange={setStartDate} />
      <PlantTextInput label="Notes" value={notes} onChangeText={setNotes} />

      <PrimaryButton label="Save" onPress={handleSave} />
    </ScrollView>
  );
}
