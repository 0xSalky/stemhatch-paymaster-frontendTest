import { Heading, Stack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <Stack
      h="10vh"
      w="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading cursor="pointer" onClick={() => router.push("/")}>
        Web3
      </Heading>
      <ConnectButton />
    </Stack>
  );
};

export default Navbar;
