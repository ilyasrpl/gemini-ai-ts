import { ChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

class Gemini {
  ApiKey: string;
  gemini: GoogleGenerativeAI;
  model: GenerativeModel;
  chat: ChatSession

  constructor(){
    this.ApiKey = process.env.GEMINI_API_KEY || "";
    this.gemini = new GoogleGenerativeAI(this.ApiKey);
    this.model = this.gemini.getGenerativeModel({
      model: "gemini-2.0-flash"
    })
    this.chat = this.model.startChat();
  }

  async sendMessage(message: string): Promise<string> {
    let result = await this.chat.sendMessage(message);
    return result.response.text();
  }
}

export { Gemini }