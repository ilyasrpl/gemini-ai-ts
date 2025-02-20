import { Gemini } from './gemini';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const gemini = new Gemini();
  let response = await gemini.sendMessage("hello")
  console.log(response);
}

main();