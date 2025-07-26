
/*
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("API URL not defined");
}

const API_URL = `${baseUrl}/`;

interface CheckEmailResponse {
  exists: boolean;
  message?: string;
}

export const useCheckEmail = () => {
  return useMutation<CheckEmailResponse, Error, { email: string }>({
    mutationFn: async ({ email }) => {
    
      const res = await axios.post(API_URL, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    },
  });
};


*/


  export const useCheckEmail = () =>
{
  
}