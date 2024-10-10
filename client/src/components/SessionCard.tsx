import { SessionData } from '@/lib/api';
import { Card, CardContent, CardFooter } from './ui/card';
import useDeleteSession from '@/hooks/useDeleteSession';
import { Button } from './ui/button';
import { CircleX } from 'lucide-react';

const SessionCard = ({ session }: { session: SessionData }) => {
  const { _id, createdAt, userAgent, isCurrent } = session;
  const { mutate, isPending } = useDeleteSession(_id);
  return (
    <Card className='max-w-xl mx-auto'>
      <CardContent className='pt-5'>
        <span>{new Date(createdAt).toLocaleString('nl-NL')}</span>{' '}
        {isCurrent && '(current session)'}
      </CardContent>
      <CardFooter>
        <div className='text-muted-foreground text-sm'>{userAgent}</div>
        {!isCurrent && (
          <Button
            className='bg-background hover:bg-background items-start mb-auto'
            size='icon'
            title='Delete Session'
            onClick={() => mutate()}
            disabled={isPending}
          >
            <CircleX color='#fff' className='w-5 h-5' />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default SessionCard;
