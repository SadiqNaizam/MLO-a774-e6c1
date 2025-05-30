import React, { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm, { LoginFormValues } from '@/components/Authentication/LoginForm';
// To enable navigation, uncomment the following line and the navigate calls if using react-router-dom:
// import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  // const navigate = useNavigate(); // Uncomment for navigation with react-router-dom

  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setSubmissionError(null);
    console.log('Attempting login with:', values);

    // Simulate API call
    try {
      // Simulate a network delay to mimic an API request
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Example: Simplified credential check
      // In a real application, this would involve sending 'values' to a backend API for authentication.
      // For example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Login failed');
      // }
      // const userData = await response.json();
      // console.log('Login successful for:', userData.email);
      // navigate('/dashboard'); // Navigate to a protected route on success

      if (values.email === 'test@example.com' && values.password === 'password123') {
        console.log('Login successful for:', values.email);
        // Placeholder for successful login action, e.g., storing token, redirecting
        // alert('Login successful!'); // Example UI feedback
        // navigate('/dashboard'); // Example navigation
      } else {
        console.log('Login failed: Invalid credentials');
        setSubmissionError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('An unexpected error occurred during login:', error);
      if (error instanceof Error) {
        setSubmissionError(error.message); // Display specific error message from backend if available
      } else {
        setSubmissionError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // The LoginForm component internally handles its links (Forgot Password, Sign Up).
  // If page-level control or navigation for these links is needed,
  // LoginForm could be modified to accept callback props for these actions, e.g.:
  // onForgotPassword={() => navigate('/forgot-password')}
  // onSignUp={() => navigate('/signup')}

  return (
    <AuthLayout title="Welcome">
      <LoginForm
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
      />
      {submissionError && (
        <p className="mt-4 text-center text-sm text-destructive">
          {submissionError}
        </p>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
