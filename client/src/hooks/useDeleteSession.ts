import { deleteSession } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SESSIONS } from './useSessions';

const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SESSIONS] }),
  });

  return { mutate, ...rest };
};

export default useDeleteSession;
