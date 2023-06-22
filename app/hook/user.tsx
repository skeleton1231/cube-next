import { useUser } from "@/context/UserContext";

export function useCurrentUser() {
  const isClient = typeof window !== 'undefined';
  
  // If we are on the server-side, just return null
  if (!isClient) {
    return null;
  }
  
  // If we are on the client-side, get user from UserContext
  const userContext = useUser();
  
  return userContext ? userContext.user : null;
}
