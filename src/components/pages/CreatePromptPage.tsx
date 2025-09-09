import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Sparkles, 
  Copy, 
  Download, 
  Save, 
  Upload, 
  Loader2,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import { toast } from "sonner@2.0.3";

const aiModels = [
  'GPT-4',
  'GPT-3.5 Turbo',
  'Claude 3.5 Sonnet',
  'Claude 3 Haiku',
  'Gemini Pro',
  'Gemini Flash',
  'Llama 3.1',
  'Custom Model'
];

const enhancementOptions = [
  { id: 'clarity', label: 'Improve Clarity', description: 'Make instructions clearer and more precise' },
  { id: 'context', label: 'Add Context', description: 'Include relevant background information' },
  { id: 'examples', label: 'Add Examples', description: 'Include practical examples and use cases' },
  { id: 'structure', label: 'Better Structure', description: 'Organize content with clear sections' },
  { id: 'constraints', label: 'Add Constraints', description: 'Include helpful limitations and guidelines' },
  { id: 'output-format', label: 'Output Format', description: 'Specify desired response format' }
];

export function CreatePromptPage() {
  const [selectedModel, setSelectedModel] = useState('');
  const [rawPrompt, setRawPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [promptTitle, setPromptTitle] = useState('');
  const [promptDescription, setPromptDescription] = useState('');

  const handleEnhancementToggle = (enhancementId: string) => {
    setSelectedEnhancements(prev => 
      prev.includes(enhancementId)
        ? prev.filter(id => id !== enhancementId)
        : [...prev, enhancementId]
    );
  };

  const handleEnhance = async () => {
    if (!rawPrompt.trim()) {
      toast.error("Please enter a prompt to enhance.");
      return;
    }

    if (!selectedModel) {
      toast.error("Please select an AI model.");
      return;
    }

    setIsEnhancing(true);
    
    // Simulate AI enhancement process
    setTimeout(() => {
      const enhanced = generateEnhancedPrompt(rawPrompt, selectedEnhancements);
      setEnhancedPrompt(enhanced);
      setIsEnhancing(false);
      toast.success("Prompt enhanced successfully!");
    }, 2500);
  };

  const generateEnhancedPrompt = (original: string, enhancements: string[]) => {
    let enhanced = `# Enhanced AI Prompt\n\n## Objective\n${original}\n\n`;

    if (enhancements.includes('context')) {
      enhanced += `## Context\nThis prompt is designed for ${selectedModel} to provide comprehensive and accurate responses. Consider the following background:\n- Target audience: Technical professionals\n- Expected output quality: High precision and detail\n- Use case: Professional workflow optimization\n\n`;
    }

    if (enhancements.includes('structure')) {
      enhanced += `## Instructions\nPlease follow these structured guidelines:\n\n### 1. Analysis Phase\n- Review the provided information thoroughly\n- Identify key requirements and constraints\n- Consider potential edge cases\n\n### 2. Response Structure\n- Provide a clear, organized response\n- Use headings and bullet points for clarity\n- Include relevant examples where appropriate\n\n`;
    }

    if (enhancements.includes('examples')) {
      enhanced += `## Examples\nHere are some example scenarios to guide your response:\n\n**Example 1:**\n- Input: [Sample input]\n- Expected output: [Sample output]\n- Rationale: [Explanation]\n\n**Example 2:**\n- Input: [Alternative input]\n- Expected output: [Alternative output]\n- Rationale: [Explanation]\n\n`;
    }

    if (enhancements.includes('constraints')) {
      enhanced += `## Constraints and Guidelines\n- Response length: Aim for comprehensive yet concise answers\n- Technical accuracy: Ensure all technical details are correct\n- Clarity: Use clear, professional language\n- Actionability: Provide practical, implementable advice\n\n`;
    }

    if (enhancements.includes('output-format')) {
      enhanced += `## Expected Output Format\nPlease structure your response as follows:\n\n1. **Summary** (2-3 sentences)\n2. **Detailed Analysis** (organized sections)\n3. **Recommendations** (actionable items)\n4. **Next Steps** (if applicable)\n\n`;
    }

    enhanced += `## Quality Criteria\nEnsure your response meets these standards:\n- ✅ Accuracy and reliability\n- ✅ Clarity and readability\n- ✅ Practical applicability\n- ✅ Comprehensive coverage\n\n---\n\n**Original Prompt:** ${original}`;

    return enhanced;
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Download started!");
  };

  const handleSaveDraft = () => {
    if (!promptTitle.trim()) {
      toast.error("Please enter a title for your prompt.");
      return;
    }
    toast.success("Prompt saved to drafts!");
  };

  const handleSubmitToLibrary = () => {
    if (!promptTitle.trim() || !promptDescription.trim() || !enhancedPrompt.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Prompt submitted to library for review!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Prompt Enhancer</h1>
        <p className="text-muted-foreground">
          Transform your basic prompts into optimized, professional-grade instructions using AI enhancement.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Input Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Target AI Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model..." />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map(model => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Raw Prompt</label>
                <Textarea
                  placeholder="Enter your basic prompt here... 

For example: 'Help me write better code' or 'Review my API design'"
                  value={rawPrompt}
                  onChange={(e) => setRawPrompt(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Enhancement Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enhancementOptions.map(option => (
                  <div key={option.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={option.id}
                      checked={selectedEnhancements.includes(option.id)}
                      onCheckedChange={() => handleEnhancementToggle(option.id)}
                    />
                    <div className="space-y-1">
                      <label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                        {option.label}
                      </label>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleEnhance} 
                disabled={isEnhancing || !rawPrompt.trim() || !selectedModel}
                className="w-full mt-6"
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enhancing Prompt...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enhance Prompt
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Enhanced Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="raw">Raw Text</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-[400px] max-h-[600px] overflow-y-auto border rounded-lg p-4">
                    {enhancedPrompt ? (
                      <div className="prose prose-sm max-w-none">
                        {enhancedPrompt.split('\n').map((line, index) => {
                          if (line.startsWith('# ')) {
                            return <h1 key={index} className="text-xl font-bold mt-4 mb-2">{line.slice(2)}</h1>;
                          } else if (line.startsWith('## ')) {
                            return <h2 key={index} className="text-lg font-semibold mt-3 mb-2">{line.slice(3)}</h2>;
                          } else if (line.startsWith('### ')) {
                            return <h3 key={index} className="text-base font-medium mt-2 mb-1">{line.slice(4)}</h3>;
                          } else if (line.startsWith('- ')) {
                            return <li key={index} className="ml-4 mb-1">{line.slice(2)}</li>;
                          } else if (line.trim() === '') {
                            return <br key={index} />;
                          } else {
                            return <p key={index} className="mb-2">{line}</p>;
                          }
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Enhanced prompt will appear here</p>
                          <p className="text-sm">Configure your input and click "Enhance Prompt"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="raw" className="mt-4">
                  <Textarea
                    value={enhancedPrompt}
                    onChange={(e) => setEnhancedPrompt(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Enhanced prompt content will appear here..."
                  />
                </TabsContent>
              </Tabs>

              {enhancedPrompt && (
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCopy(enhancedPrompt)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(enhancedPrompt, 'enhanced-prompt.md')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {enhancedPrompt && (
            <Card>
              <CardHeader>
                <CardTitle>Save or Submit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt Title</label>
                  <Input
                    placeholder="Enter a descriptive title..."
                    value={promptTitle}
                    onChange={(e) => setPromptTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Briefly describe what this prompt does..."
                    value={promptDescription}
                    onChange={(e) => setPromptDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSaveDraft} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={handleSubmitToLibrary} className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit to Library
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}