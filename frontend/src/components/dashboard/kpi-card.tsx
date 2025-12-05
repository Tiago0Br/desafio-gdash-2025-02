import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface KpiCardProps {
  title: string
  value: string
  sub: string | null
  icon: React.ReactNode
}

export function KpiCard({ title, value, sub, icon }: KpiCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  )
}
