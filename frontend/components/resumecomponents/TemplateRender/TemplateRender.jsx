import CalmTemplate from "../Templates/CalmTemplate";
import InitialTemplate from "../Templates/InitialTemplate";
import ModernTemplate from "../Templates/ModernTemplate";
import React from "react";
import { useState , useEffect} from 'react';
import {  toast } from 'react-toastify';
import { VerifiableCredential } from '@web5/credentials';
import { Web5 } from "@web5/api";
import { DidKeyMethod, DidDhtMethod, DidIonMethod } from '@web5/dids';

export const MAP_TEMPLATE_KEYS_TO_JSX = {
  INITIAL_TEMPLATE: { component: InitialTemplate, name: "Classic" },
  MODERN_TEMPLATE: { component: ModernTemplate, name: "Modern" },
  CALM_TEMPLATE: { component: CalmTemplate, name: "Calm" },
};

function TemplateRenderer({
  selectedTemplate,
  userDetails,
  projects,
  skills,
  socials,
  educations,
  selectedImage,
  templateRef,
  border,
}) {
  const TemplateComponent = MAP_TEMPLATE_KEYS_TO_JSX[selectedTemplate].component;

  const [web5, setWeb5] = useState(null);
  const [employeeDid, setEmployeeDid] = useState(null); // [1]
  const [arrayofVc, setArrayofVc] = useState([]); // [1]

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
    if (!web5) return; // Optionally handle the case when web5 is falsy
  
    try {
      const result = await web5?.dwn.protocols.query({
        message: {
          filter: {
            protocol: "https://w5employee.vercel.app/protocol4",
          },
        },
      });
  
      return result;
    } catch (error) {
      console.error("Error querying protocol:", error);
      // Handle the error as needed
      throw error; // Optionally rethrow the error if you want to propagate it
    }
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
  
    const configureforalice = await configureProtocol(web5, employeeDid);

  }
  console.log('employeeDid', employeeDid);

 const getVc = async () => {

  if (!web5) return; // Optionally handle the case when web5 is false
  try {
  const { records } = await web5.dwn.records.query({
    from: "did:ion:EiAWZrqejZkWXKpKG1XoiXc-kH5zENr8uZlPM7OaXYZSpQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiOEtLNEpxWXJLWEoyeDRkMUZCT0RKVmdVNDJwRzZobVRRbWduRVAtTXpwNCJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJwV0w1VDZDTmFCNnF1T2NPMVpLZldvdHpJZTByWWJxOHRveTlwaUFzMXdnIiwieSI6ImxRaDBYUzl6Tm5yZHhuMjFha25oTG1TQzNCS0phLVhKM3g2WFlOb1djT0kifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlEel83dndNUGExUEhsNmRvbWU5ZGk4OUZTc0Y2M2YtalVUOHdrVDkyQ1M3dyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQkk5Rm1KQndXT0RjbklrSmxCU0ZqQW9zTmV6c0NtVnU0QUdGUUJSbkxSdUEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUE2SDJvS2RTZFVKM2h5OG5tSnZjWHozR3BmUmxkd1RJdlNVZnRnakJFbzVnIn19",
    message: {
      filter: {
        protocol: 'https://w5employee.vercel.app/protocol4',
        protocolPath: 'vc'
      },
    },
  });
} catch (error) {
  console.error("Error querying protocol:", error);
  // Handle the error as needed
  throw error; // Optionally rethrow the error if you want to propagate it
}

  const vcs = records.map(async (record) => {
    const signedVcJwt = await record.data.text();
    const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
    return vc;
  });

  setArrayofVc(vcs);
 };

 getVc();

  useEffect(() => {
    const initWeb5 = async () => {
      localStorage.clear();
      const { web5, did : userDid } = await Web5.connect();
      setWeb5(web5);
      setEmployeeDid(userDid);
    };
    initWeb5();
  }, []);

  return (
    <div ref={templateRef}>
      {TemplateComponent && (
        <TemplateComponent
          userDetails={userDetails}
          projects={projects}
          skills={skills}
          socials={socials}
          educations={educations}
          selectedImage={selectedImage}
          border={border}
          arrayofVc={arrayofVc}
        />
      )}
    </div>
  );
}

export default TemplateRenderer;
