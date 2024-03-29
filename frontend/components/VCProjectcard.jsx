// VCProjectCard.js
import React from 'react';
import { Box, Badge, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { useState } from 'react';

const VCProjectCard = ({ vcData }) => {
  const [vcDataModel, setVcDataModel] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  async function getVcDataModel() {
    const {
      vcDataModel,
    } = await vcData;
    setVcDataModel(vcDataModel);
  }

  getVcDataModel();

  const formattedIssuanceDate = vcDataModel ? new Date(vcDataModel.issuanceDate).toLocaleString() : '';
  const formattedExpirationDate = vcDataModel ? new Date(vcDataModel.expirationDate).toLocaleString(): '';
  const formattedStartDate = vcDataModel ? new Date(vcDataModel.credentialSubject.startDate).toLocaleString(): '';
  const formattedEndDate = vcDataModel ? new Date(vcDataModel.credentialSubject.endDate).toLocaleString(): '';
  
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      mb={4}
      my={6}
    >
      <VStack spacing={4} align="start">
        <HStack>
          <Badge colorScheme="blue">Verifiable Credential</Badge>
          {vcDataModel?.type.includes('EmploymentCredential') && (
            <Badge colorScheme="green">Employment Credential</Badge>
          )}
        </HStack>

        <Text>ID: {vcDataModel?.id}</Text>
        <Text>Issued by: {vcDataModel?.issuer.did}</Text>
        <Text>Issuance Date: {formattedIssuanceDate}</Text>
        <Text>Expiration Date: {formattedExpirationDate}</Text>
        <Button onClick={toggleCollapse} size="sm">
          {isCollapsed ? 'Show Details' : 'Hide Details'}
        </Button>
        {isCollapsed && (
            <>
            <VStack spacing={2} align="start">
              <Badge colorScheme="blue">Credential Subject</Badge>
                  <Text>Employee Name: {vcDataModel?.credentialSubject.employeeName}</Text>
                  <Text>Position: {vcDataModel?.credentialSubject.position}</Text>
                  <Text>Company Name: {vcDataModel?.credentialSubject.companyName}</Text>
                  <Text>Start Date: {formattedStartDate}</Text>
                  <Text>End Date: {formattedEndDate}</Text>
                  <Text>Remarks: {vcDataModel?.credentialSubject.remarksforemployee}</Text>
            </VStack>
            </>
        )}
      </VStack>
    </Box>
  );
};

export default VCProjectCard;
