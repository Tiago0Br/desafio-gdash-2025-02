import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

type GetCsvReporterResponse = BlobPart

export async function getCsvReporter(): Promise<GetCsvReporterResponse> {
  try {
    const response = await api.get('/weather/export/csv', {
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}
