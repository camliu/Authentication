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
import { register } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      });
    },
  });

  return (
    <form className='min-h-screen flex flex-col justify-center'>
      <Card className='mx-auto w-80'>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {isError && (
            <div className='mb-3 text-red-400'>
              {error?.message || 'An error occurred'}
            </div>
          )}
          <div className='flex flex-col space-y-2'>
            <Label htmlFor='email'>Email address</Label>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='text-muted-foreground text-xs text-left mt-2'>
              - Must be at least 6 characters long.
            </span>
          </div>
          <div className='flex flex-col space-y-2'>
            <Label htmlFor='password'>Confirm Password</Label>
            <Input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                mutate({ email, password, confirmPassword })
              }
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-4'>
          <Button
            className='w-full'
            disabled={
              !email ||
              password.length < 6 ||
              password !== confirmPassword ||
              isPending
            }
            onClick={(e) => {
              e.preventDefault();
              mutate({ email, password, confirmPassword });
            }}
            type='submit'
          >
            {isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Create Account'
            )}
          </Button>
          <span className='align-middle text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Button className='text-sky-500 p-0' variant='link' asChild>
              <Link to='/login'>Sign in</Link>
            </Button>
          </span>
        </CardFooter>
      </Card>
    </form>
  );
};
export default Register;
