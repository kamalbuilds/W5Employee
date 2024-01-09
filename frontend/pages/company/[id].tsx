// @ts-nocheck
import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { getUnixTime } from 'date-fns/fp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Router, { useRouter } from '../../node_modules/next/router';
import { toast } from 'react-toastify';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { VerifiableCredential } from '@web5/credentials';
import { Web5 } from "@web5/api";
import { DidKeyMethod, DidDhtMethod, DidIonMethod } from '@web5/dids';
// import DatePicker from "../../components/resumecomponents/DatePicker/DatePicker";
export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const [issuerName, setIssuerName] = useState(id);
  const [issuerProfile, setIssuerProfile] = useState();
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [recipientDid, setRecipientDid] = useState("");
  const [credentialData, setCredentialData] = useState({
    subject: {
      companyName: id,
      employeeName: '',
      designation: '',
      issuanceDate: getUnixTime(new Date()),
      expirationDate: getUnixTime(new Date()),
      did: '',
      remarks: '',
    },
  });

  const [claimQR, setClaimQR] = useState('');
console.log(credentialData,"creden")
  const createProtocolDefinition = () => {
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
            { who: "author",can: "write" },
            // { who: "author", of: "vc", can: "write" },
            // { who: "recipient", of: "vc", can: "read" },
            { who: "anyone", can: "read" },
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
    // const aliceDid = await DidDhtMethod.create();
    // const ionaliceDid = await DidIonMethod.create();
    const ionemployerDid = await DidIonMethod.create();
    console.log(ionemployerDid,"ionemployerDid")
    const ionhardcode = 'did:ion:EiDWZQbyeJ9CqEJ5JEBVPzxeTldfHnPlgwk0kSAt-BeNvA:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiZnFqT1lGVFltQ3JlYlk4OVNKenpDdVpkdnFaeUozVGs4azZ2RlhSdUY4SSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJBeENtbzl6cVhwaVZOblFmSHhER3UxOG5fenhLYjhneDdCUXdrVVdKeDVrIiwieSI6Ild4Ny13UmVXdjlyd2stMjJ2SDNPQkMwdXV0YlZSLTk1dlFJOTJicEtBajAifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDWDNtSlF6SWdISHRGNkhsM3cxZXVJQ2lLX3lBNnJQWFVTOFg1Wkpsa2tHdyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHE3elNHel9fRTZoZWxodXU5Zk1PRTdDUGtfd283Qm1wYlRWY2FaX1F5emciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJRZVpVaGpsSnF4eDBPTmU3RzZ4dUxnMWRLOXp6T0ljbXhaendrRmdyMFNnIn19'
    
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

      
  const configureProtocolStatus = await configureProtocol(web5, ionemployerDid);

  console.log(configureProtocolStatus);
  console.log('ionvsmydid',ionemployerDid);
  console.log("myDID", myDid);
      const vc = await VerifiableCredential.create({
        type: 'EmploymentCredential',
        issuer: ionemployerDid, // senders DID
        subject: credentialData.subject.did, // reciever's DID
        expirationDate: '2023-09-30T12:34:56Z',
        data: {
            "position": credentialData.subject.designation,
            "startDate": credentialData.subject.issuanceDate,
            "endDate": credentialData.subject.expirationDate,
            "employeeName": credentialData.subject.employeeName,
            "companyName": credentialData.subject.companyName,
            "remarksforemployee": credentialData.subject.remarks,
        }
      });
    
      console.log(vc);
      toast.success(`Verified Credential created successfully 🚀`);
      
      const vc_jwt_employment = await vc.sign({ did: ionemployerDid });
      console.log(vc_jwt_employment);

      const { record , status: recordstatus } = await web5.dwn.records.create({
        data: vc_jwt_employment,
        message: {
          protocol: 'https://w5employee.vercel.app/protocol4',
          protocolPath: 'vc',
          schema: 'https://w5employee.vercel.app/schema',
          dataFormat: 'application/text',
          recipient: credentialData.subject.did,
        },
      });

      console.log(record,"record", recordstatus);
      const { status } = await record.send(credentialData.subject.did);
      toast.success('VC sent to employee successfully 🪔');
      console.log(status);
  }

  const setthisup = () => {
    setIssuerProfile(myDid);
  }

  const getVc = async () => {

    const { records } = await web5?.dwn?.records?.query({
      message: {
        filter: {
          protocol: 'https://w5employee.vercel.app/protocol4',
          protocolPath: 'vc'
        },
      },
    });
    console.log(records);

    const signedVcJwt = await records[0].data.text();

    console.log(signedVcJwt);
    const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
    console.log(vc);
   };

   getVc();

  useEffect(() => {
    const initWeb5 = async () => {
      localStorage.clear();
      console.log("i am called");
      const { web5, did : userDid } = await Web5.connect();
      setWeb5(web5);
      setMyDid(userDid);
    };
    initWeb5();
  }, []);


  // first screen
  if (!issuerProfile) {
    return (
      <>
        <div className="flex flex-col-reverse lg:flex-row lg:h-screen">
          <div
            className="lg:flex w-full lg:w-1/2 justify-around items-center text-center bg-zinc-900"
            style={{
              flexShrink: 0,
              background: 'url(/bg.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <div
              className="w-full mx-auto px-0 py-10 flex-col items-center space-y-6"
              style={{
                maxWidth: '400px',
                width: '100%',
              }}>
              <h1 className="text-white font-bold text-4xl">
                Issue Verified Credentials using our Beautiful UI
              </h1>

              <p className="text-white mt-1">
                As a Company issue DID Certificates to your employees.
              </p>
              <br />
              <br />
            </div>
          </div>
          
          <div
            className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8"
            style={{ width: '100%' }}>

        <div className="w-full px-8 md:px-32 lg:px-24">
        <form
          className="p-5"
          style={{ margin: '0 auto' }}>
          <h1 className="text-gray-800 font-bold text-2xl mb-6">Your DID</h1>
          <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            userDid: {myDid ?   myDid.slice(0, 25) +"..." + myDid.slice(-25) : "Loading..."}
          </div>

          <button onClick={() => setthisup()} className="block w-full bg-blue-600 mt-5 py-2 rounded-full hover:bg-blue-700 hover:-translate-y-1 transition-all duration-250 text-white font-semibold mb-2">
            Use this did to Issue VC to your Employees
          </button>
        </form>

      </div>
          </div>
        </div>
      </>
    );
  }

  if (!claimQR) {
    return (
      <>
        <div className="flex flex-col-reverse lg:flex-row lg:h-screen">
          <div
            className="lg:flex w-full lg:w-1/2 justify-around items-center text-center bg-zinc-900"
            style={{
              flexShrink: 0,
              background: 'url(/bg.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <div
              className="w-full mx-auto px-0 py-10 flex-col items-center space-y-6"
              style={{
                maxWidth: '400px',
                width: '100%',
              }}>
              <h1 className="text-white font-bold text-4xl">
                Employee Credential 
              </h1>

              <p className="text-white mt-1">
                We&apos;ll issue a ZK Verifable Empoloyee Credential to your Employees.
              </p>
              <br />
              <br />
            </div>
          </div>

          <div
            className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8"
            style={{ width: '100%' }}>
            <div className="w-full px-8 md:px-32 lg:px-24">
              <Box p="4">
              <form onSubmit={handleCreateCredentialRequest}>

              <FormControl>
                  <FormLabel className="text-black">Company&apos;s Name</FormLabel>
                  <Input
                    type="text"
                    value={credentialData.subject.companyName}
                    onChange={(e) =>
                      setCredentialData({
                        ...credentialData,
                        subject: {
                          ...credentialData.subject,
                          companyName: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel className="text-black">Employee&apos;s Name</FormLabel>
                  <Input
                    type="text"
                    value={credentialData.subject.employeeName}
                    onChange={(e) =>
                      setCredentialData({
                        ...credentialData,
                        subject: {
                          ...credentialData.subject,
                          employeeName: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel className="text-black">Employee&apos;s Designation</FormLabel>
                  <Input
                    type="text"
                    value={credentialData.subject.designation}
                    onChange={(e) =>
                      setCredentialData({
                        ...credentialData,
                        subject: {
                          ...credentialData.subject,
                          designation: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel className="text-black">Employement Start Date</FormLabel>
                  <div className="flex gap-5 items-center">
                    <DatePicker
                      selected={credentialData.subject.issuanceDate}
                      onChange={(date) => {
                        console.log(date,"updated date");
                        setCredentialData({
                          ...credentialData,
                          subject: {
                            ...credentialData.subject,
                            issuanceDate: date,
                          },
                        })
                      }}
                    /> 
                  </div>
                </FormControl>

                <FormControl>
                  <FormLabel className="text-black">Employement End Date</FormLabel>
                    <DatePicker
                      selected={credentialData.subject.expirationDate}
                      onChange={(date) =>
                        setCredentialData({
                          ...credentialData,
                          subject: {
                            ...credentialData.subject,
                            expirationDate: date
                          },
                        })
                      }
                    />
                </FormControl>

                <FormControl>
                  <FormLabel className="text-black">Employee&aptos;s DID</FormLabel>
                  <Input
                    type="text"
                    value={credentialData.subject.did}
                    onChange={(e) =>
                      setCredentialData({
                        ...credentialData,
                        subject: {
                          ...credentialData.subject,
                          did: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel className="text-black">Remarks for Employee</FormLabel>
                  <Input
                    type="text"
                    value={credentialData.subject.remarks}
                    onChange={(e) =>
                      setCredentialData({
                        ...credentialData,
                        subject: {
                          ...credentialData.subject,
                          remarks: e.target.value,
                        },
                      })
                    }
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="teal"
                  mt="4"
                >
                  Generate VC & Send to Employee
                </Button>
              </form>
              </Box>
            </div>
          </div>
        </div>
      </>
    );
  }

    return (
      <>
        <div className="flex flex-col-reverse lg:flex-row lg:h-screen">``
          <div
            className="lg:flex w-full lg:w-1/2 justify-around items-center text-center bg-zinc-900"
            style={{
              flexShrink: 0,
              background: 'url(/bg.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <div
              className="w-full mx-auto px-0 py-10 flex-col items-center space-y-6"
              style={{
                maxWidth: '400px',
                width: '100%',
              }}>
              <h1 className="text-white font-bold text-4xl">
                Share the claim request link
              </h1>
              <p className="text-white mt-1">
                Share this link with the Employees. They will be presented with a QR code they can scan to get the credentials in their Polygon ID wallet.
              </p>
              <br />
              <br />
            </div>
          </div>
          <div
            className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8"
            style={{ width: '100%' }}>
            <div className="w-full px-8 md:px-32 lg:px-24">
              <p className="font-bold text-4xl">
                Claim URL
              </p>

              <p>
                <br />
                <a href={claimQR} target='_blank' rel="noopener noreferrer">{claimQR}</a>
              </p>
              <br />
              <br />
            </div>
          </div>
        </div>
      </>

    );
}
