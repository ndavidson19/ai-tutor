"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutor = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GPT_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
class Tutor {
    answerQuestion(question, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prompt = `Subject: ${subject}\nQuestion: ${question}\nAnswer:`;
                const requestData = {
                    prompt,
                    max_tokens: 100,
                };
                const response = yield axios_1.default.post(GPT_API_URL, requestData, {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                });
                const answer = response.data.choices[0].text.trim();
                return answer;
            }
            catch (error) {
                console.error('Error fetching answer from OpenAI:', error);
                return 'Sorry, I cannot help you with that question.';
            }
        });
    }
}
exports.Tutor = Tutor;
