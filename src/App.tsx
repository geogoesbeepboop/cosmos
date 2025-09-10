import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "@/components/ui/feedback/sonner";
import { Navigation } from '@/components/Navigation';
import { AppRoutes } from '@/router/AppRoutes';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <AppRoutes />
        </main>
        <Toaster />
      </div>
    </Router>
  );
}