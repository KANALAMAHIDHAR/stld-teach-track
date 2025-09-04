import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  FileText,
  BrainCircuit,
  MessageSquare,
  Users,
  BarChart3,
  LogOut,
  Home,
  User,
  GraduationCap,
  ClipboardList
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const teacherLinks = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/syllabus', icon: BookOpen, label: 'Syllabus' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/quizzes', icon: BrainCircuit, label: 'Quizzes' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
  ];

  const studentLinks = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/syllabus', icon: BookOpen, label: 'Syllabus' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/quizzes', icon: BrainCircuit, label: 'Quizzes' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const links = user?.role === 'teacher' ? teacherLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-sidebar-primary" />
          <div>
            <h1 className="text-xl font-bold text-sidebar-primary">STLD Portal</h1>
            <p className="text-xs text-sidebar-primary/70">Web Learning Platform</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-sidebar-primary/70 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                "hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-primary hover:bg-sidebar-accent hover:text-sidebar-primary"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};