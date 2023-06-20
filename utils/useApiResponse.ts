import { useState } from 'react';

type ApiResponse = {
  type: 'success' | 'error';
  message: string;
}

export const useApiResponse = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  return {
    apiResponse,
    setApiResponse
  }
};
