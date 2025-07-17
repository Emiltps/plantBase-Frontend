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
    <View>
      <Text className="text-md mb-2 ml-3 text-gray-500">Start Date</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="bg-bg-gray-input border-input-border mb-4 rounded-2xl border px-6 py-6 text-xl">
        <Text className="text-xl">{date.toDateString()}</Text>
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
