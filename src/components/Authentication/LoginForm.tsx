import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Zod schema for form validation
const loginFormSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z.string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Type for form values, inferred from Zod schema
export type LoginFormValues = z.infer<typeof loginFormSchema>;

// Props interface for LoginForm component
interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  isLoading?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, className }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handles form submission by calling the passed onSubmit prop
  const handleFormSubmit = async (values: LoginFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-card-foreground">Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  className="bg-card border-input text-card-foreground placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-card-foreground">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  className="bg-card border-input text-card-foreground placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end text-sm">
          <Button
            variant="link"
            type="button"
            className="px-0 h-auto py-0 text-primary hover:text-primary/90 font-normal text-sm"
            // Example onClick, real navigation would be handled by parent or router context
            // onClick={() => console.log('Forgot Password clicked')}
          >
            Forgot Password?
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isLoading || form.formState.isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring"
        >
          {(isLoading || form.formState.isSubmitting) ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Button
            variant="link"
            type="button"
            className="px-0 h-auto py-0 text-primary hover:text-primary/90 font-normal text-sm align-baseline"
            // Example onClick, real navigation would be handled by parent or router context
            // onClick={() => console.log('Sign Up clicked')}
          >
            Sign Up
          </Button>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
