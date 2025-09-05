import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageSquare, Plus, Send, Star, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Feedback() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [rating, setRating] = useState('5');
  const [feedback, setFeedback] = useState('');

  const feedbackForms = [
    {
      id: '1',
      title: 'Course Content Feedback',
      description: 'Share your thoughts on the course materials and syllabus',
      questions: [
        { type: 'rating', label: 'How would you rate the course content?' },
        { type: 'text', label: 'What topics would you like more focus on?' }
      ],
      responses: 32
    },
    {
      id: '2',
      title: 'Teaching Methodology',
      description: 'Help us improve our teaching methods',
      questions: [
        { type: 'rating', label: 'Rate the teaching methodology' },
        { type: 'text', label: 'Suggestions for improvement' }
      ],
      responses: 28
    },
    {
      id: '3',
      title: 'Assignment Difficulty',
      description: 'Feedback on assignment complexity and workload',
      questions: [
        { type: 'rating', label: 'How challenging are the assignments?' },
        { type: 'text', label: 'Comments on assignment structure' }
      ],
      responses: 41
    }
  ];

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback!",
    });
    setSelectedForm(null);
    setFeedback('');
    setRating('5');
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="h-8 w-8" />
              Feedback
            </h1>
            <p className="text-muted-foreground mt-2">
              {user?.role === 'teacher' 
                ? 'View and analyze student feedback' 
                : 'Share your thoughts to help improve the course'}
            </p>
          </div>
          {user?.role === 'teacher' && (
            <Button variant="gradient">
              <Plus className="mr-2 h-4 w-4" />
              Create Feedback Form
            </Button>
          )}
        </div>

        {user?.role === 'teacher' ? (
          // Teacher View - Feedback Analytics
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Responses</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold">0/5</p>
                    </div>
                    <Star className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Forms</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <BarChart className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Forms */}
            <div className="space-y-4">
              {feedbackForms.map((form) => (
                <Card key={form.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{form.title}</CardTitle>
                    <CardDescription>{form.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {form.responses} responses received
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">View Responses</Button>
                        <Button size="sm" variant="outline">Export CSV</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Student View - Submit Feedback
          <div className="space-y-6">
            {selectedForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Feedback</CardTitle>
                  <CardDescription>
                    {feedbackForms.find(f => f.id === selectedForm)?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitFeedback} className="space-y-6">
                    <div className="space-y-3">
                      <Label>How would you rate this aspect?</Label>
                      <RadioGroup value={rating} onValueChange={setRating}>
                        <div className="flex gap-6">
                          {[5, 4, 3, 2, 1].map((value) => (
                            <div key={value} className="flex items-center space-x-2">
                              <RadioGroupItem value={value.toString()} id={`r${value}`} />
                              <Label htmlFor={`r${value}`} className="cursor-pointer">
                                {value} {value === 5 && '⭐'}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="feedback">Your Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Share your detailed feedback here..."
                        rows={6}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" variant="gradient" className="flex-1">
                        <Send className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setSelectedForm(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card className="bg-gradient-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Your Voice Matters!</h3>
                    <p className="text-muted-foreground">
                      Help us improve the course by sharing your honest feedback. 
                      All responses are anonymous and will be used to enhance your learning experience.
                    </p>
                  </CardContent>
                </Card>

                {feedbackForms.map((form) => (
                  <Card key={form.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{form.title}</h3>
                          <p className="text-sm text-muted-foreground">{form.description}</p>
                        </div>
                        <Button 
                          variant="gradient"
                          onClick={() => setSelectedForm(form.id)}
                        >
                          Provide Feedback
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
