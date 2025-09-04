import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Calendar, Clock, Upload, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Assignment } from '@/types';

export default function Assignments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Mock assignments data - initially empty, will show when posted
  const [assignments] = useState<Assignment[]>([]);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Assignment created successfully",
    });
    setIsCreateDialogOpen(false);
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Assignment submitted successfully",
    });
    setIsSubmitDialogOpen(false);
  };

  const getStatusBadge = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else if (diffDays <= 3) {
      return <Badge variant="warning">Due Soon</Badge>;
    } else {
      return <Badge variant="success">Active</Badge>;
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Assignments
            </h1>
            <p className="text-muted-foreground mt-2">
              {user?.role === 'teacher' ? 'Manage course assignments' : 'View and submit your assignments'}
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Set up a new assignment for your students
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input
                      id="title"
                      placeholder="Digital Circuit Design Lab"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed assignment instructions..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="datetime-local"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="marks">Total Marks</Label>
                      <Input
                        id="marks"
                        type="number"
                        placeholder="100"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="file">Attachment (Optional)</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.zip"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Create Assignment</Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Assignments Posted</h3>
                <p className="text-muted-foreground">
                  {user?.role === 'teacher' 
                    ? 'Create your first assignment by clicking the button above' 
                    : 'No assignments have been posted yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        {getStatusBadge(assignment.dueDate)}
                      </div>
                      <p className="text-muted-foreground mb-4">{assignment.description}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Due: {assignment.dueDate.toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {assignment.dueDate.toLocaleTimeString()}
                        </span>
                        <span className="text-primary font-medium">
                          {assignment.totalMarks} marks
                        </span>
                      </div>
                      {user?.role === 'teacher' ? (
                        <div className="mt-4 flex gap-2">
                          <Button size="sm">View Submissions</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="gradient" onClick={() => setSelectedAssignment(assignment)}>
                                <Send className="mr-2 h-4 w-4" />
                                Submit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Submit Assignment</DialogTitle>
                                <DialogDescription>
                                  Upload your work for {selectedAssignment?.title}
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={handleSubmitAssignment} className="space-y-4">
                                <div>
                                  <Label htmlFor="answer">Text Answer</Label>
                                  <Textarea
                                    id="answer"
                                    placeholder="Enter your answer here..."
                                    rows={6}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="submission">Upload File</Label>
                                  <Input
                                    id="submission"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.zip"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button type="submit" className="flex-1">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Submit Assignment
                                  </Button>
                                  <Button type="button" variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}