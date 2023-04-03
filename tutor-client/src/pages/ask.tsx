// tutor-client/pages/ask.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, FormControlLabel, Switch } from '@mui/material';
import QuestionMode from '../components/QuestionMode';
import QuizMode from '../components/QuizMode';

const AskPage: React.FC = () => {
  const router = useRouter();
  const defaultSubject = Array.isArray(router.query.subject) ? router.query.subject[0] : router.query.subject || '';
  const [quizMode, setQuizMode] = useState(false);

  const handleModeChange = () => {
    setQuizMode(!quizMode);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            {quizMode ? 'Quiz' : 'Ask a Tutor'}
          </Typography>
          <FormControlLabel
            control={<Switch checked={quizMode} onChange={handleModeChange} />}
            label="Quiz Mode"
          />
        </Box>
        {quizMode ? <QuizMode subject={defaultSubject} /> : <QuestionMode subject={defaultSubject} />}
      </Box>
    </Container>
  );
};

export default AskPage;
