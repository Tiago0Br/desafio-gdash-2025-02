import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

type GetXlsxReporterResponse = BlobPart

export async function getXlsxReporter(): Promise<GetXlsxReporterResponse> {
  try {
    const response = await api.get('/weather/export/xlsx', {
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}
