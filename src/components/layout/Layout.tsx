import { Sidebar as AppSidebar } from './Sidebar';

import { Sidebar as AppSidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { GraduationCap, Menu, Home, BookOpen, ClipboardList, FileText, BrainCircuit, MessageSquare, Users, BarChart3, HelpCircle, Image, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const location = useLocation();

  const teacherLinks = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/syllabus', icon: BookOpen, label: 'Syllabus' },
    { to: '/materials', icon: ClipboardList, label: 'Material' },
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
    { to: '/materials', icon: ClipboardList, label: 'Material' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/quizzes', icon: BrainCircuit, label: 'Quizzes' },
    { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { to: '/photos', icon: Image, label: 'Photos' },
    { to: '/help', icon: HelpCircle, label: 'Help' },
  ];

  const links = user?.role === 'teacher' ? teacherLinks : studentLinks;

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-sidebar-primary" />
            <div>
              <h1 className="text-base font-bold">STLD Portal</h1>
              <p className="text-[10px] text-muted-foreground">Switching Theory and Logic Design</p>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <span className="mr-1 uppercase">IF ANY PROBLEM THEN</span>
                  <SheetClose asChild>
                    <Link to="/help" className="underline text-sidebar-primary font-semibold">CLICK HERE</Link>
                  </SheetClose>
                </div>
                <nav className="space-y-1">
                  {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.to;
                    return (
                      <SheetClose asChild key={`m-${link.to}`}>
                        <Link
                          to={link.to}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent ${isActive ? 'bg-sidebar-accent' : ''}`}
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
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
