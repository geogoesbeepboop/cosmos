export interface ContentItem {
  id: string;
  type: 'prompt' | 'instructions' | 'bundle';
  title: string;
  description: string;
  content: string;
  author: string;
  category: string;
  techStack: string[];
  rating: number;
  createdDate: string;
  lastEdited: string;
  isBundle?: boolean;
  bundleItems?: string[];
}

export interface Submission {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs-changes';
  submittedDate: string;
  reviewDate?: string;
  feedback?: string;
}

export const categories = [
  'Development',
  'Testing',
  'Documentation',
  'Code Review',
  'Architecture',
  'Debugging',
  'DevOps',
  'API Design',
  'Database',
  'Security'
];

export const techStacks = [
  'React',
  'Python',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Java',
  'C#',
  'Go',
  'Rust',
  'Docker',
  'AWS',
  'GraphQL',
  'REST API',
  'MongoDB',
  'PostgreSQL'
];

export const mockContent: ContentItem[] = [
  {
    id: '1',
    type: 'prompt',
    title: 'React Component Code Review',
    description: 'A comprehensive prompt for reviewing React components with focus on performance, accessibility, and best practices.',
    content: `# React Component Code Review Prompt

Please review the following React component and provide feedback on:

## Areas to Evaluate:
1. **Performance Optimization**
   - Are there any unnecessary re-renders?
   - Is the component properly memoized where needed?
   - Are expensive calculations optimized?

2. **Accessibility**
   - Are ARIA labels properly implemented?
   - Is keyboard navigation supported?
   - Are color contrasts sufficient?

3. **Code Quality**
   - Is the component following React best practices?
   - Are prop types clearly defined?
   - Is error handling implemented?

4. **Maintainability**
   - Is the code well-documented?
   - Are functions and variables clearly named?
   - Is the component properly structured?

Please provide specific suggestions for improvement and rate the overall code quality from 1-10.`,
    author: 'alexdev',
    category: 'Code Review',
    techStack: ['React', 'TypeScript', 'JavaScript'],
    rating: 4.8,
    createdDate: '2024-01-15',
    lastEdited: '2024-01-20'
  },
  {
    id: '2',
    type: 'instructions',
    title: 'API Documentation Assistant',
    description: 'Custom instructions for generating comprehensive API documentation with examples and best practices.',
    content: `# API Documentation Assistant Instructions

You are an expert technical writer specializing in API documentation. Your role is to create clear, comprehensive, and developer-friendly API documentation.

## Core Responsibilities:
- Generate detailed endpoint descriptions
- Provide realistic request/response examples
- Include error handling scenarios
- Add authentication requirements
- Suggest rate limiting information

## Documentation Structure:
1. **Endpoint Overview**
   - HTTP method and URL
   - Brief description
   - Authentication requirements

2. **Parameters**
   - Path parameters
   - Query parameters
   - Request body schema

3. **Response Format**
   - Success responses with examples
   - Error responses with status codes
   - Response schema definitions

4. **Code Examples**
   - cURL examples
   - JavaScript/Node.js examples
   - Python examples

## Writing Style:
- Use clear, concise language
- Provide practical examples
- Include common use cases
- Add troubleshooting tips

Always ensure documentation is up-to-date and follows OpenAPI/Swagger standards where applicable.`,
    author: 'docmaster',
    category: 'Documentation',
    techStack: ['REST API', 'Node.js', 'Python'],
    rating: 4.9,
    createdDate: '2024-01-10',
    lastEdited: '2024-01-18'
  },
  {
    id: '3',
    type: 'bundle',
    title: 'Full-Stack Development Toolkit',
    description: 'Complete bundle for full-stack development including prompts for frontend, backend, database design, and testing.',
    content: 'This bundle contains comprehensive prompts and instructions for full-stack development workflow.',
    author: 'fullstackpro',
    category: 'Development',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    rating: 4.7,
    createdDate: '2024-01-05',
    lastEdited: '2024-01-22',
    isBundle: true,
    bundleItems: ['Frontend Component Generator', 'Backend API Builder', 'Database Schema Designer', 'Test Case Creator']
  },
  {
    id: '4',
    type: 'prompt',
    title: 'Database Query Optimizer',
    description: 'Analyze and optimize SQL queries for better performance and efficiency.',
    content: `# SQL Query Optimization Prompt

Please analyze the provided SQL query and suggest optimizations for:

## Performance Analysis:
1. **Query Execution Plan**
   - Identify table scans vs index usage
   - Check for unnecessary JOINs
   - Analyze WHERE clause efficiency

2. **Index Recommendations**
   - Suggest new indexes if needed
   - Identify unused indexes
   - Recommend composite indexes

3. **Query Rewriting**
   - Suggest alternative query structures
   - Optimize subqueries vs JOINs
   - Recommend UNION vs OR optimizations

4. **Performance Metrics**
   - Estimate execution time improvement
   - Calculate resource usage reduction
   - Suggest monitoring strategies

Please provide the optimized query along with explanations for each change made.`,
    author: 'dbexpert',
    category: 'Database',
    techStack: ['PostgreSQL', 'MongoDB'],
    rating: 4.6,
    createdDate: '2024-01-12',
    lastEdited: '2024-01-19'
  },
  {
    id: '5',
    type: 'instructions',
    title: 'Security Audit Assistant',
    description: 'Instructions for conducting comprehensive security audits of web applications.',
    content: `# Security Audit Assistant Instructions

You are a cybersecurity expert conducting thorough security audits for web applications. Focus on identifying vulnerabilities and providing actionable remediation steps.

## Audit Areas:

### 1. Authentication & Authorization
- Check for weak password policies
- Verify session management
- Test OAuth implementations
- Review JWT token handling

### 2. Data Protection
- Analyze encryption methods
- Check for data leaks
- Review backup security
- Assess compliance (GDPR, CCPA)

### 3. API Security
- Test for injection attacks
- Verify rate limiting
- Check CORS configuration
- Review API versioning security

### 4. Infrastructure Security
- Analyze server configurations
- Check for outdated dependencies
- Review deployment security
- Assess monitoring capabilities

## Reporting Format:
- Severity levels (Critical, High, Medium, Low)
- Risk assessment scores
- Step-by-step remediation guides
- Timeline recommendations

Always provide practical, implementable solutions with code examples where applicable.`,
    author: 'securitypro',
    category: 'Security',
    techStack: ['JavaScript', 'Node.js', 'AWS'],
    rating: 4.9,
    createdDate: '2024-01-08',
    lastEdited: '2024-01-21'
  },
  {
    id: '6',
    type: 'prompt',
    title: 'Docker Optimization Guide',
    description: 'Optimize Docker containers for production deployment with security and performance best practices.',
    content: `# Docker Container Optimization Prompt

Please review and optimize the provided Dockerfile and container setup for:

## Optimization Areas:

1. **Image Size Reduction**
   - Use multi-stage builds
   - Minimize layers
   - Choose optimal base images
   - Remove unnecessary packages

2. **Security Hardening**
   - Run as non-root user
   - Scan for vulnerabilities
   - Limit container capabilities
   - Use secrets management

3. **Performance Tuning**
   - Optimize resource limits
   - Configure health checks
   - Set appropriate restart policies
   - Use efficient networking

4. **Production Readiness**
   - Add proper logging
   - Configure monitoring
   - Set up graceful shutdowns
   - Implement backup strategies

Provide the optimized Dockerfile and docker-compose.yml with detailed explanations for each improvement.`,
    author: 'devopsmaster',
    category: 'DevOps',
    techStack: ['Docker', 'AWS', 'Node.js'],
    rating: 4.5,
    createdDate: '2024-01-14',
    lastEdited: '2024-01-20'
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: 's1',
    title: 'GraphQL Schema Validator',
    status: 'pending',
    submittedDate: '2024-01-23',
  },
  {
    id: 's2',
    title: 'React Hook Testing Guide',
    status: 'approved',
    submittedDate: '2024-01-20',
    reviewDate: '2024-01-22',
  },
  {
    id: 's3',
    title: 'CSS Performance Analyzer',
    status: 'needs-changes',
    submittedDate: '2024-01-18',
    reviewDate: '2024-01-21',
    feedback: 'Please add more specific examples and include browser compatibility information.'
  }
];

export const mockFavorites = ['1', '2', '5'];
export const mockDrafts = [
  {
    id: 'd1',
    title: 'Microservices Architecture Guide',
    type: 'prompt',
    lastEdited: '2024-01-23'
  },
  {
    id: 'd2',
    title: 'TypeScript Best Practices',
    type: 'instructions',
    lastEdited: '2024-01-22'
  }
];