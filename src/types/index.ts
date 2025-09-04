// User Types
export interface User {
  id: string;
  name: string;
  email?: string;
  registerNumber?: string;
  role: 'teacher' | 'student';
  createdAt: Date;
}

// Syllabus Types
export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  weekNumber: number;
  fileURL?: string;
  createdBy: string;
  createdAt: Date;
}

// Assignment Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  fileURL?: string;
  createdBy: string;
  createdAt: Date;
  totalMarks: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileURL?: string;
  textAnswer?: string;
  submittedAt: Date;
  isLate: boolean;
  marksAwarded?: number;
  feedback?: string;
}

// Quiz Types
export interface Quiz {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  timeLimit: number; // in seconds
  questions: QuizQuestion[];
  createdBy: string;
  totalMarks: number;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'short';
  questionText: string;
  options?: string[];
  correctAnswer: string | number;
  marks: number;
}

export interface QuizResponse {
  id: string;
  quizId: string;
  studentId: string;
  answers: (string | number)[];
  score?: number;
  graded: boolean;
  submittedAt: Date;
}

// Feedback Types
export interface FeedbackForm {
  id: string;
  title: string;
  questions: FeedbackQuestion[];
  createdBy: string;
  createdAt: Date;
}

export interface FeedbackQuestion {
  id: string;
  type: 'rating' | 'text';
  label: string;
  required?: boolean;
}

export interface FeedbackResponse {
  id: string;
  formId: string;
  studentId: string;
  answers: { [questionId: string]: string | number };
  submittedAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalStudents: number;
  assignmentSubmissions: number;
  averageQuizScore: number;
  pendingGrading: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'submission' | 'quiz' | 'feedback';
  title: string;
  userName: string;
  timestamp: Date;
}