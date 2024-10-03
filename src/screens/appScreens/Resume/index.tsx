import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { useTransactionContext } from '@/contexts/TransactionContext'
import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { PieChartCustomLabel } from '@/PieChartCustomLabel'
import { useState } from 'react'
import { View } from 'react-native'
import { Pie, PolarChart } from 'victory-native'
import { useFont } from '@shopify/react-native-skia'
import poppins from '@/assets/fonts/Poppins-Regular.ttf'

export const Resume = () => {
  const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 125
  function generateRandomColor(): string {
    // Generating a random number between 0 and 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xffffff)
    // Converting the number to a hexadecimal string and padding with zeros
    return `#${randomColor.toString(16).padStart(6, '0')}`
  }

  const DATA = (numberPoints = 5) =>
    Array.from({ length: numberPoints }, (_, index) => ({
      value: randomNumber(),
      color: generateRandomColor(),
      label: `Label ${index + 1}`,
    }))
  const font = useFont(poppins, 14)
  const [data, setData] = useState(DATA(5))
  const [insetWidth, setInsetWidth] = useState(4)
  const [insetColor, setInsetColor] = useState<string>('#fafafa')
  const [dataLabelSegment, setDataLabelSegment] = useState<
    'simple' | 'custom' | 'none'
  >('custom')
  const { dataTransactions } = useTransactionContext()
  const { totalBalanceTransactions } =
    useCalculateBalanceInfos(dataTransactions)

  return (
    <ContainerScreens>
      <HeaderAppScreen className="gap-3 py-4">
        <TitleScreen title="resumo anual" />
        <ContainerBalanceInfos
          totalBalanceTransactions={totalBalanceTransactions}
        />
      </HeaderAppScreen>
      <Container>
        <View style={{ height: 500 }}>
          <PolarChart
            data={data}
            colorKey={'color'}
            valueKey={'value'}
            labelKey={'label'}
          >
            <Pie.Chart>
              {({ slice }) => {
                return (
                  <>
                    <Pie.Slice>
                      {dataLabelSegment === 'simple' && (
                        <Pie.Label color={'black'} />
                      )}
                      {dataLabelSegment === 'custom' && (
                        <Pie.Label radiusOffset={0.6}>
                          {(position) => (
                            <PieChartCustomLabel
                              position={position}
                              slice={slice}
                              font={font}
                            />
                          )}
                        </Pie.Label>
                      )}
                    </Pie.Slice>

                    <Pie.SliceAngularInset
                      angularInset={{
                        angularStrokeWidth: insetWidth,
                        angularStrokeColor: insetColor,
                      }}
                    />
                  </>
                )
              }}
            </Pie.Chart>
          </PolarChart>
        </View>
      </Container>
    </ContainerScreens>
  )
}
