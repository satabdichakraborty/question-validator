import React, { useState } from 'react';
import {
  Container,
  Textarea,
  Button,
  Header,
  SpaceBetween,
  Alert
} from '@cloudscape-design/components';
import { useQuestionProcessor } from '../hooks/useQuestionProcessor';
import { AnswerAnalysis } from '../types/question';

// Add type for the onChange event
interface TextareaChangeDetail {
  value: string;
}

const ValidateItem: React.FC = () => {
  const [rawInput, setRawInput] = useState('');
  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null);
  const { processedQuestion, processQuestion } = useQuestionProcessor();

  const handleInputChange = (value: string) => {
    setRawInput(value);
    processQuestion(value);
    setAnalysis(null);
  };

  const handleAnswerQuestion = async () => {
    if (!processedQuestion?.isValid) return;

    try {
      // TODO: Replace with actual API call
      const mockAnalysis: AnswerAnalysis = {
        correctOption: 'A',
        correctExplanation: 'This is the correct answer because...',
        incorrectExplanations: {
          'B': 'This is incorrect because...',
          'C': 'This is incorrect because...',
          'D': 'This is incorrect because...'
        }
      };
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing question:', error);
    }
  };

  return (
    <Container>
      <SpaceBetween size="l">
        <Header variant="h1">
          Validate Question
        </Header>

        <Textarea
          value={rawInput}
          onChange={({ detail }: { detail: TextareaChangeDetail }) => 
            handleInputChange(detail.value)
          }
          placeholder="Enter your question here..."
          rows={10}
        />

        {processedQuestion?.errorMessage && (
          <Alert type="error">
            {processedQuestion.errorMessage}
          </Alert>
        )}

        <Button
          variant="primary"
          onClick={handleAnswerQuestion}
          disabled={!processedQuestion?.isValid}
        >
          Answer Question
        </Button>

        {analysis && (
          <SpaceBetween size="m">
            {processedQuestion?.options.map(option => (
              <div key={option.label}>
                <strong>{option.label}) {option.text}</strong>
                <p>
                  {option.label === analysis.correctOption
                    ? analysis.correctExplanation
                    : analysis.incorrectExplanations[option.label]}
                </p>
              </div>
            ))}
          </SpaceBetween>
        )}
      </SpaceBetween>
    </Container>
  );
};

export { ValidateItem };
export default ValidateItem; 