// location: /profile
import React, { useContext } from 'react'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { UserProvider } from '@/context/UserContext';

export const metadata = {
  title: 'Profile - Cube',
  description: 'User profile page',
}

// Dynamically import the ProfileComponent with SSR (Server-Side Rendering) set to false
const DynamicProfileComponent = dynamic(() => import('@/components/ProfileComponent'), { ssr: false });


export default function Profile() {

  return (
    <UserProvider>
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        {/* Page header */}
        <div className="max-w-3xl mx-auto text-center pb-12">
          <h1 className="h2 font-hkgrotesk">Your Profile</h1>
        </div>
        {/* Profile */}
        <div className="max-w-sm mx-auto">
          <DynamicProfileComponent/>
        </div>
        {/* Return to Home */}
        <div className="text-center mt-6">
          <div className="text-sm text-slate-500">
            Return to{' '}
            <Link href="/" className="font-medium text-indigo-500">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
    </UserProvider>
  )
}
