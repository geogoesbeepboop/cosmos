import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Bot, Library, Plus, FileText, Upload, Star, Users, BookOpen } from 'lucide-react';

export function HomePage() {
  const features = [
    {
      icon: Library,
      title: 'Extensive Library',
      description: 'Access thousands of AI prompts, custom instructions, and workflow bundles created by the community.',
      link: '/library'
    },
    {
      icon: Plus,
      title: 'AI-Powered Enhancement',
      description: 'Transform your basic prompts into optimized, professional-grade instructions using our AI enhancement tools.',
      link: '/create-prompt'
    },
    {
      icon: FileText,
      title: 'Mermaid Diagrams',
      description: 'Convert text descriptions into beautiful Mermaid diagrams with our intelligent text-to-diagram generator.',
      link: '/create-mermaid'
    },
    {
      icon: Upload,
      title: 'Share Your Work',
      description: 'Contribute your own prompts and instructions to help the developer community grow and improve.',
      link: '/submit'
    }
  ];

  const stats = [
    { icon: BookOpen, label: 'Total Prompts', value: '2,547' },
    { icon: Users, label: 'Community Members', value: '12,431' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: FileText, label: 'Mermaid Diagrams', value: '1,892' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Bot className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">PromptsHQ</h1>
        </div>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          The ultimate platform for managing, sharing, and generating AI prompts, custom copilot instructions, 
          and Mermaid diagrams. Optimize your AI workflows with our comprehensive toolkit.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/library">
              <Library className="h-5 w-5 mr-2" />
              Explore Library
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/create-prompt">
              <Plus className="h-5 w-5 mr-2" />
              Create Prompt
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="text-center">
            <CardContent className="pt-6">
              <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{value}</div>
              <p className="text-sm text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map(({ icon: Icon, title, description, link }) => (
            <Card key={title} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <CardTitle>{title}</CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <Link to={link}>
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to optimize your AI workflows?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of developers, project managers, and technical professionals who are already 
          streamlining their AI interactions with our platform.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/library">Start Exploring</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/submit">Contribute Content</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}