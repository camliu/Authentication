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
import { login } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const redirectUrl = location.state?.redirectUrl || '/';

  const { mutate, isPending, isError } = useMutation({
    mutationFn: login,

    onSuccess: () => {
      navigate(redirectUrl, {
        replace: true,
      });
    },
  });

  return (
    <form className='min-h-screen flex flex-col justify-center'>
      <Card className='mx-auto w-80'>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {isError && (
            <div className='mb-3 text-red-400'>Invalid email or password</div>
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
              onKeyDown={(e) =>
                e.key === 'Enter' && mutate({ email, password })
              }
            />
          </div>
        </CardContent>
        <Button
          className='flex justify-end text-sm mx-3 mb-2'
          variant='link'
          asChild
        >
          <Link className='text-sky-500' to='/password/forgot'>
            Forgot password?
          </Link>
        </Button>
        <CardFooter className='flex flex-col gap-4'>
          <Button
            className='w-full'
            disabled={!email || password.length < 6 || isPending}
            onClick={(e) => {
              e.preventDefault();
              mutate({ email, password });
            }}
            type='submit'
          >
            {isPending ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Sign in'
            )}
          </Button>

          <span className=' text-sm text-muted-foreground'>
            Don't have an account?{' '}
            <Button variant='link' asChild className='p-0 text-sky-500'>
              <Link to='/register'>Sign up</Link>
            </Button>
          </span>
        </CardFooter>
      </Card>
    </form>
  );
};
export default Login;
