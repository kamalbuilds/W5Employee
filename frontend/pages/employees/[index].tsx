import React from "react";
import { useState } from 'react';
import PolygonIDVerifier from "../../components/PolygonIDVerifier";
import VcGatedDapp from "../../components/VcGatedDapp";
import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";
import { useRouter } from "../../node_modules/next/router";
import {  toast } from 'react-toastify';

function App() {

  const [provedEmployee, setProvedEmployee] = useState(false);
  const router = useRouter();
  const companyname = router.query.index;

  const notify = () => {
    toast.success("You are a verified employee of " + companyname);
    setProvedEmployee(!provedEmployee);
  }

  return (
    <>
      {provedEmployee ? (
        <>
        <VcGatedDapp companyname={companyname} />
        </>
      ) : (
        <Center className="vc-check-page">
          <Container>
            <Card
              style={{
                border: "2px solid #805AD5",
              }}
            >
              <CardBody style={{ paddingBottom: 0 }}>
                <p>
                  This verifies that you are a real employee of {" "}
                  {companyname}. Prove that you hold the Employee Verified Credentials to proceed ahead 🔐
                </p>
                <PolygonIDVerifier
                  publicServerURL={
                    process.env.NEXT_PUBLIC_APP_VERIFICATION_SERVER_PUBLIC_URL
                  }
                  localServerURL={
                    process.env.NEXT_PUBLIC_APP_VERIFICATION_SERVER_LOCAL_HOST_URL
                  }
                  credentialType={"ProofOfEmployment"}
                  issuerOrHowToLink={
                    ""
                  }
                  onVerificationResult={notify}
                />
                <Image
                  src="https://bafybeibcgo5anycve5flw6pcz5esiqkvrzlmwdr37wcqu33u63olskqkze.ipfs.nftstorage.link/"
                  alt="Polygon devs image"
                  borderRadius="lg"
                />
              </CardBody>
              <a
                href="https://twitter.com/0xkamal7"
                target="_blank"
                rel="noreferrer"
              >
              </a>
            </Card>
          </Container>
        </Center>
      )}
    </>
  );
}

export default App;
