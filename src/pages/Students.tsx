import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Mail, Edit, Trash2 } from 'lucide-react';

export default function Students() {
  // Generate students from 24PA1A0400 to 24PA1A0472
  const generateStudentList = () => {
    const students = [];
    const firstNames = ['Arun', 'Priya', 'Raj', 'Sneha', 'Karthik', 'Divya', 'Suresh', 'Anjali', 'Vikram', 'Nisha'];
    const lastNames = ['Kumar', 'Sharma', 'Reddy', 'Patel', 'Rao', 'Singh', 'Verma', 'Gupta', 'Joshi', 'Iyer'];
    
    for (let i = 400; i <= 472; i++) {
      const paddedNum = i.toString().padStart(4, '0');
      const registerNumber = `24PA1A${paddedNum}`;
      const nameIndex = (i - 400) % firstNames.length;
      const lastNameIndex = (i - 400) % lastNames.length;
      
      students.push({
        id: i.toString(),
        name: `${firstNames[nameIndex]} ${lastNames[lastNameIndex]}`,
        registerNumber: registerNumber,
        email: `${registerNumber.toLowerCase()}@vishnu.edu.in`,
        status: 'active' as const
      });
    }
    return students;
  };

  const students = generateStudentList();

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