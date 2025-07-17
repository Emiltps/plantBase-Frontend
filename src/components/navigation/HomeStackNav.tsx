import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddPlantScreen from '../screens/AddPlantScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import EditScheduleScreen from '../screens/EditScheduleScreen';
import EditPlantScreen from '../screens/EditPlantScreen';
import PlantCareScheduleScreen from '../screens/PlantCareScheduleScreen';
import AddCareScheduleScreen from '../screens/AddCareScheduleScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => (
          <View className="flex-row items-center bg-white px-4 pb-8 pt-[60px]">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex-row items-center rounded-full border border-2 border-gray-300 bg-white p-1">
              <View className="h-[58px] w-[58px] items-center justify-center rounded-full bg-[#f8f8f8]">
                <Ionicons name="arrow-back" size={20} color="#306739" />
              </View>
              <Text className="text-main-text mx-6 text-lg font-semibold">Go Back</Text>
            </TouchableOpacity>
          </View>
        ),
      }}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Stack.Screen name="AddPlant" component={AddPlantScreen} />
      <Stack.Screen name="PlantDetailScreen" component={PlantDetailScreen} />
      <Stack.Screen name="AddCareScheduleScreen" component={AddCareScheduleScreen} />
      <Stack.Screen name="EditScheduleScreen" component={EditScheduleScreen} />
      <Stack.Screen name="EditPlantScreen" component={EditPlantScreen} />
      <Stack.Screen name="PlantCareScheduleScreen" component={PlantCareScheduleScreen} />
    </Stack.Navigator>
  );
}
