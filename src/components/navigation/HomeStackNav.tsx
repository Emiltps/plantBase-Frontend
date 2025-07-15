import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddPlantScreen from '../screens/AddPlantScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddPlant" component={AddPlantScreen} options={{ title: 'Add Plant' }} />
            <Stack.Screen name="PlantDetailScreen" component={PlantDetailScreen} options={{ title: 'Plant Details' }} />
    </Stack.Navigator>
  );
}
