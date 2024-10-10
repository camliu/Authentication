import { Loader2 } from 'lucide-react';
import useSessions from './hooks/useSessions';
import SessionCard from './components/SessionCard';

const Settings = () => {
  const { data, isPending, isSuccess, isError } = useSessions();
  return (
    <div className='mt-16'>
      <h1 className='mb-4 text-2xl font-semibold text-center'>My Sessions</h1>
      {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {isError && (
        <div className='mb-3 text-red-400 text-center'>
          Failed to get sessions.
        </div>
      )}
      {isSuccess && (
        <div className='flex flex-col gap-3'>
          {data.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Settings;
