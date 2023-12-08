import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Spinner,
  Card,
  Center,
  VStack,
  InputGroup,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";
import { Circle, CircleEnvironments, PaymentIntentCreationRequest } from "@circle-fin/circle-sdk";
import Checkout from "./Circle/Checkout";
import WalletCard from "./WalletCard";

function VcGatedDapp(companyName) {

  return (
    <div id="vc-gated-dapp">
      <Box background="black" color="white" py={4}>
        <Container maxW={"80%"}>
          <Flex justifyContent="space-between">
            <Heading>Welcome Employees of {companyName.companyname} </Heading>
          </Flex>
        </Container>
      </Box>

      <Box>
        <Container maxW={"80%"} py={4}>

          <div>
          <Container maxW="xl" centerContent>
            <Text as="h1" fontSize="2xl" mt={4}>My Wallet</Text>
            <WalletCard />
          </Container>

          </div>
        </Container>
      </Box>
    </div>
  );
}

export default VcGatedDapp;
