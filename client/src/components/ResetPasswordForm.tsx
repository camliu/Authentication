import { resetPassword } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CircleCheck } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const ResetPasswordForm = ({ code }: { code: string }) => {
  const [password, setPassword] = useState<string>('');
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: resetPassword,
  });

  return (
    <Card className='mx-auto w-80'>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
      </CardHeader>
      {isError && (
        <div className='ml-6 mb-3 text-red-400'>
          {error.message || 'An error occurred'}
        </div>
      )}
      {isSuccess ? (
        <>
          <Alert className='mx-5 mb-5 w-auto'>
            <CircleCheck className='h-5 w-5' />
            <AlertDescription className='ml-2'>
              Password updated successfully!
            </AlertDescription>
          </Alert>
          <Button className='flex justify-center mb-2' variant='link' asChild>
            <Link className='text-sky-500' to='/login'>
              Sign in
            </Link>
          </Button>
        </>
      ) : (
        <>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col space-y-2'>
              <Label htmlFor='email'>New Password</Label>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  mutate({ verificationCode: code, password })
                }
                autoFocus
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className='w-full'
              disabled={password.length < 6 || isPending}
              onClick={(e) => {
                e.preventDefault();
                mutate({ verificationCode: code, password });
              }}
            >
              Reset Password
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
export default ResetPasswordForm;
