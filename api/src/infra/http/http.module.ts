import { Module } from '@nestjs/common'
import { AuthenticateUseCase } from '@/domain/users/use-cases/authenticate'
import { CreateUserUseCase } from '@/domain/users/use-cases/create-user'
import { DeleteUserUseCase } from '@/domain/users/use-cases/delete-user'
import { FindAllUsersUseCase } from '@/domain/users/use-cases/find-all-users'
import { UpdateUserUseCase } from '@/domain/users/use-cases/update-user'
import { ExportWeatherLogsCsvUseCase } from '@/domain/weather/use-cases/export-weather-logs-csv'
import { ExportWeatherLogsXlsxUseCase } from '@/domain/weather/use-cases/export-weather-logs-xlsx'
import { GetWeatherAiInsightsUseCase } from '@/domain/weather/use-cases/get-weather-ai-insights'
import { GetWeatherLogsUseCase } from '@/domain/weather/use-cases/get-weather-logs'
import { SaveWeatherLogsUseCase } from '@/domain/weather/use-cases/save-weather-logs'
import { AiModule } from '../ai/ai.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { EnvModule } from '../env/env.module'
import { ReporterModule } from '../reporter/reporter.module'
import { AuthenticateController } from './controllers/user/authenticate.controller'
import { CreateUserController } from './controllers/user/create-user.controller'
import { DeleteUserController } from './controllers/user/delete-user.controller'
import { FindAllUsersController } from './controllers/user/find-all-users.controller'
import { UpdateUserController } from './controllers/user/update-user.controller'
import { ExportWeatherLogsXlsxController } from './controllers/weather/export-weather-data-xlsx.controller'
import { ExportWeatherLogsCsvController } from './controllers/weather/export-weather-logs-csv.controller'
import { GetWeatherAiInsightsController } from './controllers/weather/get-weather-ai-insights.controller'
import { GetWeatherLogsController } from './controllers/weather/get-weather-logs.controller'
import { SaveWeatherLogsController } from './controllers/weather/save-weather-logs.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, ReporterModule, AiModule, EnvModule],
  controllers: [
    AuthenticateController,
    CreateUserController,
    DeleteUserController,
    FindAllUsersController,
    UpdateUserController,
    SaveWeatherLogsController,
    GetWeatherLogsController,
    ExportWeatherLogsCsvController,
    ExportWeatherLogsXlsxController,
    GetWeatherAiInsightsController
  ],
  providers: [
    AuthenticateUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    SaveWeatherLogsUseCase,
    GetWeatherLogsUseCase,
    ExportWeatherLogsCsvUseCase,
    ExportWeatherLogsXlsxUseCase,
    GetWeatherAiInsightsUseCase
  ]
})
export class HttpModule {}
