import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
};

export default function StartDatePicker({ date, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-medium">Start Date</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="mb-2 rounded-lg border border-gray-300 bg-gray-100 p-3">
        <Text className="text-base">{date.toDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShow(false);
            if (selectedDate) onChange(selectedDate);
          }}
        />
      )}
    </View>
  );
}
