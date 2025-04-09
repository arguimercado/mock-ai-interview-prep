import Image from 'next/image'
import Link from 'next/link'
import React, {ReactNode} from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action'

import { ROUTES } from '@/constants/routes'
import { redirect } from 'next/navigation'
import SignOut from '../(auth)/_components/SignOut'


const RootLayout = async ({children} : {children: ReactNode} ) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect(ROUTES.SIGNIN);

 

  return (
    <div className='root-layout'>
      <nav className='flex justify-between items-center'>
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className='text-primary-100'>PrepCrew</h2>
        </Link>
        <div className='flex flex-row items-center gap-2'>
          <SignOut />
        </div>
      </nav>
      {children}
    </div>
  )
}
export default RootLayout
