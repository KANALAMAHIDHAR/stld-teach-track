import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Hash } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <User className="h-8 w-8" />
          My Profile
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Name:</span>
                <span>{user?.name}</span>
              </div>
              {user?.registerNumber && (
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Register Number:</span>
                  <span>{user.registerNumber}</span>
                </div>
              )}
              {user?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span>{user.email}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}