import { useState } from 'react';
import { ProcessedQuestion, QuestionOption } from '../types/question';

export const useQuestionProcessor = () => {
  const [processedQuestion, setProcessedQuestion] = useState<ProcessedQuestion | null>(null);

  const processQuestion = (rawInput: string): void => {
    try {
      // Split input into lines and remove empty lines
      const lines = rawInput.trim().split('\n').filter(line => line.trim());
      
      // Find the question text (everything up to the first option)
      const questionEndIndex = lines.findIndex(line => /^[A-D]\)/.test(line.trim()));
      const questionText = lines
        .slice(0, questionEndIndex)
        .join('\n')
        .trim();

      // Extract options (lines starting with A), B), C), or D))
      const options: QuestionOption[] = lines
        .filter(line => /^[A-D]\)/.test(line.trim()))
        .map(line => ({
          label: line.trim()[0],
          text: line.substring(line.indexOf(')') + 1).trim()
        }));

      // Validate structure
      const hasQuestionMark = questionText.includes('?');
      const isValid = hasQuestionMark && options.length === 4;

      setProcessedQuestion({
        questionText,
        options,
        isValid,
        errorMessage: isValid 
          ? undefined 
          : `Question format error: ${!hasQuestionMark ? 'Missing question mark. ' : ''}${
              options.length !== 4 ? `Found ${options.length} options, need exactly 4 options (A, B, C, D).` : ''
            }`
      });
    } catch (error) {
      setProcessedQuestion({
        questionText: '',
        options: [],
        isValid: false,
        errorMessage: 'Error processing question. Please check the format.'
      });
    }
  };

  return { processedQuestion, processQuestion };
}; 