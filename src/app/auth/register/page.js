import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthForm type="register" title="Create a new account" />
    </AuthLayout>
  );
}