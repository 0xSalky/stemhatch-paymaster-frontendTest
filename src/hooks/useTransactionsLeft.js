import { PAYMASTER_CONTRACT_ADDRESS } from "@/utils/consts";
import { paymasterAbi } from "@/web3/abis/paymasterAbi";
import { useAccount, useContractRead } from "wagmi";

const useTransactionsLeft = () => {
  const { address, isConnected } = useAccount();

  const {
    data: userTransactions,
    isLoading: loadingUserTransactions,
    refetch,
  } = useContractRead({
    address: PAYMASTER_CONTRACT_ADDRESS,
    abi: paymasterAbi,
    functionName: "userTransactions",
    args: [isConnected ? address : PAYMASTER_CONTRACT_ADDRESS],
  });

  return {
    userTransactions: parseInt(userTransactions),
    loadingUserTransactions,
    refetchUserTransactions: refetch,
  };
};

export default useTransactionsLeft;
