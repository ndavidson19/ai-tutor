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
const express_1 = __importDefault(require("express"));
const tutor_1 = require("./tutor");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
const tutor = new tutor_1.Tutor();
app.use(express_1.default.json());
app.post('/ask-question', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, subject } = req.body;
    if (!question || !subject) {
        return res.status(400).json({ error: 'Question and subject are required.' });
    }
    const answer = yield tutor.answerQuestion(question, subject);
    res.json({ answer });
}));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
