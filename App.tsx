import { NavContainer } from 'src/components/NavContainer';
import { BottomTabNav } from '~/components/navigation/BottomTabNav';
import './global.css';

const isLoggedIn = true;

export default function App() {
  return <NavContainer>{isLoggedIn ? <BottomTabNav /> : <AuthStackNav />}</NavContainer>;
}
