// @ts-nocheck
import React from "react";
import VcGatedDapp from "../../../components/VcGatedDapp";
import { useState } from "react";
import { Box, Flex, Heading, Button, Spinner, InputGroup, Input, Select } from "@chakra-ui/react";
import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";
import Checkout from "../../../components/Circle/Checkout";
import { useRouter } from "../../../node_modules/next/router";
import { toast } from "react-toastify";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const a = process.env.NEXT_PUBLIC_APP_CIRCLE_SANDBOX_API_KEY;

  const circle = new Circle(
    a,
    CircleEnvironments.sandbox // API base url
  );

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');

  async function createCheckoutSession() {
    setLoading(true);
    const createCheckoutSessionRes = await circle.checkoutSessions.createCheckoutSession({
      successUrl: "https://zkemployee.vercel.app/success",
      amount: {
        amount: amount,
        currency: currency,
      },
    });

    toast.success("Checkout session created");
    setData(createCheckoutSessionRes?.data?.data);
    setLoading(false);
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Enter details to pay your Employees at {}</h2>
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/2">
          <InputGroup className="mb-4">
            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-4">
            <Select
              placeholder="Select option"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <option value="USD">USDC</option>
              <option value="ETH">Ethereum</option>
              <option value="BTC">Bitcoin</option>
            </Select>
          </InputGroup>

          <Button
            onClick={() => {
              if (!loading) {
                createCheckoutSession();
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
          >
            {loading ? 'Loading...' : 'Pay with Circle'}
          </Button>
        </div>

        <div className="md:w-1/2 mt-4 md:mt-0">
          {data && <Checkout data={data} merchantName={router.query.id} />}
        </div>
      </div>
    </div>
  );
}

export default App;
