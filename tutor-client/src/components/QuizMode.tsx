// tutor-client/components/QuizMode.tsx

import { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const QuizMode = ({ subject }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  // At the beginning of the QuizMode component, add the following:
  const [hint, setHint] = useState('');

  // Add the function below the goToNextQuestion function:
  const fetchHint = async () => {
    const question = currentQuestion.question;

    // Call the Chat API to get a hint based on the current question
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Hint for: ${question}` }),
    });

    const data = await response.json();
    setHint(data.answer);
  };


  const quizData = [
    {
      question: 'Sample question 1 for the quiz',
      answers: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 2',
    },
    {
      question: 'Sample question 2 for the quiz',
      answers: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 1',
    },
    {
      question: 'Sample question 3 for the quiz',
      answers: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 4',
    },
  ];

  const currentQuestion = quizData[questionIndex];

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserAnswers({ ...userAnswers, [questionIndex]: selectedAnswer });
    if (questionIndex === quizData.length - 1) {
      setShowResult(true);
    } else {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(userAnswers[questionIndex + 1] || '');
    }
  };

  const goToPreviousQuestion = () => {
    setQuestionIndex(questionIndex - 1);
    setSelectedAnswer(userAnswers[questionIndex - 1] || '');
  };

  const goToNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setUserAnswers({ ...userAnswers, [questionIndex]: selectedAnswer });
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(userAnswers[questionIndex + 1] || '');
    } else {
      alert('Your answer is incorrect. Please try again.');
    }
  };

  return (
    <>
      {!showResult ? (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" component="div">
              {currentQuestion.question}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={selectedAnswer} onChange={handleChange}>
                {currentQuestion.answers.map((answer, index) => (
                  <FormControlLabel key={index} value={answer} control={<Radio />} label={answer} />
                ))}
              </RadioGroup>
            </FormControl>
            
            {hint && (
            <Box sx={{ mt: 1 }}>
                <Typography variant="caption">Hint: {hint}</Typography>
            </Box>
            )}

          </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <IconButton onClick={goToPreviousQuestion} disabled={questionIndex === 0}>
                <ArrowBack />
            </IconButton>
            <Button variant="outlined" onClick={fetchHint}>
                Hint
            </Button>
            {questionIndex < quizData.length - 1 ? (
                <IconButton onClick={goToNextQuestion}>
                <ArrowForward />
                </IconButton>
            ) : (
                <Button variant="contained" type="submit">
                Submit
                </Button>
            )}
            </Box>

        </form>
      ) : (
                // ...
                <Box sx={{ mt: 4 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Quiz Results:
                </Typography>
                {quizData.map((question, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      {index + 1}. {question.question}
                    </Typography>
                    <Typography variant="body2">
                      Your answer: {userAnswers[index] || 'Not answered'}
                    </Typography>
                    <Typography variant="body2">Correct answer: {question.correctAnswer}</Typography>
                  </Box>
                ))}
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuestionIndex(0);
                      setSelectedAnswer(userAnswers[0] || '');
                      setShowResult(false);
                    }}
                  >
                    Retry
                  </Button>
                </Box>
              </Box>
            )}
          </>
        );
      };
      
      export default QuizMode;
      
