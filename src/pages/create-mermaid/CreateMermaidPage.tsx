import React, { useState } from 'react';
import { Button } from '@/components/ui/interactive/button';
import { Textarea } from '@/components/ui/forms/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/forms/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/layout/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/navigation/tabs';
import { Badge } from '@/components/ui/data-display/badge';
import { 
  FileText, 
  Copy, 
  Download, 
  Save, 
  Upload, 
  Loader2,
  RefreshCw,
  Eye,
  Code,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from "sonner";

const diagramTypes = [
  { value: 'flowchart', label: 'Flowchart', description: 'Process flows and decision trees' },
  { value: 'sequence', label: 'Sequence Diagram', description: 'Interactions between objects over time' },
  { value: 'class', label: 'Class Diagram', description: 'Object-oriented class relationships' },
  { value: 'state', label: 'State Diagram', description: 'State transitions and behaviors' },
  { value: 'er', label: 'Entity Relationship', description: 'Database relationships' },
  { value: 'gantt', label: 'Gantt Chart', description: 'Project timelines and schedules' },
  { value: 'pie', label: 'Pie Chart', description: 'Data distribution visualization' },
  { value: 'gitgraph', label: 'Git Graph', description: 'Git branch and merge visualization' }
];

const exampleDescriptions = {
  flowchart: "Create a flowchart showing the user registration process: start -> check if email exists -> if yes, show error -> if no, create account -> send verification email -> end",
  sequence: "Show the sequence of API calls between a web client, authentication service, and database when a user logs in",
  class: "Design a class diagram for an e-commerce system with User, Product, Order, and Payment classes",
  state: "Model the states of an order: pending -> confirmed -> processing -> shipped -> delivered",
  er: "Create an entity relationship diagram for a blog system with users, posts, comments, and tags",
  gantt: "Project timeline for developing a mobile app: planning (2 weeks) -> design (3 weeks) -> development (8 weeks) -> testing (2 weeks) -> deployment (1 week)",
  pie: "Show the distribution of programming languages used in our codebase",
  gitgraph: "Visualize a git workflow with main branch, feature branches, and merge points"
};

export function CreateMermaidPage() {
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [diagramTitle, setDiagramTitle] = useState('');

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description for your diagram.");
      return;
    }

    if (!selectedType) {
      toast.error("Please select a diagram type.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      const code = generateMermaidCode(description, selectedType);
      setGeneratedCode(code);
      setIsGenerating(false);
      toast.success("Mermaid diagram generated successfully!");
    }, 2000);
  };

  const generateMermaidCode = (desc: string, type: string): string => {
    // Generate mock Mermaid code based on type and description
    switch (type) {
      case 'flowchart':
        return `flowchart TD
    A[Start] --> B{Email exists?}
    B -->|Yes| C[Show error message]
    B -->|No| D[Create account]
    C --> E[End]
    D --> F[Send verification email]
    F --> G[Account created successfully]
    G --> E
    
    classDef startEnd fill:#e1f5fe
    classDef process fill:#f3e5f5
    classDef decision fill:#fff3e0
    
    class A,E startEnd
    class D,F,G process
    class B decision`;

      case 'sequence':
        return `sequenceDiagram
    participant C as Web Client
    participant A as Auth Service
    participant D as Database
    
    C->>A: POST /login (credentials)
    A->>D: Query user by email
    D-->>A: User data
    A->>A: Verify password
    A->>D: Update last login
    D-->>A: Success
    A-->>C: JWT token + user info
    
    Note over C,D: Successful authentication flow`;

      case 'class':
        return `classDiagram
    class User {
        +Long id
        +String email
        +String name
        +Date createdAt
        +register()
        +login()
        +updateProfile()
    }
    
    class Product {
        +Long id
        +String name
        +BigDecimal price
        +String description
        +Integer stock
        +updateStock()
        +getDetails()
    }
    
    class Order {
        +Long id
        +Date orderDate
        +OrderStatus status
        +BigDecimal total
        +calculateTotal()
        +updateStatus()
    }
    
    class Payment {
        +Long id
        +PaymentMethod method
        +BigDecimal amount
        +PaymentStatus status
        +processPayment()
        +refund()
    }
    
    User ||--o{ Order : places
    Order ||--o{ Product : contains
    Order ||--|| Payment : has`;

      case 'state':
        return `stateDiagram-v2
    [*] --> Pending
    Pending --> Confirmed : Payment received
    Pending --> Cancelled : Customer cancels
    Confirmed --> Processing : Order validated
    Processing --> Shipped : Items dispatched
    Shipped --> Delivered : Customer receives
    Delivered --> [*]
    Cancelled --> [*]
    
    Processing --> Cancelled : Out of stock
    Shipped --> Returned : Customer returns
    Returned --> Refunded
    Refunded --> [*]`;

      case 'er':
        return `erDiagram
    USER {
        int user_id PK
        string email UK
        string username UK
        string password_hash
        datetime created_at
        datetime updated_at
    }
    
    POST {
        int post_id PK
        int user_id FK
        string title
        text content
        datetime published_at
        datetime updated_at
        boolean is_published
    }
    
    COMMENT {
        int comment_id PK
        int post_id FK
        int user_id FK
        text content
        datetime created_at
        boolean is_approved
    }
    
    TAG {
        int tag_id PK
        string name UK
        string slug UK
        string description
    }
    
    POST_TAG {
        int post_id PK,FK
        int tag_id PK,FK
    }
    
    USER ||--o{ POST : "writes"
    USER ||--o{ COMMENT : "writes"
    POST ||--o{ COMMENT : "has"
    POST }o--o{ TAG : "tagged with"`;

      case 'gantt':
        return `gantt
    title Mobile App Development Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements Analysis    :done, req, 2024-01-01, 2024-01-14
    Architecture Design     :done, arch, 2024-01-08, 2024-01-21
    
    section Design
    UI/UX Design            :active, design, 2024-01-15, 2024-02-05
    Prototyping             :design-proto, after design, 7d
    
    section Development
    Backend Development     :dev-back, 2024-02-06, 2024-04-01
    Frontend Development    :dev-front, 2024-02-13, 2024-04-08
    Integration             :integration, after dev-back, 14d
    
    section Testing
    Unit Testing            :test-unit, after dev-front, 7d
    Integration Testing     :test-int, after integration, 7d
    User Acceptance Testing :test-uat, after test-int, 7d
    
    section Deployment
    Production Setup        :deploy-setup, after test-uat, 3d
    App Store Submission    :deploy-store, after deploy-setup, 4d`;

      default:
        return `flowchart TD
    A[Start] --> B[Process Description]
    B --> C[Generate Diagram]
    C --> D[Review Output]
    D --> E[End]`;
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${diagramTitle || 'mermaid-diagram'}.mmd`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Mermaid code downloaded!");
  };

  const handleDownloadPNG = () => {
    // In a real implementation, this would generate a PNG from the Mermaid code
    toast.success("PNG download would be implemented with Mermaid rendering library!");
  };

  const handleRegenerate = () => {
    if (generatedCode) {
      handleGenerate();
    }
  };

  const loadExample = () => {
    if (selectedType && exampleDescriptions[selectedType as keyof typeof exampleDescriptions]) {
      setDescription(exampleDescriptions[selectedType as keyof typeof exampleDescriptions]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mermaid Diagram Generator</h1>
        <p className="text-muted-foreground">
          Convert your text descriptions into beautiful Mermaid diagrams with AI-powered generation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Diagram Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Diagram Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diagram type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {diagramTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedType && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={loadExample}
                    className="mt-2"
                  >
                    Load Example Description
                  </Button>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe your diagram in plain text...

For example: 'Create a flowchart showing the user authentication process' or 'Show the database relationships for an e-commerce system'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !description.trim() || !selectedType}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Diagram...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Mermaid Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedCode && (
            <Card>
              <CardHeader>
                <CardTitle>Save Diagram</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Diagram Title</label>
                  <input
                    type="text"
                    placeholder="Enter a title for your diagram..."
                    value={diagramTitle}
                    onChange={(e) => setDiagramTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => toast.success("Saved to drafts!")} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={() => toast.success("Submitted to library!")} className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit to Library
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Generated Output
                </CardTitle>
                {generatedCode && (
                  <Button variant="outline" size="sm" onClick={handleRegenerate}>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="code">
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="preview">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="png">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    PNG
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="code" className="mt-4">
                  <div className="space-y-4">
                    <div className="min-h-[400px] max-h-[600px] overflow-y-auto border rounded-lg p-4 bg-muted/30">
                      {generatedCode ? (
                        <pre className="text-sm font-mono whitespace-pre-wrap">{generatedCode}</pre>
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <div className="text-center">
                            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Mermaid code will appear here</p>
                            <p className="text-sm">Describe your diagram and click "Generate"</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {generatedCode && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(generatedCode)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Code
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleDownloadCode}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download .mmd
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-[400px] border rounded-lg p-4 bg-background">
                    {generatedCode ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-4">
                          <div className="p-8 border-2 border-dashed border-muted-foreground rounded-lg">
                            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-lg font-medium">Live Diagram Preview</p>
                            <p className="text-sm text-muted-foreground">
                              In a production environment, this would render the Mermaid diagram
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {selectedType} diagram
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Diagram preview will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="png" className="mt-4">
                  <div className="space-y-4">
                    <div className="min-h-[400px] border rounded-lg p-4 bg-background">
                      {generatedCode ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center space-y-4">
                            <div className="p-8 border-2 border-dashed border-muted-foreground rounded-lg">
                              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                              <p className="text-lg font-medium">PNG Export</p>
                              <p className="text-sm text-muted-foreground">
                                High-quality PNG export of your diagram
                              </p>
                              <Badge variant="outline" className="mt-2">
                                Ready for download
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>PNG export will be available after generation</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {generatedCode && (
                      <Button 
                        variant="outline" 
                        onClick={handleDownloadPNG}
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PNG
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}