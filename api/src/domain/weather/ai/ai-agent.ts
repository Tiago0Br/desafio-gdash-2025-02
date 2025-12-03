export interface OutputData {
  analysis: string
  recommendation: string
}

export abstract class AiAgent {
  abstract generateContent(prompt: string): Promise<OutputData | undefined>
}
