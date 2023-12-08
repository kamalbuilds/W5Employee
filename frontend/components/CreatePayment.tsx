// @ts-nocheck
import { useState } from 'react';
import { Box, VStack, FormControl, FormLabel, Input, Select, Checkbox, Button } from '@chakra-ui/react';
import RequestInfo from './RequestInfo';
import ErrorSheet from './ErrorSheet';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from '../node_modules/next/router';
import { CreateCardPaymentPayload } from '../lib/paymentsApi';
import fetchYourPCIPublicKey from '../lib/paymentsApi';
import openPGP from 'openpgp';

export default function CreatePayment() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    sourceId: '',
    sourceType: 'card', // Default to card
    verification: 'cvv',
    amount: '0.00',
    autoCapture: true,
    cvv: '',
    description: '',
    channel: '',
    verificationSuccessUrl: '',
    verificationFailureUrl: '',
    phoneNumber: '',
    email: '',
  });

  const [showCvv, setShowCvv] = useState(true);
  const [cvvLabel, setCvvLabel] = useState('CVV');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const verificationMethods = ['none', 'cvv', 'three_d_secure'];
  const sourceType = ['card', 'ach', 'payment_token'];

  const onChildChanged = (val: string) => {
    if (val === 'none') {
      setShowCvv(false);
    }
    if (val === 'cvv') {
      setShowCvv(true);
      setCvvLabel('CVV');
    }
    if (val === 'three_d_secure') {
      setShowCvv(true);
      setCvvLabel('CVV (Optional)');
    }
  };

  const onSourceTypeChanged = (val: string) => {
    if (val === 'card') {
      setFormData({ ...formData, verification: 'cvv' });
    } else {
      setFormData({ ...formData, verification: 'none' });
    }
  };

  const onErrorSheetClosed = () => {
    setError({});
    setShowError(false);
  };

  const makeApiCall = async () => {
    setLoading(true);
    const amountDetail = {
      amount: formData.amount,
      currency: 'USD',
    };
    const sourceDetails = {
      id: formData.sourceId,
      type: formData.sourceType,
    };
    const payload: CreateCardPaymentPayload = {
      idempotencyKey: uuidv4(),
      autoCapture: formData.autoCapture,
      amount: amountDetail,
      source: sourceDetails,
      description: formData.description,
      verificationSuccessUrl: formData.verificationSuccessUrl,
      verificationFailureUrl: formData.verificationFailureUrl,
      metadata: {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        sessionId: 'xxx',
        ipAddress: '172.33.222.1',
      },
      channel: formData.channel,
    };

    if (formData.sourceType === 'card') {
      payload.verification = formData.verification;
    }

    try {
      if (
        formData.verification === 'cvv' ||
        (formData.verification === 'three_d_secure' && formData.cvv !== '')
      ) {
        const { cvv } = formData;
        const cardDetails = { cvv };

        const publicKey = await fetchYourPCIPublicKey(); // Replace with your method to fetch the public key.
        const encryptedData = await openPGP.encrypt(cardDetails, publicKey); // Replace with your OpenPGP encryption method.
        payload.encryptedData = encryptedData.encryptedMessage;
        payload.keyId = encryptedData.keyId;
      }

      // Replace the following line with your API call using Next.js fetch or Axios.
      // Example: const response = await fetch('/api/createPayment', { method: 'POST', body: JSON.stringify(payload) });
      // const data = await response.json();

      // Handle the API response here.

    } catch (error) {
      setError(error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Source Account Id</FormLabel>
          <Input
            type="text"
            value={formData.sourceId}
            onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Source Account Type</FormLabel>
          <Select
            value={formData.sourceType}
            onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
          >
            {sourceType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            type="text"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <Checkbox
            isChecked={formData.sourceType !== 'ach' && formData.autoCapture}
            onChange={(e) => setFormData({ ...formData, autoCapture: e.target.checked })}
          >
            Auto capture
          </Checkbox>
        </FormControl>
        {formData.sourceType === 'card' && (
          <FormControl>
            <FormLabel>Verification Method</FormLabel>
            <Select
              value={formData.verification}
              onChange={(e) => setFormData({ ...formData, verification: e.target.value })}
            >
              {verificationMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {showCvv && (
          <FormControl>
            <FormLabel>{cvvLabel}</FormLabel>
            <Input
              type="text"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            />
          </FormControl>
        )}
        {formData.sourceType !== 'payment_token' && (
          <FormControl>
            <FormLabel>VerificationSuccessUrl</FormLabel>
            <Input
              type="text"
              value={formData.verificationSuccessUrl}
              onChange={(e) => setFormData({ ...formData, verificationSuccessUrl: e.target.value })}
            />
          </FormControl>
        )}
        {formData.sourceType !== 'payment_token' && (
          <FormControl>
            <FormLabel>VerificationFailureUrl</FormLabel>
            <Input
              type="text"
              value={formData.verificationFailureUrl}
              onChange={(e) => setFormData({ ...formData, verificationFailureUrl: e.target.value })}
            />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Channel</FormLabel>
          <Input
            type="text"
            value={formData.channel}
            onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone number of the user in E.164 format</FormLabel>
          <Input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          isLoading={loading}
          onClick={makeApiCall}
        >
          Make API call
        </Button>
      </VStack>
      <Box>
        <RequestInfo url={requestUrl} payload={payload} response={response} />
      </Box>
      <Box>
        <ErrorSheet error={error} showError={showError} onChange={onErrorSheetClosed} />
      </Box>
    </Box>
  );
}
