import { Flex } from "@chakra-ui/react";
import Navbar from "../3_organisms/Navbar/Navbar";

const AppLayout = ({ children }) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      mx="2rem"
      position="relative"
      h="100vh"
    >
      <Navbar />
      <Flex w="100%">{children}</Flex>
    </Flex>
  );
};

export default AppLayout;
