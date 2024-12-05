import { SignInButton } from '@clerk/clerk-react';
import Button from './Button';
import loginImg from '../../../assets/login.svg';

export default function LoginButton() {
  return (
    <SignInButton mode="modal">
      <Button imgUrl={loginImg}>Login</Button>
    </SignInButton>
  );
}
