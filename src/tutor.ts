import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GPT_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

interface OpenAIRequest {
  prompt: string;
  max_tokens: number;
}

export class Tutor {
  public async answerQuestion(question: string, subject: string): Promise<string> {
    try {
      const prompt = `Subject: ${subject}\nQuestion: ${question}\nAnswer:`;

      const requestData: OpenAIRequest = {
        prompt,
        max_tokens: 100,
      };

      const response = await axios.post(GPT_API_URL, requestData, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const answer = response.data.choices[0].text.trim();
      return answer;
    } catch (error) {
      console.error('Error fetching answer from OpenAI:', error);
      return 'Sorry, I cannot help you with that question.';
    }
  }
}
