import { Text, View } from 'react-native';
import TaskList from '../TaskList';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RouteParams = {
  plant_id: number;
  plant_name: string;
};

export default function PlantCareScheduleScreen() {
  const route = useRoute();
  const { plant_id, plant_name } = route.params as RouteParams;

  return (
    <SafeAreaView className="flex-1 bg-lime-50">
      <View className="bg-lime-100 px-4 py-6">
        <Text className="text-2xl font-bold text-lime-800">{plant_name}&apos;s Care Schedule</Text>
      </View>
      <TaskList plant_id={plant_id} />
    </SafeAreaView>
  );
}
