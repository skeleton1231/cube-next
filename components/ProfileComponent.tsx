'use client'
import { useUser } from "@/context/UserContext";

export const ProfileComponent = () => {

    const isClient = typeof window !== 'undefined';
  
    // Initialize user as null
    let user = null;
    
    // If we are on the client-side, get user from UserContext
    if (isClient) {
      const userContext = useUser();
      user = userContext ? userContext.user : null;
    }
    console.log(user)

    // This will only be rendered on the client side
      return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
            </div> 
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                    </div>
                </dl>
            </div>
        </div>
    
      );
    

};

export default ProfileComponent;
