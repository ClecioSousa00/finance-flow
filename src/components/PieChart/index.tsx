import { colors } from '@/styles/colors'
import { Pie, PolarChart } from 'victory-native'
import { PieChartCustomLabel } from '../PieChartCustomLabel'
import { TransactionsPieChart } from '@/types/transactionProps'
import { useFont } from '@shopify/react-native-skia'
import poppins from '@/assets/fonts/Poppins-SemiBold.ttf'

type Props = {
  dataPieChart: TransactionsPieChart[]
  totalExpense: number
}

export const PieChart = ({ dataPieChart, totalExpense }: Props) => {
  const font = useFont(poppins, 14)
  return (
    <PolarChart
      data={dataPieChart}
      colorKey={'color'}
      valueKey={'value'}
      labelKey={'label'}
    >
      <Pie.Chart>
        {({ slice }) => {
          return (
            <>
              <Pie.Slice>
                <Pie.Label radiusOffset={0.6}>
                  {(position) => (
                    <PieChartCustomLabel
                      position={position}
                      slice={slice}
                      font={font}
                      totalExpense={totalExpense}
                    />
                  )}
                </Pie.Label>
              </Pie.Slice>

              <Pie.SliceAngularInset
                angularInset={{
                  angularStrokeWidth: 2,
                  angularStrokeColor: colors['primary-Light'],
                }}
              />
            </>
          )
        }}
      </Pie.Chart>
    </PolarChart>
  )
}
