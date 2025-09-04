import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BrainCircuit, Plus, Clock, Calendar, PlayCircle, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Quiz } from '@/types';

export default function Quizzes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock quiz data
  const [quizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Boolean Algebra Basics',
      description: 'Test your understanding of Boolean algebra fundamentals and logic gates.',
      startTime: new Date('2024-12-10T10:00:00'),
      endTime: new Date('2024-12-10T11:00:00'),
      timeLimit: 3600,
      createdBy: 'teacher-1',
      totalMarks: 50,
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          questionText: 'Which gate produces output 1 only when all inputs are 1?',
          options: ['OR', 'AND', 'XOR', 'NAND'],
          correctAnswer: 1,
          marks: 10
        }
      ]
    },
    {
      id: '2',
      title: 'Sequential Circuits Quiz',
      description: 'Assessment on flip-flops, latches, and state machines.',
      startTime: new Date('2024-12-15T14:00:00'),
      endTime: new Date('2024-12-15T15:30:00'),
      timeLimit: 5400,
      createdBy: 'teacher-1',
      totalMarks: 75,
      questions: []
    },
    {
      id: '3',
      title: 'Combinational Logic Test',
      description: 'Comprehensive test on multiplexers, decoders, and encoders.',
      startTime: new Date('2024-12-20T09:00:00'),
      endTime: new Date('2024-12-20T10:00:00'),
      timeLimit: 3600,
      createdBy: 'teacher-1',
      totalMarks: 60,
      questions: []
    }
  ]);

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
            <Button variant="gradient">
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold">{quizzes.length}</p>
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
                  <p className="text-2xl font-bold">1</p>
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
                  <p className="text-2xl font-bold">5</p>
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
                  <p className="text-2xl font-bold">82%</p>
                </div>
                <BrainCircuit className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz List */}
        <div className="space-y-4">
          {quizzes.map((quiz) => {
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
          })}
        </div>
      </div>
    </Layout>
  );
}