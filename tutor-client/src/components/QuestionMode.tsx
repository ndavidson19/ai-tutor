// tutor-client/components/QuestionMode.tsx

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const QuestionMode = ({ subject }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, subject }),
    });

    const data = await result.json();
    setResponse(data.answer);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Question"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
      {response && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Answer:
          </Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </>
  );
};

export default QuestionMode;
