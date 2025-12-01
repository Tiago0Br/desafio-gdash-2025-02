export abstract class AiAgent {
  abstract generateContent(prompt: string): Promise<string | undefined>
}
