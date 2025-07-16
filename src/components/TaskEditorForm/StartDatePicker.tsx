// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// type Props = {
//   date: Date;
//   onChange: (newDate: Date) => void;
// };

// export default function StartDatePicker({ date, onChange }: Props) {
//   const [showPicker, setShowPicker] = React.useState(false);

//   const handleChange = (_: any, selectedDate?: Date) => {
//     setShowPicker(false);
//     if (selectedDate) onChange(selectedDate);
//   };

//   return (
//     <View className="mb-4">
//       <Text className="mb-1 text-base">Start Date</Text>
//       <Button title={date.toDateString()} onPress={() => setShowPicker(true)} />
//       {showPicker && (
//         <DateTimePicker value={date} mode="date" display="default" onChange={handleChange} />
//       )}
//     </View>
//   );
// }

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
