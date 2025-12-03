import { Download } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { Button } from '../ui/button'

interface ExportReportButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  reportType: 'xlsx' | 'csv'
  getContentFn: () => Promise<BlobPart>
}

export function ExportReportButton({
  reportType,
  getContentFn,
  ...props
}: ExportReportButtonProps) {
  async function handleExport() {
    const reportContent = await getContentFn()

    const blob = new Blob([reportContent], {
      type:
        reportType === 'csv'
          ? 'text/csv'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url

    const fileName = `relatorio_clima_${new Date().toISOString().split('T')[0]}.${reportType}`
    link.setAttribute('download', fileName)

    document.body.appendChild(link)
    link.click()

    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Button {...props} onClick={handleExport}>
      <Download className="mr-2 size-4" />
      Exportar {reportType === 'xlsx' ? 'XLSX' : 'CSV'}
    </Button>
  )
}
