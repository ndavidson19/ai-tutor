import express, { Request, Response } from 'express';
import { Tutor } from './tutor';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const tutor = new Tutor();

app.use(express.json());

app.post('/ask-question', async (req: Request, res: Response) => {
    const { question, subject } = req.body;
    if (!question || !subject) {
      return res.status(400).json({ error: 'Question and subject are required.' });
    }
  
    const answer = await tutor.answerQuestion(question, subject);
    res.json({ answer });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
