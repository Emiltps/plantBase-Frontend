import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpcomingTasksScreen from '../screens/UpcomingTasksScreen';
import EditTaskScreen from '../screens/EditScheduleScreen';

const Stack = createNativeStackNavigator();

export default function UpcomingStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UpcomingTasks"
        component={UpcomingTasksScreen}
        options={{ headerShown: false, title: 'Tasks' }}
      />
      <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
    </Stack.Navigator>
  );
}
