import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Mail, Edit, Trash2 } from 'lucide-react';

export default function Students() {
  const students = [
    { id: '1', name: 'John Doe', registerNumber: 'STLD2025001', email: 'john@example.com', status: 'active' },
    { id: '2', name: 'Jane Smith', registerNumber: 'STLD2025002', email: 'jane@example.com', status: 'active' },
    { id: '3', name: 'Mike Johnson', registerNumber: 'STLD2025003', email: 'mike@example.com', status: 'active' },
    { id: '4', name: 'Sarah Williams', registerNumber: 'STLD2025004', email: 'sarah@example.com', status: 'active' },
    { id: '5', name: 'Tom Brown', registerNumber: 'STLD2025005', email: 'tom@example.com', status: 'inactive' },
  ];

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