import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  User, 
  Star, 
  FileText, 
  Heart, 
  Upload, 
  Edit, 
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { mockContent, mockSubmissions, mockFavorites, mockDrafts } from '../../data/mockData';
import type { ContentItem, Submission } from '../../data/mockData';

export function MyPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock user stats
  const userStats = {
    totalSubmissions: mockSubmissions.length,
    approvedSubmissions: mockSubmissions.filter(s => s.status === 'approved').length,
    favorites: mockFavorites.length,
    drafts: mockDrafts.length
  };

  const getStatusIcon = (status: Submission['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'needs-changes':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: Submission['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'needs-changes':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getContentTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'prompt':
        return <FileText className="h-4 w-4" />;
      case 'instructions':
        return <User className="h-4 w-4" />;
      case 'bundle':
        return <Upload className="h-4 w-4" />;
    }
  };

  const favoriteItems = mockContent.filter(item => mockFavorites.includes(item.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your submissions, favorites, and drafts in one place.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Upload className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Total Submissions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.approvedSubmissions}</div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.favorites}</div>
            <p className="text-xs text-muted-foreground">Favorites</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Edit className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.drafts}</div>
            <p className="text-xs text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">My Library</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        {/* My Library - Combined view */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Recent Favorites */}
            {favoriteItems.slice(0, 3).map(item => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <Link to={`/library/${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">Favorite</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>by: {item.author}</span>
                      <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}

            {/* Recent Drafts */}
            {mockDrafts.map(draft => (
              <Card key={draft.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">Draft</Badge>
                    <Edit className="h-4 w-4 text-orange-500" />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {draft.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Last edited: {new Date(draft.lastEdited).toLocaleDateString()}</span>
                    <Badge variant="secondary" className="text-xs">
                      {draft.type}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Upload className="h-3 w-3 mr-1" />
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {favoriteItems.length === 0 && mockDrafts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your library is empty.</p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <Link to="/library">
                    <Star className="h-4 w-4 mr-2" />
                    Explore Content
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/create-prompt">
                    <Edit className="h-4 w-4 mr-2" />
                    Create Content
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Favorites */}
        <TabsContent value="favorites" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteItems.map(item => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <Link to={`/library/${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className="flex items-center gap-1 text-xs">
                        {getContentTypeIcon(item.type)}
                        {item.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>by: {item.author}</span>
                      <span>{new Date(item.createdDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {favoriteItems.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">You haven't favorited any content yet.</p>
              <Button asChild>
                <Link to="/library">
                  <Star className="h-4 w-4 mr-2" />
                  Explore Library
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Submissions */}
        <TabsContent value="submissions" className="space-y-4">
          <div className="space-y-4">
            {mockSubmissions.map(submission => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{submission.title}</CardTitle>
                    <Badge className={getStatusColor(submission.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(submission.status)}
                        {submission.status.replace('-', ' ')}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                      </div>
                      {submission.reviewDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Reviewed: {new Date(submission.reviewDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {submission.feedback && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Reviewer Feedback:</p>
                        <p className="text-sm text-muted-foreground">{submission.feedback}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {submission.status === 'approved' && (
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View in Library
                        </Button>
                      )}
                      {(submission.status === 'needs-changes' || submission.status === 'rejected') && (
                        <>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit & Resubmit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </>
                      )}
                      {submission.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit Submission
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockSubmissions.length === 0 && (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">You haven't submitted any content yet.</p>
              <Button asChild>
                <Link to="/submit">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Content
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Drafts */}
        <TabsContent value="drafts" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDrafts.map(draft => (
              <Card key={draft.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {draft.type}
                    </Badge>
                    <Edit className="h-4 w-4 text-orange-500" />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {draft.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3 w-3" />
                    Last edited: {new Date(draft.lastEdited).toLocaleDateString()}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Upload className="h-3 w-3 mr-1" />
                      Submit
                    </Button>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="w-full mt-2 text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete Draft
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockDrafts.length === 0 && (
            <div className="text-center py-12">
              <Edit className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">You don't have any drafts saved.</p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <Link to="/create-prompt">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Prompt
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/create-mermaid">
                    <User className="h-4 w-4 mr-2" />
                    Create Mermaid
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}