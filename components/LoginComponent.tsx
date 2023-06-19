'use client'
import apiClient from '@/utils/APIClient';
import Link from 'next/link';
import { useState } from 'react';

export default function SignIn() {
  // state to store form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // form submission handler
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const data = await apiClient.loginUser({ email, password });
      // handle success (e.g. redirect user, show a success message, etc.)
    } catch (error) {
      // handle error (e.g. show error message)
      console.error("An error occurred while logging in: ", error);
    }
  }
  
  return (
    // ...rest of your component

    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input id="email" className="form-input text-sm py-2 w-full" type="email" required 
            value={email} onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label className="block text-sm text-slate-400 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <Link className="text-sm font-medium text-indigo-500 ml-2" href="/reset-password">
              Forgot?
            </Link>
          </div>
          <input id="password" className="form-input text-sm py-2 w-full" type="password" autoComplete="on" required 
            value={password} onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6">
        <button className="btn-sm text-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group">
          Sign In{' '}
          <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
            -&gt;
          </span>
        </button>
      </div>
    </form>

    // ...rest of your component
  );
}
