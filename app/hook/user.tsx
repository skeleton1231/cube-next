import { useUser } from "@/context/UserContext";

export function useCurrentUser() {
  const isClient = typeof window !== 'undefined';
  
  // If we are on the server-side, just return null
  if (!isClient) {
    return { user: null, loading: true };
  }
  
  // If we are on the client-side, get user from UserContext
  const userContext = useUser();
  
  return userContext ? { user: userContext.user, loading: userContext.loading } : { user: null, loading: true };
}
