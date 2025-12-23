import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import styled from 'styled-components'
import { colors } from '@shared/style'
import { getBarColor } from './getBarColor'

type BarChartData = {
  name: string
  value: number
}

type BarChartProps = {
  data: BarChartData[]
  dataKey?: string
  xAxisKey?: string
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  padding: 10px 20px;
  background-color: ${colors.grey100};
`

/**
 * 바 차트 컴포넌트
 * @param data 차트 데이터 배열
 * @param dataKey Y축에 표시할 데이터 키 (기본값: 'value')
 * @param xAxisKey X축에 표시할 데이터 키 (기본값: 'name')
 */
export function BarChart({ data, dataKey = 'value', xAxisKey = 'name' }: BarChartProps) {
  const values = data.map((item) => item.value)
  const minValue = values.length > 0 ? Math.min(...values) : 0
  const maxValue = values.length > 0 ? Math.max(...values) : 0

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grey300} />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: colors.grey600, fontSize: 12 }}
            tickLine={{ stroke: colors.grey400 }}
            label={{ value: '가격대', position: 'insideBottom', offset: -5, style: { fill: colors.grey600 } }}
          />
          <YAxis
            tick={{ fill: colors.grey600, fontSize: 12 }}
            tickLine={{ stroke: colors.grey400 }}
            label={{ value: '인원수', angle: -90, position: 'insideLeft', style: { fill: colors.grey600 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.grey100,
              border: `1px solid ${colors.grey300}`,
              borderRadius: '8px',
              padding: '12px 12px 8px',
            }}
            labelStyle={{ color: colors.grey900, fontWeight: 'bold', marginBottom: '4px' }}
            itemStyle={{ color: colors.grey600 }}
            labelFormatter={(label) => `가격대: ${label}`}
            formatter={(value) => [`${value ?? 0}명`, '인원수']}
          />
          <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value, minValue, maxValue)} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
