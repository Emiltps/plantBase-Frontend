import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AddPlantType = {
  AddPlant: undefined;
};

type NavigationProp = NativeStackNavigationProp<AddPlantType, 'AddPlant'>;

const MyPlantAddPlantButton = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Button
      onPress={() => navigation.navigate('AddPlant')}
      title="Add a Plant"
      color="#4ade80"
      accessibilityLabel="Navigate to Add Plant screen"
    />
  );
};

export default MyPlantAddPlantButton;
