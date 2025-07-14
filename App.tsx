import { NavContainer } from 'src/components/NavContainer';
import BottomTabNav from 'src/components/navigation/BottomTabNav';
import AuthStackNav from 'src/components/navigation/AuthStackNav';
import './global.css';

const isLoggedIn = true;

export default function App() {
  return <NavContainer>{isLoggedIn ? <BottomTabNav /> : <AuthStackNav />}</NavContainer>;
}
