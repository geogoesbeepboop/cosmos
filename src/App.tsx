import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "./components/ui/sonner";
import { Navigation } from './components/Navigation';
import { HomePage } from './components/pages/HomePage';
import { LibraryPage } from './components/pages/LibraryPage';
import { LibraryDetailsPage } from './components/pages/LibraryDetailsPage';
import { CreatePromptPage } from './components/pages/CreatePromptPage';
import { CreateMermaidPage } from './components/pages/CreateMermaidPage';
import { SubmitPage } from './components/pages/SubmitPage';
import { MyPage } from './components/pages/MyPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:id" element={<LibraryDetailsPage />} />
            <Route path="/create-prompt" element={<CreatePromptPage />} />
            <Route path="/create-mermaid" element={<CreateMermaidPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/my-page" element={<MyPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}