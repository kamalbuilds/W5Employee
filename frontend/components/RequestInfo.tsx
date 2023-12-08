import { Box, VStack, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import JSONPretty from 'react-json-pretty';

export default function RequestInfo({ url, payload, response }) {
  return (
    <Box className="request-info mt-20">
      {url && (
        <Box>
          <Box className="p-4 px-6 mb-2">
            {url}
          </Box>
        </Box>
      )}

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Payload
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box className="json-prettier">
              <JSONPretty id="json-pretty" data={payload} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Response
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box className="json-prettier">
              <JSONPretty id="json-pretty" data={response} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
