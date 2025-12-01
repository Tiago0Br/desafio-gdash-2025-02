import { Module } from '@nestjs/common'
import { AiAgent } from '@/domain/weather/ai/ai-agent'
import { EnvModule } from '../env/env.module'
import { GenAIAgent } from './genai-agent'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: AiAgent,
      useClass: GenAIAgent
    }
  ],
  exports: [AiAgent]
})
export class AiModule {}
