import { ReactNode } from 'react';
import { CanteenSidebar } from './CanteenSidebar';

interface CanteenLayoutProps {
  children: ReactNode;
}

export const CanteenLayout = ({ children }: CanteenLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <CanteenSidebar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};
