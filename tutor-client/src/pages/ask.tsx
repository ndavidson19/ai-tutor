import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const AskPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const apiUrl = 'http://localhost:3000/ask-question';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!subject || !question) {
      alert('Please enter a subject and a question.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, { subject, question });
      setAnswer(response.data.answer);
      setIsAnswerVisible(true);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Ask a Tutor</title>
        <meta name="description" content="Ask a tutor any question and get a tailored response" />
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ask a Tutor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Question"
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Ask
          </Button>
        </form>
        {isAnswerVisible && (
          <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Answer:
            </Typography>
            <Typography>{answer}</Typography>
          </Paper>
        )}
      </Box>
    </Container>
    
  );
};

export default AskPage;
