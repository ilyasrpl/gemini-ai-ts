import { FunctionDeclarationsTool } from '@google/generative-ai';
import { Gemini } from './gemini';
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
  const modelName = "gemini-2.0-flash";

  const functionDeclarationTools: FunctionDeclarationsTool = {
    functionDeclarations: [GetTimeDeclaration],
  }

  const functionCallList = [getTime];

  const gemini = new Gemini(apikey, modelName, [functionDeclarationTools], functionCallList);

  while(true) {
    const question = await rl[Symbol.asyncIterator]().next();
    const response = await gemini.sendMessage(question.value);
    console.log('Gemini: ', response);
  }
}

main();