import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PlantTextInput from '../PlantForm/PlantTextInput';
import PrimaryButton from '../PlantForm/PrimaryButton';
import TaskTypeDropdown, { TaskType } from '../CareScheduleForm/TaskTypeDropdown';
import FrequencyInput from '../CareScheduleForm/FrequencyInput';
import StartDatePicker from '../CareScheduleForm/StartDatePicker';
import { createSchedule } from 'api/myCareSchedules';

export default function AddCareScheduleScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation() as any;
  const plantId: number = parseInt(route.params?.plantId, 10);

  const [taskType, setTaskType] = useState<TaskType>('water');
  const [frequency, setFrequency] = useState('7');
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!taskType || !frequency) {
      Alert.alert('Missing fields', 'Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      await createSchedule(plantId, {
        task_type: taskType,
        interval_days: parseInt(frequency, 10),
        next_due: startDate.toISOString(),
      });

      Alert.alert('Success', 'Schedule created successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Create schedule failed:', error);
      Alert.alert('Error', 'Failed to create schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">Add Care Schedule</Text>

      <TaskTypeDropdown selectedType={taskType} onTypeSelect={setTaskType} />
      <FrequencyInput frequency={frequency} setFrequency={setFrequency} />
      <StartDatePicker date={startDate} onChange={setStartDate} />
      <PlantTextInput label="Notes" value={notes} onChangeText={setNotes} />

      <PrimaryButton
        label={loading ? 'Saving...' : 'Save'}
        onPress={handleSave}
        disabled={loading}
      />
    </ScrollView>
  );
}
