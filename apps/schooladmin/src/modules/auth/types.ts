/**
 * @module auth/types
 * Authentication module types and interfaces
 */

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  variant?: 'login' | 'register' | 'forgot-password' | 'reset-password';
}

export interface AuthWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  bgImage?: string;
  className?: string;
  leftBgColor?: string;
}

export interface LoginFormValues {
  mobile: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile:number
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormValues {
  email: string;
}
export interface AuthContextType {
  isLoading: boolean;
  error: string | null;
  user: any | null;
}
