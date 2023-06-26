// pages/billing.tsx

import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { UserProvider } from "@/context/UserContext";


export default function Billing() {
  return (
    <UserProvider>
    <Header nav={true} />
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-16">
                <div className="text-center">
                <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Billing</h2>
                <p className="mt-5 mx-auto max-w-xl text-xl text-slate-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in, accusamus quisquam.</p>
                </div>
            </div>
        </div>
        </div>
      <Footer />
    </UserProvider>
    
  );
}
