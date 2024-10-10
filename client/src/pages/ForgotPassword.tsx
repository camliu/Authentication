import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendPasswordResetEmail } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });
  return (
    <form className='min-h-screen flex flex-col justify-center'>
      <Card className='mx-auto w-80'>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
        </CardHeader>
        {isError && (
          <div className='mb-3 ml-6 text-red-400'>
            {error?.message || 'An error occurred'}
          </div>
        )}
        {isSuccess ? (
          <Alert className='mx-5 mb-5 w-auto'>
            <CircleCheck className='h-5 w-5' />
            <AlertDescription className='ml-2'>
              Email sent! Check your inbox for further instructions.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='email'>Email address</Label>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
              <Button
                className='w-full'
                disabled={!email || isPending}
                onClick={(e) => {
                  e.preventDefault();
                  mutate(email);
                }}
                type='submit'
              >
                Reset Password
              </Button>
            </CardFooter>
          </>
        )}
        <CardFooter className='flex flex-col'>
          <span className='align-middle text-sm text-muted-foreground'>
            Go back to{' '}
            <Button className='text-sky-500 p-0' variant='link' asChild>
              <Link className='text-sky-500' to='/login'>
                Sign in
              </Link>
            </Button>{' '}
            or{' '}
            <Button className='text-sky-500 p-0' variant='link' asChild>
              <Link to='/register'>Sign up</Link>
            </Button>
          </span>
        </CardFooter>
      </Card>
    </form>
  );
};
export default ForgotPassword;
