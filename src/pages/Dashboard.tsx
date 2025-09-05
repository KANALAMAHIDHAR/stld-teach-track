import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  FileText,
  BrainCircuit,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Calendar,
  Award
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock state for dynamic data
  const [assignments, setAssignments] = useState(0);
  const [submissions, setSubmissions] = useState(0);
  const [pendingGrading, setPendingGrading] = useState(0);

  const totalStudents = 73; // From 24PA1A0400 to 24PA1A0472

  const teacherStats = [
    { icon: Users, label: 'Total Students', value: totalStudents.toString(), color: 'text-info' },
    { icon: FileText, label: 'Active Assignments', value: assignments.toString(), color: 'text-primary' },
    { icon: CheckCircle, label: 'Submissions', value: submissions.toString(), color: 'text-success' },
    { icon: Clock, label: 'Pending Grading', value: pendingGrading.toString(), color: 'text-warning' },
  ];

  const studentStats = [
    { icon: FileText, label: 'Assignments Due', value: assignments.toString(), color: 'text-warning' },
    { icon: CheckCircle, label: 'Completed', value: '0', color: 'text-success' },
    { icon: Award, label: 'Average Score', value: 'N/A', color: 'text-primary' },
    { icon: BrainCircuit, label: 'Active Quizzes', value: '0', color: 'text-info' },
  ];

  const stats = user?.role === 'teacher' ? teacherStats : studentStats;

  const recentActivities = [
    { type: 'submission', title: 'Assignment 3 submitted', time: '2 hours ago' },
    { type: 'quiz', title: 'Quiz 2 completed', time: '4 hours ago' },
    { type: 'feedback', title: 'New feedback received', time: '1 day ago' },
  ];

  const upcomingDeadlines = [
    { title: 'Digital Logic Design Assignment', due: 'Tomorrow', progress: 75 },
    { title: 'Sequential Circuits Quiz', due: 'In 3 days', progress: 30 },
    { title: 'Project Submission', due: 'Next week', progress: 45 },
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-2">
            {user?.role === 'teacher' 
              ? "Here's an overview of your class performance"
              : "Track your progress and upcoming deadlines"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const navigate = useNavigate();
            const isClickable = user?.role === 'teacher' && (stat.label === 'Total Students' || stat.label === 'Active Assignments');
            const target = stat.label === 'Total Students' ? '/students' : stat.label === 'Active Assignments' ? '/assignments' : null;
            return (
              <Card 
                key={index} 
                className={`transition-shadow ${isClickable ? 'hover:shadow-lg cursor-pointer' : 'hover:shadow-lg'}`}
                onClick={() => isClickable && target && navigate(target)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <Icon className={`h-10 w-10 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest submissions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {activity.type === 'submission' && <FileText className="h-5 w-5 text-primary" />}
                        {activity.type === 'quiz' && <BrainCircuit className="h-5 w-5 text-info" />}
                        {activity.type === 'feedback' && <AlertCircle className="h-5 w-5 text-success" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Don't miss these dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{deadline.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {deadline.due}
                          </p>
                        </div>
                      </div>
                      <Progress value={deadline.progress} className="h-2" />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link to="/assignments">View All</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="gradient" size="lg" className="justify-start" asChild>
              <Link to="/syllabus">
                <BookOpen className="mr-2 h-5 w-5" />
                View Syllabus
              </Link>
            </Button>
            <Button variant="success" size="lg" className="justify-start" asChild>
              <Link to="/assignments">
                <FileText className="mr-2 h-5 w-5" />
                {user?.role === 'teacher' ? 'Manage Assignments' : 'View Assignments'}
              </Link>
            </Button>
            <Button variant="warning" size="lg" className="justify-start" asChild>
              <Link to="/quizzes">
                <BrainCircuit className="mr-2 h-5 w-5" />
                {user?.role === 'teacher' ? 'Create Quiz' : 'Take Quiz'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
