export const metadata = {
  title: 'Sign Up - Cube',
  description: 'Page description',
}

import Avatar01 from '@/public/images/avatar-01.jpg'
import Avatar02 from '@/public/images/avatar-02.jpg'
import Avatar03 from '@/public/images/avatar-03.jpg'
import Avatar04 from '@/public/images/avatar-04.jpg'
import Avatar from '@/components/Avatar'
import ListItem from '@/components/ListItem'
import RegisterComponent from '@/components/RegisterComponent'


export default function SignUp() {

  return (

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="lg:flex lg:space-x-20">
          {/* Left side */}
          <div className="grow lg:mt-20 mb-12 lg:mb-0 flex flex-col items-center lg:items-start">
            {/* Avatars */}
            <div className="flex -space-x-3 -ml-0.5 mb-6">
              <Avatar src={Avatar01} alt="Avatar 01" />
              <Avatar src={Avatar02} alt="Avatar 02" />
              <Avatar src={Avatar03} alt="Avatar 03" />
              <Avatar src={Avatar04} alt="Avatar 04" />
            </div>
            {/* Headline */}
            <h1 className="h2 font-hkgrotesk mb-8 text-center lg:text-left">Get a taste of the user-centric platform</h1>
            {/* List */}
            <ul className="inline-flex flex-col text-lg text-slate-500 space-y-3">
              <ListItem>Excepteur sint occaecat cupidatat non proident sunt in culpa.</ListItem>
              <ListItem>Duis aute irure dolor in reprehenderit in voluptate.</ListItem>
              <ListItem>Eiusmod tempor incididunt ut labore et dolore magna aliqua.</ListItem>
            </ul>
          </div>
          {/* Right side */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Bg gradient */}
            <div className="absolute inset-0 opacity-40 bg-gradient-to-t from-transparent to-slate-800 -z-10" aria-hidden="true" />
            <div className="p-6 md:p-8">
              <div className="font-hkgrotesk text-xl font-bold mb-6">Let's talk</div>
              {/* Form */}
              <RegisterComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}