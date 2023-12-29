import { PropsWithChildren, PropsWithRef } from 'react'

type Props = PropsWithRef<PropsWithChildren<{

}>>

const HeaderProfile = ({children}:Props) => {
  
  return (
    <>HeaderProfile Component</>
  )
}

export default HeaderProfile