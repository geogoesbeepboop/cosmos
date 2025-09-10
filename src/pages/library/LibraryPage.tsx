import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/interactive/button';
import { Input } from '@/components/ui/forms/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/forms/select';
import { Badge } from '@/components/ui/data-display/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/layout/card';
import { Search, Star, User, Calendar, Package, FileText, Settings } from 'lucide-react';
import { mockContent, categories, techStacks } from '@/utils/mockData';
import type { ContentItem } from '@/utils/mockData';

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedContent = useMemo(() => {
    let filtered = mockContent.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = contentTypeFilter === 'all' || item.type === contentTypeFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesTechStack = selectedTechStacks.length === 0 || 
        selectedTechStacks.some(tech => item.techStack.includes(tech));

      return matchesSearch && matchesType && matchesCategory && matchesTechStack;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'popular':
          return b.rating - a.rating;
        case 'a-z':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, contentTypeFilter, categoryFilter, selectedTechStacks, sortBy]);

  const toggleTechStack = (tech: string) => {
    setSelectedTechStacks(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'prompt':
        return <FileText className="h-4 w-4" />;
      case 'instructions':
        return <Settings className="h-4 w-4" />;
      case 'bundle':
        return <Package className="h-4 w-4" />;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Library</h1>
        <p className="text-muted-foreground">
          Discover and explore AI prompts, instructions, and workflow bundles from our community.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search prompts, instructions, bundles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Type:</label>
            <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="prompt">Prompts</SelectItem>
                <SelectItem value="instructions">Instructions</SelectItem>
                <SelectItem value="bundle">Bundles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Category:</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tech Stack Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Tech Stack:</label>
          <div className="flex flex-wrap gap-2">
            {techStacks.map(tech => (
              <Badge
                key={tech}
                variant={selectedTechStacks.includes(tech) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => toggleTechStack(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedContent.length} results
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedContent.map(item => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
            <Link to={`/library/${item.id}`}>
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge className={`${getTypeColor(item.type)} flex items-center gap-1`}>
                    {getTypeIcon(item.type)}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {item.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.techStack.slice(0, 3).map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {item.techStack.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.techStack.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Bundle Items */}
                {item.isBundle && item.bundleItems && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Contains {item.bundleItems.length} items:
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {item.bundleItems.slice(0, 2).join(', ')}
                      {item.bundleItems.length > 2 && ` +${item.bundleItems.length - 2} more`}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>by: {item.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(item.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {filteredAndSortedContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No content found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchQuery('');
            setContentTypeFilter('all');
            setCategoryFilter('all');
            setSelectedTechStacks([]);
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}