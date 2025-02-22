import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { ThemeProvider } from './components/ui/theme-provider';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AppContainer from './components/AppContainer';
import Profile from './pages/Profile';
import Settings from './Settings';
import { setNavigate } from './lib/navigation';

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes>
        {/* protected route */}
        <Route path='/' element={<AppContainer />}>
          <Route index element={<Profile />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email/verify/:code' element={<VerifyEmail />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset' element={<ResetPassword />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
