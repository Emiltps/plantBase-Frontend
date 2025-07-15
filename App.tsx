import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from 'src/contexts/AuthContext';

import NavContainer from 'src/components/NavContainer';
import BottomTabNav from 'src/components/navigation/BottomTabNav';
import AuthStackNav from 'src/components/navigation/AuthStackNav';
import './global.css';
import { useEffect } from 'react';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function Main() {
  const { user } = useAuth();
  return <NavContainer>{user ? <BottomTabNav /> : <AuthStackNav />}</NavContainer>;
}
