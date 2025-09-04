import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Plus, Edit, Trash2, FileText, Calendar, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SyllabusItem } from '@/types';

export default function Syllabus() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SyllabusItem | null>(null);

  // Mock syllabus data with new unit structure
  const [syllabusItems] = useState<SyllabusItem[]>([
    {
      id: '1',
      title: 'Unit 1 - Part 1: Review of Numbers and Systems',
      description: 'Number systems (Binary, Octal, Hexadecimal), conversions, complements, and arithmetic operations.',
      weekNumber: 1,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Unit 1 - Part 2: Boolean Theorems and Logic Operations',
      description: 'Boolean algebra fundamentals, theorems, laws, and basic logic gate operations.',
      weekNumber: 2,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-01-22')
    },
    {
      id: '3',
      title: 'Unit 2 - Part 1: Minimisation Techniques',
      description: 'Karnaugh maps, Quine-McCluskey method, and prime implicant selection.',
      weekNumber: 3,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-01-29')
    },
    {
      id: '4',
      title: 'Unit 2 - Part 2: Combinational Logic Circuit Design',
      description: 'Design methodology for combinational circuits, optimization techniques.',
      weekNumber: 4,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-02-05')
    },
    {
      id: '5',
      title: 'Unit 3 - Part 1: Combinational Logic Circuits Design',
      description: 'Adders, subtractors, multiplexers, demultiplexers, encoders, decoders, and comparators.',
      weekNumber: 5,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-02-12')
    },
    {
      id: '6',
      title: 'Unit 3 - Part 2: Introduction to PLDs',
      description: 'Programmable Logic Devices - PLA, PAL, CPLD, and FPGA basics.',
      weekNumber: 6,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-02-19')
    },
    {
      id: '7',
      title: 'Unit 4: Sequential Circuits 1',
      description: 'Latches, flip-flops (SR, JK, D, T), timing diagrams, registers, and shift registers.',
      weekNumber: 7,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-02-26')
    },
    {
      id: '8',
      title: 'Unit 5: Sequential Circuits 2',
      description: 'Counters (synchronous, asynchronous), state machines, and sequence detectors.',
      weekNumber: 8,
      createdBy: 'teacher-1',
      createdAt: new Date('2024-03-04')
    }
  ]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Syllabus item added successfully",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (item: SyllabusItem) => {
    setEditingItem(item);
  };

  const handleDeleteItem = (id: string) => {
    toast({
      title: "Success",
      description: "Syllabus item deleted successfully",
    });
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              Course Syllabus
            </h1>
            <p className="text-muted-foreground mt-2">
              Switching Theory and Logic Design - Complete Course Structure
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Topic
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Syllabus Topic</DialogTitle>
                  <DialogDescription>
                    Add a new topic to the course syllabus
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddItem} className="space-y-4">
                  <div>
                    <Label htmlFor="week">Week Number</Label>
                    <Input
                      id="week"
                      type="number"
                      min="1"
                      max="16"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Topic Title</Label>
                    <Input
                      id="title"
                      placeholder="Introduction to Digital Systems"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the topic..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Add Topic</Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Course Overview Card */}
        <Card className="mb-8 bg-gradient-card">
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>8 weeks of comprehensive digital logic design</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">8 Weeks</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Topics</p>
                  <p className="font-semibold">{syllabusItems.length} Modules</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resources</p>
                  <p className="font-semibold">24 Files</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Syllabus Items */}
        <div className="space-y-4">
          {syllabusItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                      {item.weekNumber}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        {item.title}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </h3>
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Week {item.weekNumber}
                        </span>
                        {item.fileURL && (
                          <span className="flex items-center gap-1 text-primary">
                            <FileText className="h-3 w-3" />
                            Resources available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {user?.role === 'teacher' && (
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}