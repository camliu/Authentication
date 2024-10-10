import { Alert, AlertDescription } from '@/components/ui/alert';
import useAuth from '@/hooks/useAuth';
import { CircleAlert } from 'lucide-react';

const Profile = () => {
  const { data } = useAuth();
  const { email, verified, createdAt } = data || {};

  return (
    <div className='mt-16'>
      <h1 className='mb-4 text-2xl font-semibold text-center'>May Account</h1>
      {!verified && (
        <Alert className='mb-5 w-fit mx-auto'>
          <CircleAlert className='h-5 w-5' />
          <AlertDescription className='ml-2'>
            Please verify your email
          </AlertDescription>
        </Alert>
      )}
      <div className='flex justify-center mt-2'>
        <span>
          Email: <span className='text-muted-foreground'>{email}</span>
        </span>
      </div>
      <div className='flex justify-center mt-2'>
        <span>
          Created on{' '}
          <span className='text-muted-foreground'>
            {new Date(createdAt || '').toLocaleDateString('nl-NL')}
          </span>
        </span>
      </div>
    </div>
  );
};
export default Profile;
