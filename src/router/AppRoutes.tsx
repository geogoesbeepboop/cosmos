import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home/HomePage';
import { LibraryPage } from '@/pages/library/LibraryPage';
import { LibraryDetailsPage } from '@/pages/library/LibraryDetailsPage';
import { CreatePromptPage } from '@/pages/create-prompt/CreatePromptPage';
import { CreateMermaidPage } from '@/pages/create-mermaid/CreateMermaidPage';
import { SubmitPage } from '@/pages/submit/SubmitPage';
import { MyPage } from '@/pages/my-page/MyPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/:id" element={<LibraryDetailsPage />} />
      <Route path="/create-prompt" element={<CreatePromptPage />} />
      <Route path="/create-mermaid" element={<CreateMermaidPage />} />
      <Route path="/submit" element={<SubmitPage />} />
      <Route path="/my-page" element={<MyPage />} />
    </Routes>
  );
}