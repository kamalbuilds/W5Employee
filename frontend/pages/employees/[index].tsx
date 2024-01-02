import React from "react";
import { useState , useEffect} from 'react';
import VcGatedDapp from "../../components/VcGatedDapp";
import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";
import { useRouter } from "../../node_modules/next/router";
import {  toast } from 'react-toastify';
import { VerifiableCredential } from '@web5/credentials';
import { Web5 } from "@web5/api";
import { DidKeyMethod, DidDhtMethod, DidIonMethod } from '@web5/dids';
function App() {

  const [provedEmployee, setProvedEmployee] = useState(false);
  const [web5, setWeb5] = useState(null);
  const [employeeDid, setEmployeeDid] = useState(null); // [1]
  const router = useRouter();
  const companyname = router.query.index;

  const notify = () => {
    toast.success("You are a verified employee of " + companyname);
    setProvedEmployee(!provedEmployee);
  }

  const createProtocolDefinition = () => {
    const W5EmployeeProtocolDefinition = {
      protocol: "https://w5employee.vercel.app/protocol2",
      published: true,
      types: {
        vc: {
          schema: 'https://w5employee.vercel.app/schema',
          dataFormats: ["application/vc+jwt"],
        },
      },
      structure: {
        vc: {
          $actions: [
            { who: "anyone", can: "read" },
            { who: "author", of: "vc", can: "write" },
            { who: "recipient", of: "vc", can: "read" },
          ],
        },
      },
    };
    return W5EmployeeProtocolDefinition;
  };
  
  const queryForProtocol = async (web5) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://w5employee.vercel.app/protocol2",
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

  useEffect(() => {
    const initWeb5 = async () => {
      localStorage.clear();
      console.log("i am called");
      const { web5, did : userDid } = await Web5.connect();
      setWeb5(web5);
      setEmployeeDid(userDid);
      console.log(web5, userDid);
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
                
                <button onClick={handleCreateCredentialRequest}>Employee DID</button>
                <Image
                  src="https://imgs.search.brave.com/uJNjQA4JPsVASHaNdzQk275Re3gX5dVheO3TpiN8Gkw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/dXNzaW5lc3MtcGVv/cGxlLXdvcmtpbmct/dGVhbS1vZmZpY2Vf/MTMwMy0yMjg2My5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
                  alt="Employees image"
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
