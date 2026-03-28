import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { EnvService } from '@/infra/env/env.service'
import { ERROR_CODES } from '@/infra/http/error-codes'

@Injectable()
export class WorkerAuthGuard implements CanActivate {
  constructor(private readonly envService: EnvService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const apiToken = request.headers['x-api-key']
    const validToken = this.envService.get('WORKER_API_TOKEN')

    if (!apiToken || apiToken !== validToken) {
      throw new UnauthorizedException('Access allowed only for worker', {
        description: ERROR_CODES.onlyWorkerCanAccess
      })
    }

    return true
  }
}
