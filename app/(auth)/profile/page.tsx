export const metadata = {
  title: 'Profile - Cube',
  description: 'User profile page',
}

import Link from 'next/link'
import ProfileComponent from '@/components/ProfileComponent';
import { UserProvider } from '@/context/UserContext';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

export default function Profile() {
  return (
    <UserProvider>
      <Header></Header>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-sm mx-auto">
            <ProfileComponent />
          </div>
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
      <Footer></Footer>
    </UserProvider>
  )
}
