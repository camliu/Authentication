import ResetPasswordForm from '@/components/ResetPasswordForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const exp = Number(searchParams.get('exp'));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  return (
    <form className='min-h-screen flex flex-col justify-center'>
      {linkIsValid ? (
        <ResetPasswordForm code={code} />
      ) : (
        <>
          <Alert className='mx-auto w-fit'>
            <AlertCircle className='h-5 w-5' />
            <AlertTitle className='ml-2'>Invalid Link</AlertTitle>
            <AlertDescription className='mt-3 ml-2'>
              The link is either invalid or expired.
            </AlertDescription>
          </Alert>
          <Button className='text-sky-500 mt-2' variant='link' asChild>
            <Link to='/password/forgot'>Request a new password reset link</Link>
          </Button>
        </>
      )}
    </form>
  );
};
export default ResetPassword;
