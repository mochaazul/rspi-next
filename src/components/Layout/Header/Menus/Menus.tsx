import { Text } from '@/components/ui';
import { colors } from '@/constant';
import { PropsWithChildren, PropsWithRef } from 'react'

type Props = PropsWithRef<PropsWithChildren<{
  items: unknown[]
  label: string
  itemKey?: string
}>>

const Menus = ({items,itemKey, label}:Props) => {
  
  return (
    <section>
      <Text text={ label } color={ colors.paradiso.default } fontSize='14px' fontWeight='900' />
    </section>
  )
}

export default Menus