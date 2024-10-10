import { getSessions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const SESSIONS = 'sessions';

const useSessions = (opts = {}) => {
  const { data = [], ...rest } = useQuery({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...opts,
  });

  return { data, ...rest };
};

export default useSessions;
