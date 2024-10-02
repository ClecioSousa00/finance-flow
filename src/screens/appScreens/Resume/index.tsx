import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { useTransactionContext } from '@/contexts/TransactionContext'
import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'

export const Resume = () => {
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
      <Container></Container>
    </ContainerScreens>
  )
}
