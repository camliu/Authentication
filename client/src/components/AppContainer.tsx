import useAuth from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const AppContainer = () => {
  const { data, isLoading } = useAuth();
  const UserMenu = lazy(() => import('./UserMenu'));

  return isLoading ? (
    <div className='w-screen h-screen flex'>
      <Loader2 className='m-auto h-6 w-6 animate-spin' />
    </div>
  ) : data ? (
    <div className='p-4 min-h-screen'>
      <Suspense>
        <UserMenu />
      </Suspense>
      <Outlet />
    </div>
  ) : (
    <Navigate
      to='/login'
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};
export default AppContainer;
