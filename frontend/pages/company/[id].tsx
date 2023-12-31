// @ts-nocheck
import React, { useState } from 'react';
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

const a = async () => {

const vc = await VerifiableCredential.create({
  type: 'EmploymentCredential',
  issuer: employerDid,
  subject: employeeDid,
  expirationDate: '2023-09-30T12:34:56Z',
  data: {
      "position": "Software Developer",
      "startDate": "2023-04-01T12:34:56Z",
      "employmentStatus": "Contractor"
  }
});

console.log(vc);
};

// you can find sample schemas at https://github.com/iden3/claim-schema-vocab/blob/main/schemas/json
// or you can create a custom schema using the schema builder: https://certs.dock.io/schemas
const EmploymentSchema = {
    url: 'https://schema.dock.io/ProofOfEmployment-V1-1698558436855.json', // Updated schema URL
    name: 'Proof Of Employment', // Updated schema name
    populateFunc(data) {
      // Updated populateFunc to match the new schema
      return {
        issuanceDate: data.subject.issuanceDate,
        issuer: data.subject.numberOfYearsWorkedInTheCompany,
        designation: data.subject.designation,
        companyName: data.subject.companyName,
        id: data.subject.id,
      };
    },
  };

  const axiosHeaders = {
    headers: {
      'DOCK-API-TOKEN': process.env.NEXT_PUBLIC_APP_DOCK_API_TOKEN,
    },
  };

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [issuerName, setIssuerName] = useState(id);
  const [issuerProfile, setIssuerProfile] = useState();
  const [credentialData, setCredentialData] = useState({
    schema: EmploymentSchema.url,
    subject: {
      companyName: '',
      designation: '',
      issuanceDate: getUnixTime(new Date()),
      id: '',
    },
  });
  const [did, setDid] = useState('');
  const [didInfo, setDidInfo] = useState(null);

  async function handleGetDidSubmit(e) {
    e.preventDefault();
    try {
      // Make a request to fetch the DID information
      const encodedDid = encodeURIComponent(did);
      console.log(encodedDid);
      const apiUrl = `https://api-testnet.dock.io/dids/${encodedDid}`;
  
      // Now, make the API request using apiUrl
      // const data  = await axios.get('https://api-testnet.dock.io/dids/did%3Apolygonid%3Apolygon%3Amumbai%3A2qD9vqm2pmDyoN6KjxA5EoQLhBt6jd4vdrZoULopCv', axiosHeaders);
  
      const didResp = await axios.get(apiUrl, axiosHeaders);
      console.log(didResp);
      toast.success(`DID fetched successfully 🪔`);
      setDidInfo(didResp.data);
    } catch (error) {
      console.error(error);
    }
  }
  const [claimQR, setClaimQR] = useState('');

  async function handleGenerateProfileSubmit(e) {
    e.preventDefault();
    const { data } = await axios.post('../api/create-did/', { issuerName });
    toast.success(`${data.did} created successfully 🚀`);
    console.log(data);
    setIssuerProfile(data);
  }
  console.log(issuerProfile,"issuerprofile")
  
  async function handleCreateCredentialRequest(e) {
    e.preventDefault();

    // main code to create a credential request
    const credential = {
      schema: EmploymentSchema.url,
      issuer: issuerProfile.did,
      name: EmploymentSchema.name,
      type: ['VerifiableCredential', EmploymentSchema.name],
      subject: EmploymentSchema.populateFunc(credentialData)
    };
    toast.success(`Credential request created successfully 🚀`);
    const { data } = await axios.post('../../api/create-credential', credential);

    console.log(data);
    setClaimQR(data.qrUrl);
  }

  const setthisup = (did) => {
    setIssuerProfile(did);
  }

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
                Issue Verified Polygon ID Credentials with Dock
              </h1>

              <p className="text-white mt-1">
                As a Company issue Certificates to your employees on Polygon ID.
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
                onSubmit={handleGenerateProfileSubmit}
                className="p-5"
                style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h1 className="text-gray-800 font-bold text-2xl mb-6">Create a Polygon Issuer for your Company</h1>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <input
                    id="name"
                    className=" pl-2 w-full outline-none border-none"
                    name="name"
                    placeholder={`Issuer name ${id}`}
                    value={issuerName}
                    onChange={(event) =>
                      setIssuerName(event.target.value)}
                  />
                </div>

                <button
                  disabled={!issuerName}
                  type="submit"
                  className="block w-full bg-blue-600 mt-5 py-2 rounded-full hover:bg-blue-700 hover:-translate-y-1 transition-all duration-250 text-white font-semibold mb-2">
                  Create
                </button>

              </form>
            </div>

        <div className="w-full px-8 md:px-32 lg:px-24">
        <form
          onSubmit={handleGetDidSubmit}
          className="p-5"
          style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h1 className="text-gray-800 font-bold text-2xl mb-6">Get DID Information</h1>
          <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            <input
              id="did"
              className=" pl-2 w-full outline-none border-none"
              name="did"
              placeholder="Enter DID"
              value={did}
              onChange={(event) => setDid(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-blue-600 mt-5 py-2 rounded-full hover:bg-blue-700 hover:-translate-y-1 transition-all duration-250 text-white font-semibold mb-2">
            Get DID Information
          </button>

          <button onClick={() => setthisup(did)} className="block w-full bg-blue-600 mt-5 py-2 rounded-full hover:bg-blue-700 hover:-translate-y-1 transition-all duration-250 text-white font-semibold mb-2">
            Use this as Issuer issuerprofile
          </button>
        </form>

        {/* Display DID information */}
        {didInfo && (
          <div className="mt-5">
            <h2 className="text-lg font-semibold">DID Information:</h2>
            <pre>{JSON.stringify(didInfo, null, 2)}</pre>
          </div>
        )}
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
                We&apos;ll issue a ZK Verifable Empoloyee Credential to our Employees.
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
                  <FormLabel>Company Name</FormLabel>
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
                  <FormLabel>Designation</FormLabel>
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
                  <FormLabel>Employee ID</FormLabel>
                  <Input
                    type="text"
                    value={credentialData.subject.id}
                    onChange={(e) =>
                      setCredentialData({
                        ...credentialData,
                        subject: {
                          ...credentialData.subject,
                          id: e.target.value,
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
                  Create Credential Request
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
