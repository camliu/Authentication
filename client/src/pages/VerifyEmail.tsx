import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { CircleAlert, CircleCheck, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const { code = '' } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code),
  });

  return (
    <div className='mt-24 px-6'>
      {isPending ? (
        <Loader2 className='mx-auto h-6 w-6 animate-spin' />
      ) : (
        <div>
          <Alert className='mx-auto w-fit'>
            {isSuccess ? (
              <CircleCheck className='h-5 w-5' />
            ) : (
              <CircleAlert className='h-5 w-5' />
            )}
            <AlertTitle className='ml-2'>
              {isSuccess ? 'Email Verified' : 'Invalid Link'}
            </AlertTitle>
            {isError && (
              <AlertDescription className='mt-3 ml-2 text-muted-foreground'>
                The link is either invalid or expired.{' '}
                <Button className='text-sky-500 p-0' variant='link' asChild>
                  <Link to='/password/reset' replace>
                    Get a new link
                  </Link>
                </Button>
              </AlertDescription>
            )}
          </Alert>
          <Button
            className='flex justify-center text-sky-500 mt-2'
            variant='link'
            asChild
          >
            <Link to='/' replace>
              Back to home
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
export default VerifyEmail;
