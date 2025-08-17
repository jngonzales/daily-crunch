import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { Sparkles } from 'lucide-react';

type AuthMode = 'login' | 'signup' | 'forgot-password';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onSwitchToSignup={() => setMode('signup')}
            onSwitchToForgotPassword={() => setMode('forgot-password')}
          />
        );
      case 'signup':
        return (
          <SignupForm
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBackToLogin={() => setMode('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-gradient-hero shadow-glow">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">TechNews AI</h1>
          <p className="text-muted-foreground">
            {mode === 'login' && 'Sign in to your account'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot-password' && 'Reset your password'}
          </p>
        </div>

        {/* Form */}
        {renderForm()}
      </div>
    </div>
  );
}