import { FunctionDeclarationsTool } from '@google/generative-ai';
import { Gemini, GeminiConfig } from './gemini';
import dotenv from 'dotenv';
import { GetTimeDeclaration, getTime } from './tools/getTime';
const readline = require('readline');

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const apikey = process.env.GEMINI_API_KEY || ""
  const functionDeclarationTools: FunctionDeclarationsTool = {
    functionDeclarations: [GetTimeDeclaration],
  }

  const config: GeminiConfig = {
    apikey: apikey,
    modelName: "gemini-2.0-flash",
    tools: [functionDeclarationTools],
    functionList: [getTime],
    systemInstruction: "my time zone is Asia/Jakarta"
  }

  const gemini = new Gemini(config);

  while(true) {
    const question = await rl[Symbol.asyncIterator]().next();
    if (question.value === 'exit') break
    const response = await gemini.sendMessage(question.value);
    console.log(response);
  }
}

main();