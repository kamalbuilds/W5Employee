import React from "react";
import { useState } from 'react';
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
                border: "2px solid #805AD5"
              }}
            >
              <CardBody style={{ paddingBottom: 0 }}>
                <p>
                  This verifies that you are a real employee of {" "}
                  {companyname}. Prove that you hold the Employee Verified Credentials to proceed ahead 🔐
                </p>
                
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
