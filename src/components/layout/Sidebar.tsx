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
  ClipboardList,
  Menu,
  HelpCircle,
  Image
} from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
    { to: '/photos', icon: Image, label: 'Photos' },
    { to: '/help', icon: HelpCircle, label: 'Help' },
  ];

  const studentLinks = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/syllabus', icon: BookOpen, label: 'Syllabus' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/quizzes', icon: BrainCircuit, label: 'Quizzes' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { to: '/photos', icon: Image, label: 'Photos' },
    { to: '/help', icon: HelpCircle, label: 'Help' },
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-sidebar-primary" />
            <div>
              <h1 className="text-xl font-bold text-sidebar-primary">STLD Portal</h1>
              <p className="text-xs text-sidebar-primary/70">Switching Theory and Logic Design</p>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-sidebar text-sidebar-foreground">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium">If any problem contact:</p>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>1) Mahidhar - 9390221684</li>
                    <li>2) Pawan - 9515576179</li>
                    <li>3) Heganeswar - 8919465798</li>
                  </ul>
                </div>
                <Separator />
                <nav className="space-y-1">
                  {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.to;
                    return (
                      <SheetClose asChild key={`sheet-${link.to}`}>
                        <Link
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
                      </SheetClose>
                    );
                  })}
                  <Button
                    variant="ghost"
                    className="w-full justify-start mt-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full text-left">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="text-xs text-sidebar-primary/70 capitalize">{user?.role}</p>
                </div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Professor Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Dr.S.Sugumaran</p>
              <p>Email: Sugumaran.s@vishnu.edu.in</p>
              <p>Role: Teacher</p>
              <p>Subject: Switching Theory and Logic Design</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Left nav hidden; use the sheet (three lines) menu instead */}
      <div className="flex-1" />

      {/* Bottom actions: Help above Logout (Photos hidden here) */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Link to="/help" className={cn("flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent")}>
          <HelpCircle className="h-4 w-4" />
          <span className="text-sm">Help</span>
        </Link>
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
