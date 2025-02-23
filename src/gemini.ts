import { ChatSession, GenerativeModel, GoogleGenerativeAI, ModelParams, Tool, Part } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

interface GenerateContentParams {
  apikey: string
  prompt: string
  modelName: string
}

type GeminiConfig = {
  apikey: string,
  modelName: string,
  systemInstruction?: string,
  tools?: Tool[],
  functionList?: Function[]
}

class Gemini extends GoogleGenerativeAI {
  private modelParam: ModelParams
  private model: GenerativeModel
  private chat: ChatSession
  private functionList: Function[]

  constructor(init: GeminiConfig) {
    const { apikey, modelName, systemInstruction, tools = [], functionList = [] } = init
    super(apikey);
    this.functionList = functionList
    this.modelParam = {
      model: modelName,
      tools: tools,
      systemInstruction: systemInstruction
    }
    this.model = super.getGenerativeModel(this.modelParam);
    this.chat = this.model.startChat()
  }

  async sendMessage(msg: string | Array<string | Part>): Promise<any> {
    let result = await this.chat.sendMessage(msg);
    let newMsg: Part[] = [];
    let call = result.response.functionCalls() || [];
    if (call.length == 0) return result.response.text();
    for (const v of call) {
      let apiResponse = await this.functionProcess(v.name, v.args);
      newMsg.push({
        functionResponse: {
          name: v.name,
          response: apiResponse
        }
      })
      return await this.sendMessage(newMsg);
    }
  }

  private async functionProcess(functionName: string, args: any): Promise<object> {
    let func = this.functionList.find(fn => fn.name === functionName);
    if (!func) {
      throw new Error(`Function ${functionName} not found.`);
    }
    let result = await func(args);
    return result
  }

  static async generateText(GenerateContentParams: GenerateContentParams): Promise<string> {
    const { apikey, prompt, modelName } = GenerateContentParams
    const genAI = new GoogleGenerativeAI(apikey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  }
}
export { Gemini, GeminiConfig }
