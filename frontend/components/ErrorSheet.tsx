import { Box, Button, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface Error {
  status?: string;
  message?: string;
  data?: {
    code: number;
    message: string;
  };
}

interface ErrorSheetProps {
  error: Error;
  showError: boolean;
  onChange: (value: boolean) => void;
}

export default function ErrorSheet({ error, showError, onChange }: ErrorSheetProps) {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStatus(error.status || '');
    if (error.data) {
      setMessage(error.data.message || '');
    } else {
      setMessage(error.message || '');
    }
  }, [error]);

  return (
    <Box className={`text-center mt-20 ${showError ? 'block' : 'hidden'}`}>
      <VStack spacing={4}>
        <Button
          onClick={() => onChange(false)}
          colorScheme="blue"
          className="mt-6"
        >
          Close
        </Button>
        {status && <p>Status: {status}</p>}
        {message && <p>Message: {message}</p>}
      </VStack>
    </Box>
  );
}
