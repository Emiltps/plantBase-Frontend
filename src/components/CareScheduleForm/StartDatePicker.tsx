import React from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  date: Date;
  onChange: (newDate: Date) => void;
};

export default function StartDatePicker({ date, onChange }: Props) {
  return (
    <View className="my-4">
      <Text className="mb-2 text-base font-medium">Start Date</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(_, selectedDate) => {
          if (selectedDate) onChange(selectedDate);
        }}
      />
    </View>
  );
}
