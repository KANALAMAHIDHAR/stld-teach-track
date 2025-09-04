import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BrainCircuit, Plus, Clock, Calendar, PlayCircle, CheckCircle, XCircle, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Quiz } from '@/types';

export default function Quizzes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock quiz data - initially empty, will be populated when links are posted
  const [quizzes] = useState<Quiz[]>([]);

  const getQuizStatus = (quiz: Quiz) => {
    const now = new Date();
    if (now < quiz.startTime) {
      return { label: 'Upcoming', variant: 'info' as const };
    } else if (now > quiz.endTime) {
      return { label: 'Completed', variant: 'secondary' as const };
    } else {
      return { label: 'Active', variant: 'success' as const };
    }
  };

  const handleStartQuiz = (quizId: string) => {
    toast({
      title: "Quiz Started",
      description: "Good luck with your quiz!",
    });
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <BrainCircuit className="h-8 w-8" />
              Quizzes
            </h1>
            <p className="text-muted-foreground mt-2">
              {user?.role === 'teacher' ? 'Create and manage quizzes' : 'Take quizzes and view your scores'}
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Quiz
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Quiz</DialogTitle>
                  <DialogDescription>
                    Paste a link to your quiz PDF or online quiz
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="unit">Select Unit</Label>
                    <select id="unit" className="w-full p-2 border rounded-md bg-background">
                      <option>Unit 1: Numbers and Boolean Operations</option>
                      <option>Unit 2: Minimisation Techniques</option>
                      <option>Unit 3: Combinational Logic & PLDs</option>
                      <option>Unit 4: Sequential Circuits 1</option>
                      <option>Unit 5: Sequential Circuits 2</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="link">Quiz Link (PDF or Online)</Label>
                    <Input
                      id="link"
                      type="url"
                      placeholder="https://example.com/quiz.pdf"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      <Link className="mr-2 h-4 w-4" />
                      Add Quiz
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <BrainCircuit className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <PlayCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <CheckCircle className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold">N/A</p>
                </div>
                <BrainCircuit className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz List */}
        <div className="space-y-4">
          {quizzes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BrainCircuit className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Quizzes Yet</h3>
                <p className="text-muted-foreground">
                  {user?.role === 'teacher' 
                    ? 'Create your first quiz by clicking the button above' 
                    : 'No quizzes have been posted yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            quizzes.map((quiz) => {
              const status = getQuizStatus(quiz);
              return (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{quiz.title}</h3>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{quiz.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{quiz.startTime.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{Math.floor(quiz.timeLimit / 60)} minutes</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            <span>{quiz.totalMarks} marks</span>
                          </div>
                        </div>

                        {user?.role === 'student' ? (
                          <div className="flex gap-2">
                            {status.label === 'Active' && (
                              <Button 
                                variant="gradient"
                                onClick={() => handleStartQuiz(quiz.id)}
                              >
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Start Quiz
                              </Button>
                            )}
                            {status.label === 'Completed' && (
                              <Button variant="outline">
                                View Results
                              </Button>
                            )}
                            {status.label === 'Upcoming' && (
                              <Button variant="secondary" disabled>
                                Opens {quiz.startTime.toLocaleString()}
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button size="sm">View Questions</Button>
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">View Responses</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}