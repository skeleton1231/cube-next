import React, { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm2 from '@/components/CheckoutForm2';
import apiClient from '@/utils/APIClient';
import Header from "@/components/ui/header";
import Link from "next/link";

// 此处根据 apiClient.setupIntent() 的实际返回类型来调整。
interface IntentResponse {
  data: any;
  intent: {
    client_secret: string;
  };
}

// 这是你的测试可发布API密钥。
const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

const Payment: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null); // Initialize with null to indicate loading state

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response: IntentResponse = await apiClient.setupIntent();
        setClientSecret(response.data.intent.client_secret); // Adjust according to the actual structure of your response
      } catch (error) {
        console.error("Error fetching client secret:", error);
        // Handle error as appropriate
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <>
      <Header nav={true} />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-sm mx-auto">
            {clientSecret ? ( // Check if clientSecret is not null
              <Elements stripe={stripePromise} options={{clientSecret}} // Pass the clientSecret here
              >
                <CheckoutForm2 /> {/* Pass clientSecret to CheckoutForm2 */}
              </Elements>
            ) : (
              <p>Loading...</p> // Show a loading message or a spinner
            )}
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
    </>
  );
};

export default Payment;
