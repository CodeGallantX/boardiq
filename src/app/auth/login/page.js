import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" title="Sign in to your account" />
    </AuthLayout>
  );
}