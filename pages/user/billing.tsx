// pages/billing.tsx

import Pricing from "@/components/pricing";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { UserProvider } from "@/context/UserContext";


export default function Billing() {
  return (
    <>
    <Pricing />
    </>
  );
}
