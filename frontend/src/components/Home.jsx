import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  Tab,
  TabPanel,
  TabList,
  TabPanels,
} from "@chakra-ui/react";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, []);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bgColor="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          textAlign="center"
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
          fontWeight="bold"
        >
          Bale Bale Chatting
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
