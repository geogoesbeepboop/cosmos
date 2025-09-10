import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/interactive/button';
import { Badge } from '@/components/ui/data-display/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/layout/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/interactive/collapsible';
import { 
  ArrowLeft, 
  Star, 
  Copy, 
  Download, 
  User, 
  Calendar, 
  ChevronDown,
  ChevronRight,
  Package,
  FileText,
  Settings,
  Heart
} from 'lucide-react';
import { toast } from "sonner";
import { mockContent } from '@/utils/mockData';
import type { ContentItem } from '@/utils/mockData';

export function LibraryDetailsPage() {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const content = mockContent.find(item => item.id === id);

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested content could not be found.</p>
          <Button asChild>
            <Link to="/library">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'prompt':
        return <FileText className="h-5 w-5" />;
      case 'instructions':
        return <Settings className="h-5 w-5" />;
      case 'bundle':
        return <Package className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: ContentItem['type']) => {
    switch (type) {
      case 'prompt':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'instructions':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'bundle':
        return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content.content);
    toast.success("Content copied to clipboard!");
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content.content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${content.title.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Download started!");
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast.success(`Rated ${rating} stars!`);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites!");
  };

  const toggleBundleItem = (itemTitle: string) => {
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(item => item !== itemTitle)
        : [...prev, itemTitle]
    );
  };

  const renderMarkdownContent = (content: string) => {
    // Simple markdown rendering for demo purposes
    const lines = content.split('\n');
    return (
      <div className="prose prose-sm max-w-none">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-semibold mt-5 mb-3">{line.slice(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{line.slice(4)}</h3>;
          } else if (line.startsWith('- ')) {
            return (
              <li key={index} className="ml-6 mb-1 list-disc">
                {line.slice(2)}
              </li>
            );
          } else if (line.startsWith('1. ') || line.match(/^\d+\. /)) {
            return (
              <li key={index} className="ml-6 mb-1 list-decimal">
                {line.replace(/^\d+\. /, '')}
              </li>
            );
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-3">{line}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/library">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={`${getTypeColor(content.type)} flex items-center gap-2`}>
                {getTypeIcon(content.type)}
                {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
              </Badge>
              {content.isBundle && (
                <Badge variant="outline">
                  {content.bundleItems?.length} items
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold">{content.title}</h1>
            <p className="text-muted-foreground text-lg">{content.description}</p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {content.techStack.map(tech => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 lg:min-w-[200px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{content.rating}</span>
              </div>
              
              {/* User Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`h-4 w-4 cursor-pointer transition-colors ${
                      star <= userRating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" onClick={handleDownload} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="icon" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>by: {content.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Created: {new Date(content.createdDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Updated: {new Date(content.lastEdited).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {content.isBundle && content.bundleItems ? (
          // Bundle View
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Bundle Contents</h2>
            {content.bundleItems.map((itemTitle, index) => (
              <Card key={index}>
                <Collapsible
                  open={expandedItems.includes(itemTitle)}
                  onOpenChange={() => toggleBundleItem(itemTitle)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{itemTitle}</CardTitle>
                        {expandedItems.includes(itemTitle) ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Sample content for {itemTitle}:</p>
                        <div className="text-sm">
                          {/* Mock content for bundle items */}
                          <p>This is a detailed prompt/instruction for {itemTitle.toLowerCase()}. It includes comprehensive guidelines, examples, and best practices for optimal results.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Item
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download Item
                        </Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
            
            <div className="flex gap-2">
              <Button onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy All Items
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download Bundle
              </Button>
            </div>
          </div>
        ) : (
          // Single Item View
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6">
                {renderMarkdownContent(content.content)}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}