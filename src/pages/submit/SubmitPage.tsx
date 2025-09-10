import React, { useState } from 'react';
import { Button } from '@/components/ui/interactive/button';
import { Input } from '@/components/ui/forms/input';
import { Textarea } from '@/components/ui/forms/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/forms/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/layout/card';
import { Badge } from '@/components/ui/data-display/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/forms/radio-group';
import { Label } from '@/components/ui/forms/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/navigation/tabs';
import { 
  Upload, 
  Eye, 
  Code, 
  Plus, 
  X, 
  CheckCircle,
  FileText,
  Settings,
  Package
} from 'lucide-react';
import { toast } from "sonner";
import { categories, techStacks } from '@/utils/mockData';

export function SubmitPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [contentType, setContentType] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagSuggestionClick = (suggestedTag: string) => {
    if (!tags.includes(suggestedTag) && tags.length < 10) {
      setTags([...tags, suggestedTag]);
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }
    if (!contentType) {
      toast.error("Please select a content type.");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter the content.");
      return;
    }

    // Simulate submission
    setIsSubmitted(true);
    toast.success("Submission successful! We'll review this and get back to you in 48 hours.");
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setContentType('');
    setContent('');
    setTags([]);
    setNewTag('');
    setIsSubmitted(false);
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'prompt':
        return <FileText className="h-4 w-4" />;
      case 'instructions':
        return <Settings className="h-4 w-4" />;
      case 'bundle':
        return <Package className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    const lines = content.split('\n');
    return (
      <div className="prose prose-sm max-w-none">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-xl font-bold mt-4 mb-2">{line.slice(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={index} className="text-lg font-semibold mt-3 mb-2">{line.slice(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={index} className="text-base font-medium mt-2 mb-1">{line.slice(4)}</h3>;
          } else if (line.startsWith('- ')) {
            return <li key={index} className="ml-4 mb-1">{line.slice(2)}</li>;
          } else if (line.startsWith('1. ') || line.match(/^\d+\. /)) {
            return <li key={index} className="ml-4 mb-1 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-2">{line}</p>;
          }
        })}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold mb-4">Submission Successful!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for contributing to our community. We'll review your submission and get back to you within 48 hours.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Our team will review your content for quality and accuracy</li>
                    <li>We'll check for appropriate categorization and tagging</li>
                    <li>You'll receive an email notification with the review outcome</li>
                    <li>Approved content will be published to the library</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleReset}>
                    Submit Another
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/my-page'}>
                    View My Submissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Your Content</h1>
        <p className="text-muted-foreground">
          Share your AI prompts, instructions, or workflow bundles with the community.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Content Submission Form
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title *</label>
                <Input
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Category *</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description *</label>
              <Textarea
                placeholder="Provide a brief description of what your content does and how it can be used..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Content Type */}
            <div>
              <label className="text-sm font-medium mb-3 block">Content Type *</label>
              <RadioGroup value={contentType} onValueChange={setContentType}>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="prompt" id="prompt" />
                    <Label htmlFor="prompt" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Prompt</div>
                        <div className="text-xs text-muted-foreground">AI conversation starter</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="instructions" id="instructions" />
                    <Label htmlFor="instructions" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Instructions</div>
                        <div className="text-xs text-muted-foreground">Custom AI behavior guide</div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="bundle" id="bundle" />
                    <Label htmlFor="bundle" className="flex items-center gap-2 cursor-pointer">
                      <Package className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Bundle</div>
                        <div className="text-xs text-muted-foreground">Collection of related items</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddTag} size="icon" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {techStacks.slice(0, 8).map(tech => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleTagSuggestionClick(tech)}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Input with Preview */}
            <div>
              <label className="text-sm font-medium mb-2 block">Content *</label>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                  <TabsTrigger value="edit">
                    <Code className="h-4 w-4 mr-1" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="mt-4">
                  <Textarea
                    placeholder="Enter your content here... 

You can use Markdown formatting:
# Heading 1
## Heading 2
- Bullet points
1. Numbered lists

**Bold text** and *italic text*"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-[400px] border rounded-lg p-4 bg-muted/30">
                    {content ? (
                      renderPreview()
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Content preview will appear here</p>
                          <p className="text-sm">Switch to Edit tab to add content</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Submission Summary */}
            {(title || description || category || contentType || content || tags.length > 0) && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Submission Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {title && <div><span className="font-medium">Title:</span> {title}</div>}
                  {category && <div><span className="font-medium">Category:</span> {category}</div>}
                  {contentType && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Type:</span>
                      {getContentTypeIcon(contentType)}
                      {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                    </div>
                  )}
                  {tags.length > 0 && (
                    <div>
                      <span className="font-medium">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {content && (
                    <div>
                      <span className="font-medium">Content:</span> {content.length} characters
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmit} className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}