import { Box, Heading, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const WalletCard = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState('');
  const [pointer, setPointer] = useState(false);
  const [ciphertext, setCiphertext] = useState('');
  const [walletId, setWalletId] = useState('');
  const [tokenId, setTokenId] = useState(''); 
  const [destinationAddress, setDestinationAddress] = useState('');
  const [walletSetName, setWalletSetName] = useState('');
  const [creationWalletId, setCreationWalletId] = useState('');
  const [blockchain, setBlockchain] = useState('MATIC-MUMBAI');
  const [walletCount, setWalletCount] = useState('1');

  const fetchCipherText = async () => {
    try {
      const response = await axios.get('/api/getciphertext');
      setCiphertext(response.data.Ciphertext);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCipherText();
  }, [pointer]);

  const handleBlockchain = (value) => {
    setBlockchain(value);
  };

  const fetchWalletBalance = async () => {
    try {
      const response = await axios.get(`https://api.circle.com/v1/w3s/wallets/${walletId}/balances`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CIRCLE_API}`,
        },
      });
      setWalletBalance(response.data);
      setPointer(!pointer);
    } catch (error) {
      console.error(error);
    }
  };

  const initiateTransfer = async () => {
    try {
      const response = await axios.post('https://api.circle.com/v1/w3s/developer/transactions/transfer', {
        idempotencyKey: uuid(),
        entitySecretCipherText: ciphertext,
        amounts: [transferAmount],
        feeLevel: 'HIGH',
        tokenId: tokenId,
        walletId: walletId,
        destinationAddress: destinationAddress,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CIRCLE_API}`,
        },
      });
      setTransferStatus('Transfer initiated successfully.');
      console.log(response, "transfer response");
    } catch (error) {
      console.error(error);
      setTransferStatus('Transfer failed. Check the console for details.');
    }
  };

  const createWalletset = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CIRCLE_API}`,
      },
      body: JSON.stringify({
        idempotencyKey: uuid(),
        entitySecretCiphertext: ciphertext,
        name: walletSetName,
      }),
    };

    fetch('https://api.circle.com/v1/w3s/developer/walletSets', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  const createWallet = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CIRCLE_API}`,
      },
      body: JSON.stringify({
        idempotencyKey: uuid(),
        blockchains: [blockchain],
        count: walletCount,
        entitySecretCiphertext: ciphertext,
        metadata: [{ name: 'My Wallet 1', refId: 'grouptransaction123' }],
        walletSetId: walletId,
      }),
    };

    fetch('https://api.circle.com/v1/w3s/developer/wallets', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="lg">Wallet Information</Heading>
      <Input
        placeholder="Wallet ID"
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
      />
      <Text mb={2}>Current Balance: {walletBalance?.balance}</Text>
      <Button colorScheme="blue" onClick={fetchWalletBalance}>Check Balance</Button>

      <Heading as="h2" size="lg">Create WalletSet</Heading>
      <Input
        placeholder="WalletSet Name"
        value={walletSetName}
        onChange={(e) => setWalletSetName(e.target.value)}
      />
      <Button colorScheme="blue" onClick={createWalletset}>Create WalletSet</Button>

      <Input
        placeholder="WalletSet ID"
        value={creationWalletId}
        onChange={(e) => setCreationWalletId(e.target.value)}
      />

      <RadioGroup value={blockchain} onChange={(value) => handleBlockchain(value)}>
        <Stack direction='row'>
          <Radio value='MATIC-MUMBAI'>MATIC-MUMBAI</Radio>
          <Radio value='ETH-GOERLI'>ETH-GOERLI</Radio>
          <Radio value='AVAX-FUJI'>AVAX-FUJI</Radio>
        </Stack>
      </RadioGroup>

      <Input
        placeholder="Wallet Count"
        value={walletCount}
        onChange={(e) => setWalletCount(e.target.value)}
      />
      <Button colorScheme="blue" onClick={createWallet}>Create Wallet</Button>

      {walletBalance?.data.tokenBalances.map((tokenBalance, index) => (
        <Box key={index} borderWidth="1px" borderRadius="md" p={2} mt={2}>
          <Heading as="h3" size="md">{tokenBalance.token.name} ({tokenBalance.token.symbol})</Heading>
          <Text>TokenID: {tokenBalance.token.id}</Text>
          <Text>Balance: {tokenBalance.amount}</Text>
        </Box>
      ))}

      <Box mt={4}>
        <Heading as="h3" size="md">Initiate Transfer</Heading>
        <Input
          placeholder="Amount to Transfer"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <Input
          placeholder="Wallet ID"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
        />
        <Input
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <Input
          placeholder="Destination Address"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
        <Button colorScheme="green" onClick={initiateTransfer}>Transfer Funds</Button>
        <Text mt={2} color="green.500">{transferStatus}</Text>
      </Box>
    </Box>
  );
};

export default WalletCard;
