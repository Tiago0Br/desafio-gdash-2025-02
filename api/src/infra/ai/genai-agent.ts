import { GoogleGenAI } from '@google/genai'
import { Injectable } from '@nestjs/common'
import { AiAgent } from '@/domain/weather/ai/ai-agent'
import { EnvService } from '../env/env.service'

@Injectable()
export class GenAIAgent implements AiAgent {
  private readonly genAI: GoogleGenAI
  private readonly model: string
  private readonly apiKey: string

  constructor(private readonly envService: EnvService) {
    this.model = 'gemini-2.0-flash'
    this.apiKey = this.envService.get('GENAI_API_KEY')
    this.genAI = new GoogleGenAI({ apiKey: this.apiKey })
  }

  async generateContent(prompt: string): Promise<string | undefined> {
    const result = await this.genAI.models.generateContent({
      model: this.model,
      contents: [{ text: prompt }]
    })

    return result.text
  }
}
