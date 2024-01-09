import React from "react";
import { useState , useEffect} from 'react';
import VcGatedDapp from "../../components/VcGatedDapp";
import { Center, Card, Image, CardBody, Container, Button , VStack} from "@chakra-ui/react";
import { useRouter } from "../../node_modules/next/router";
import {  toast } from 'react-toastify';
import { VerifiableCredential } from '@web5/credentials';
import { Web5 } from "@web5/api";
import { DidKeyMethod, DidDhtMethod, DidIonMethod } from '@web5/dids';
import VCProjectcard from "../../components/VCProjectcard";

function App() {

  const [provedEmployee, setProvedEmployee] = useState(false);
  const [web5, setWeb5] = useState(null);
  const [employeeDid, setEmployeeDid] = useState(null); // [1]
  const [vcData, setVcData] = useState(null); // [1]
  const router = useRouter();
  const companyname = router.query.index;

  const createProtocolDefinition =() => {

    const W5EmployeeProtocolDefinition = {
      protocol: "https://w5employee.vercel.app/protocol4",
      published: true,
      types: {
        vc: {
          schema: 'https://w5employee.vercel.app/schema',
          dataFormats: ["application/text"],
        },
      },
      structure: {
        vc: {
          $actions: [
            { who: "anyone", can: "read" },
            // { who: "author", of: "vc", can: "write" },
            // { who: "recipient", of: "vc", can: "read" },
            { who: "anyone", can: "write" },
          ],
        },
      },
    };
    return W5EmployeeProtocolDefinition;
  };
  
  const queryForProtocol = async (web5) => {
    return await web5?.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://w5employee.vercel.app/protocol4",
        },
      },
    });
  };
  

  const installProtocolLocally = async (web5, protocolDefinition) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  
  const configureProtocol = async (web5, did) => {
    const protocolDefinition = await createProtocolDefinition();

    const { protocols: localProtocol, status: localProtocolStatus } =
      await queryForProtocol(web5);
    console.log({ localProtocol, localProtocolStatus });
    if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {

      const { protocol, status } = await installProtocolLocally(web5, protocolDefinition);
      toast.success("Protocol installed successfully 🚀");
      console.log("Protocol installed locally", protocol, status);

      const { status: configureRemoteStatus } = await protocol.send(did);
      console.log("Did the protocol install on the remote DWN?", configureRemoteStatus);
    } else {
      console.log("Protocol already installed");
    }
  };

  async function handleCreateCredentialRequest(e) {
    e.preventDefault();

    
  // Prerequisites: Create subject (alice)
    const aliceDid = await DidDhtMethod.create();
    const ionaliceDid = await DidIonMethod.create();
    const ionemployerDid = await DidIonMethod.create();

    const ionaliceDid2 =  await DidIonMethod.create({
      services: [{
          type: 'DecentralizedWebNode',
          id: '#dwn',
          serviceEndpoint: {
              "encryptionKeys": [
                  "#dwn-enc"
              ],
              "nodes": [
                  "https://dwn.tbddev.org/dwn0",
                  "https://dwn.tbddev.org/dwn2"
              ],
              "signingKeys": [
                  "#dwn-sig"
              ]
          }
      }]
  })

  
    const configureforalice = await configureProtocol(web5, employeeDid);

  }
  console.log('employeeDid', employeeDid);

 const getVc = async () => {

  const { records } = await web5.dwn.records.query({
    from: "did:ion:EiAWZrqejZkWXKpKG1XoiXc-kH5zENr8uZlPM7OaXYZSpQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiOEtLNEpxWXJLWEoyeDRkMUZCT0RKVmdVNDJwRzZobVRRbWduRVAtTXpwNCJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJwV0w1VDZDTmFCNnF1T2NPMVpLZldvdHpJZTByWWJxOHRveTlwaUFzMXdnIiwieSI6ImxRaDBYUzl6Tm5yZHhuMjFha25oTG1TQzNCS0phLVhKM3g2WFlOb1djT0kifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlEel83dndNUGExUEhsNmRvbWU5ZGk4OUZTc0Y2M2YtalVUOHdrVDkyQ1M3dyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQkk5Rm1KQndXT0RjbklrSmxCU0ZqQW9zTmV6c0NtVnU0QUdGUUJSbkxSdUEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUE2SDJvS2RTZFVKM2h5OG5tSnZjWHozR3BmUmxkd1RJdlNVZnRnakJFbzVnIn19",
    message: {
      filter: {
        protocol: 'https://w5employee.vercel.app/protocol4',
        protocolPath: 'vc'
      },
    },
  });
  console.log(records);

    const signedVcJwt = await records[0].data.text();
    const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
    setVcData(vc);
 };

  useEffect(() => {
    const initWeb5 = async () => {
      localStorage.clear();
      console.log("i am called");
      const { web5, did : userDid } = await Web5.connect();
      console.log(web5);
      setWeb5(web5);
      setEmployeeDid(userDid);
    };
    initWeb5();
  }, []);

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
                border: "2px solid #805AD5"
              }}
            >
              <CardBody style={{ paddingBottom: 0 }}>
                <p>
                  This verifies that you are a real employee of {" "}
                  {companyname}. Prove that you hold the Employee Verified Credentials to proceed ahead 🔐
                </p>
                <VStack spacing={4} align="stretch" className="p-4 hover:bg-green-400">
                  <Button onClick={handleCreateCredentialRequest}>Employee DID</Button>
                </VStack>

                <VStack spacing={4} align="stretch" className="p-4 hover:bg-green-400">
                  <Button onClick={getVc}>Get your Verified Credentials</Button>
                </VStack>
                <Image
                  src="https://imgs.search.brave.com/uJNjQA4JPsVASHaNdzQk275Re3gX5dVheO3TpiN8Gkw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/dXNzaW5lc3MtcGVv/cGxlLXdvcmtpbmct/dGVhbS1vZmZpY2Vf/MTMwMy0yMjg2My5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
                  alt="Employees image"
                  borderRadius="lg"
                />

                {vcData && (
                  <VCProjectcard vcData={vcData} />
                )}
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
