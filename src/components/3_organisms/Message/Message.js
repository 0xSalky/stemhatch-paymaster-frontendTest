import {
  Button,
  Divider,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { GREETER_ADDRESS, maxTransactionsPerUser } from "@/utils/consts";
import { greeterAbi } from "@/web3/abis/greeterAbi";
import { useAccount, useContractRead } from "wagmi";
import { useState } from "react";
import usePaymaster from "@/hooks/usePaymaster";
import usePaymasterContractProvider from "@/hooks/usePaymasterContractProvider";
import useTransactionsLeft from "@/hooks/useTransactionsLeft";

const Message = () => {
  const [submittingTransaction, setSubmittingTransaction] = useState(false);
  const [message, setMessage] = useState("");
  const toast = useToast();
  const { isConnected } = useAccount();

  const { handleGetPaymasterData, paymasterParams } = usePaymaster(message);
  const { contract } = usePaymasterContractProvider(
    GREETER_ADDRESS,
    greeterAbi
  );
  const { userTransactions, loadingUserTransactions, refetchUserTransactions } =
    useTransactionsLeft();

  const { data, isLoading, refetch } = useContractRead({
    address: GREETER_ADDRESS,
    abi: greeterAbi,
    functionName: "greet",
  });

  const handleOnChangeMessage = async (event) => {
    const messageRes = event.target.value;
    setMessage(messageRes);
    await handleGetPaymasterData(messageRes);
  };

  const handleSubmitTransaction = async () => {
    setSubmittingTransaction(true);
    try {
      let txHandle;
      if (userTransactions != maxTransactionsPerUser || !userTransactions) {
        txHandle = await contract.setGreeting(message, paymasterParams);
      } else {
        txHandle = await contract.setGreeting(message);
      }
      const res = await txHandle.wait();
      if (res) {
        toast({
          title: "Transaction Submitted!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setSubmittingTransaction(false);
        setMessage("");
        refetch();
        refetchUserTransactions();
      }
    } catch (error) {
      toast({
        title: "Transaction Error...",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setSubmittingTransaction(false);
      setMessage("");
    }
  };

  return (
    <Stack bg="gray.700" p="2rem" rounded="md" border="1px" w="30rem">
      {isLoading || loadingUserTransactions ? (
        <Spinner />
      ) : (
        <Stack spacing="1.5rem">
          <Stack direction="row" alignItems="center" spacing="1rem">
            <Text fontSize="2xl">Current Message:</Text>
            <Text pt="0.2rem" color="teal.200" fontSize="xl">
              {data}
            </Text>
          </Stack>
          <Stack>
            <Text color="gray.400">Message</Text>
            <Input
              disabled={!isConnected}
              size="sm"
              value={message}
              onChange={handleOnChangeMessage}
              placeholder="Type message..."
            />
          </Stack>
          <Divider />
          <Flex justifyContent={isConnected ? "space-between" : "flex-end"}>
            {isConnected && (
              <Stack direction="row">
                <Text>Transactions Left:</Text>
                <Text color="teal.200">
                  {userTransactions
                    ? maxTransactionsPerUser - userTransactions
                    : maxTransactionsPerUser}
                </Text>
              </Stack>
            )}
            <Button
              colorScheme="teal"
              size="sm"
              onClick={handleSubmitTransaction}
              isLoading={submittingTransaction}
              isDisabled={
                !message ||
                !isConnected ||
                userTransactions === maxTransactionsPerUser
              }
            >
              {isConnected ? "Submit Message" : "Connect Wallet"}
            </Button>
          </Flex>
        </Stack>
      )}
    </Stack>
  );
};

export default Message;
