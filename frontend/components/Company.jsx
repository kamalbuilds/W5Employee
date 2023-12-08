
import React from 'react';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import Dynamicard from './Dynamiccard'; // Import your Dynamiccard component here

const theme = extendTheme({
  // Add your custom theme configuration here if needed
});

function Company() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Dynamicard
          name="John Doe"
          jobTitle="Frontend Developer"
          followers={23_000}
          imageUrl="https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          avatarUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
        />
        <Dynamicard
          name="Jane Smith"
          jobTitle="UX Designer"
          followers={15_000}
          imageUrl="https://example.com/another-image.jpg" // Add another image URL here
          avatarUrl="https://example.com/another-avatar.jpg" // Add another avatar URL here
        />
        {/* Add more Dynamiccard components with different details here */}
      </div>
    </ChakraProvider>
  );
}

export default Company;
