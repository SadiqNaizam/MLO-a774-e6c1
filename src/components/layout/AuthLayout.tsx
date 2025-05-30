import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string; // Applied to the Card component
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, className }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <Card className={cn(
        "w-[300px] shadow-md rounded-md", // Specific styling for the auth card as per requirements.
                                          // bg-card is default for Card. text-card-foreground is inherited or default.
        className 
      )}>
        {title && (
          // CardHeader default padding is p-6. Overriding pb-0 as CardTitle below has mb-6.
          // text-center aligns the title as required.
          <CardHeader className="p-6 pb-0 text-center">
            {/* Styling for the title as per requirements (e.g., 'Welcome' heading) */}
            <CardTitle className="text-2xl font-semibold tracking-tight text-card-foreground mb-6">
              {title}
            </CardTitle>
          </CardHeader>
        )}
        
        {/* 
          CardContent default top padding is pt-0.
          If a title/CardHeader is present, its bottom margin/padding handles spacing, so pt-0 is correct.
          If no title/CardHeader, CardContent needs its own top padding, hence conditional pt-6.
        */}
        <CardContent className={cn(
          "p-6", // Base padding for content (applied to px, pb).
          title ? "pt-0" : "pt-6" // Conditional top padding.
        )}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
