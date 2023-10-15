'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Image from 'next/image'
import Header from '@/components/ui/header'
import Illustration from '@/public/images/hero-illustration.svg'
import Footer from '@/components/ui/footer'
import { UserProvider } from '@/context/UserContext'
import { ToastContainer } from 'react-toastify'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  console.log("DefaultLayout:layout.tsx start");
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <>
    <UserProvider>
      <Header />
      <main className="grow">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
          <Image src={Illustration} className="max-w-none" priority alt="Hero Illustration" />
        </div>
        {children}
      </main>
      <Footer />
    </UserProvider>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

