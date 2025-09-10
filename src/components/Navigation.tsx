import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/interactive/button';
import { Bot, Library, Plus, FileText, Upload, User } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Bot },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/create-prompt', label: 'Create Prompt', icon: Plus },
    { path: '/create-mermaid', label: 'Create Mermaid', icon: FileText },
    { path: '/submit', label: 'Submit Your Own', icon: Upload },
    { path: '/my-page', label: 'My Page', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">PromptsHQ</span>
          </Link>
          
          <div className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Button
                  key={path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <Link to={path}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}