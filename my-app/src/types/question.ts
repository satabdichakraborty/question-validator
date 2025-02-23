export interface QuestionOption {
  label: string;  // A, B, C, D
  text: string;   // Option text
}

export interface ProcessedQuestion {
  questionText: string;
  options: QuestionOption[];
  isValid: boolean;
  errorMessage?: string;
}

export interface AnswerAnalysis {
  correctOption: string;  // A, B, C, D
  correctExplanation: string;
  incorrectExplanations: Record<string, string>;
} 