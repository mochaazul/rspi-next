import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, PropsWithRef } from 'react'

const HeaderBrand = () => {
  return (
    <Link href='/' className='relative overflow-hidden w-[70px] h-8 lg:w-[132px] lg:h-[60px]'>
      <Image
        src='/images/logo_rspi.svg'
        alt='rspi-logo'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        fill
      />
    </Link>
  )
}

export default HeaderBrand