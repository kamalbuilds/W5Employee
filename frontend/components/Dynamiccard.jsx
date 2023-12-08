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

export default function Dynamiccard({ name, location , employees, imageUrl, avatarUrl , url }) {
  return (
    <Center py={6}>
      <Box
        maxW={'360px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'200px'}
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

          <Link href="/company/[id]" as={`/company/${url}`} passHref>
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
              Issue VCs to Employees ✅
            </Button>
          </Link>

          <Link href="/company/pay/[id]" as={`/company/pay/${url}`} passHref>
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
              Pay to your employees 💴
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
}
