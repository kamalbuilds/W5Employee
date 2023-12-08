// @ts-nocheck
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function Testimonials() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>What Our Users Say</Heading>
          <Text>Discover why our users love ZkEmployee 👨🏻‍💻 for verifiable work credentials.</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>HR Manager Feedback</TestimonialHeading>
              <TestimonialText>
                &quot;ZkEmployee 👨🏻‍💻 has transformed our work verification process. It's secure, efficient, and essential for HR departments.&quot;
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={"https://previews.123rf.com/images/jackf/jackf1706/jackf170600720/79632953-happy-female-employee-having-productive-day-at-work-in-office.jpg"}
              name={"Emily Williams"}
              title={"HR Manager"}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Company CEO's View</TestimonialHeading>
              <TestimonialText>
                &quot;As a CEO, I found ZkEmployee 👨🏻‍💻 incredibly easy and secure to verify work credentials. It streamlines our hiring process and ensures trust in our employees.&quot;
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={"https://image1.masterfile.com/getImage/NjMyLTA4Njk4NDY3ZW4uMDAwMDAwMDA=AHznwE/632-08698467en_Masterfile.jpg"}
              name={"John Doe"}
              title={"CEO at XYZ Corporation"}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Employee Testimonial</TestimonialHeading>
              <TestimonialText>
                &quot;ZkEmployee 👨🏻‍💻 has made my work journey more secure and convenient. I can easily access and share my work credentials while protecting my privacy.&quot;
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={"https://img.freepik.com/premium-photo/portrait-successful-business-woman-suit-gray-isolated-background-serious-office-female-worker-manager-employees-female-employee-young-secretary_545934-23090.jpg"}
              name={"Sarah Smith"}
              title={"Employee"}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}

