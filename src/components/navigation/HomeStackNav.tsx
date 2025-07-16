import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddPlantScreen from '../screens/AddPlantScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import UpcomingTasksScreen from '../screens/UpcomingTasksScreen';
import EditPlantScreen from '../screens/EditPlantScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Stack.Screen name="AddPlant" component={AddPlantScreen} options={{ title: 'Add Plant' }} />
      <Stack.Screen
        name="PlantDetailScreen"
        component={PlantDetailScreen}
        options={{ title: 'Plant Details' }}
      />
      <Stack.Screen name="EditScheduleScreen" component={EditTaskScreen} />
      <Stack.Screen name="EditPlantScreen" component={EditPlantScreen} />
      <Stack.Screen name="UpcomingTasksScreen" component={UpcomingTasksScreen} />
    </Stack.Navigator>
  );
}
