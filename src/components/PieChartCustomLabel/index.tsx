import { colors } from '@/styles/colors'
import { Group, Text, type SkFont } from '@shopify/react-native-skia'

import type { PieSliceData } from 'victory-native'

export const PieChartCustomLabel = ({
  slice,
  font,
  position,
  totalExpense,
}: {
  slice: PieSliceData
  font: SkFont | null
  position: { x: number; y: number }
  totalExpense: number
}) => {
  const { x, y } = position
  // const fontSize = font?.getSize() ?? 0

  const getLabelWidth = (text: string) =>
    font
      ?.getGlyphWidths(font.getGlyphIDs(text))
      .reduce((sum, value) => sum + value, 0) ?? 0

  const value = `${slice.value}`

  const formattedTotalExpense = totalExpense / 100

  const percentageExpenseCategory = (slice.value / formattedTotalExpense) * 100
  return (
    <Group>
      <Group>
        <Text
          x={x - getLabelWidth(value) / 2}
          y={y}
          // y={y + fontSize}
          text={`${percentageExpenseCategory.toFixed()}%`}
          font={font}
          color={colors['secondary-dark']}
        />
      </Group>
    </Group>
  )
}
