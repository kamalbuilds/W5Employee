import React from 'react';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Enrolleduniv({ name, location , employees, imageUrl, avatarUrl , url , companydid }) {
    return (
    <Center py={6}>
      <Box
        minW={'360px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          src={imageUrl}
          objectFit="cover"
          alt="#"
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'2xl'}
            src={avatarUrl}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {name}
            </Heading>
            <Text color={'gray.500'}>{location}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{employees}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                employees
              </Text>
            </Stack>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{companydid.slice(0,20)}... {companydid.slice(-6)}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Company DID
              </Text>
            </Stack>
          </Stack>

          <Link href="/employees/[id]" as={`/employees/${url}`} passHref>
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Verify ✅
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
}
