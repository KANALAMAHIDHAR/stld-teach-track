import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Mail, Edit, Trash2 } from 'lucide-react';

export default function Students() {
  const { user } = useAuth();
  // Show only specified register numbers from 24PA1A0462 through 24PA1A0499, 24PA1A04A0-24PA1A04A9, 24PA1A04B0-24PA1A04B9, and 24PA1A04C0-24PA1A04C1
  const generateStudentList = () => {
    const students: { id: string; name: string; registerNumber: string; email: string; status: 'active' }[] = [];

    const pushStudent = (reg: string) => {
      students.push({
        id: reg,
        name: reg,
        registerNumber: reg,
        email: `${reg.toLowerCase()}@vishnu.edu.in`,
        status: 'active',
      });
    };

    // 24PA1A0462 .. 24PA1A0499
    for (let i = 62; i <= 99; i++) {
      const suffix = i.toString().padStart(2, '0');
      pushStudent(`24PA1A04${suffix}`);
    }

    // 24PA1A04A0 .. 24PA1A04A9
    for (let i = 0; i <= 9; i++) {
      pushStudent(`24PA1A04A${i}`);
    }

    // 24PA1A04B0 .. 24PA1A04B9
    for (let i = 0; i <= 9; i++) {
      pushStudent(`24PA1A04B${i}`);
    }

    // 24PA1A04C0 .. 24PA1A04C1
    for (let i = 0; i <= 1; i++) {
      pushStudent(`24PA1A04C${i}`);
    }

    return students;
  };

  const students = generateStudentList();

  if (user?.role === 'student') {
    return (
      <Layout>
        <div className="p-8 bg-white min-h-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">WELCOME BACK DEAR!!</h1>
          </div>
          <div className="text-center text-lg text-muted-foreground">
            LEARN EVERYTHING BY USING ME
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            Student Management
          </h1>
          <Button variant="gradient">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enrolled Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Register Number</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.registerNumber}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'success' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
