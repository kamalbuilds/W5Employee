import React from 'react';
import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react"
import "../styles/globals.css";
import WithSubnavigation from "../components/Navbar"
import SmallWithSocial from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Fonts
import '../public/fonts/satoshi.css';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>ZKEmployee</title>
      </Head>
      <ChakraProvider>
            <div>
            <WithSubnavigation />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              />
              <Component {...pageProps} />
              <SmallWithSocial/>
            </div>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
