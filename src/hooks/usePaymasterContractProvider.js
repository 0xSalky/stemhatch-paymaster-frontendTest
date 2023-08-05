import { useMemo } from "react";
import { useAccount } from "wagmi";
import { Web3Provider, Contract } from "zksync-web3";

const usePaymasterContractProvider = (contractAddress, contractAbi) => {
  const { isConnected } = useAccount();

  const paymasterData = useMemo(() => {
    if (isConnected) {
      const provider = new Web3Provider(window.ethereum);
      const signerInstance = provider.getSigner();
      const contract = new Contract(
        contractAddress,
        contractAbi,
        signerInstance
      );
      return {
        provider,
        contract,
      };
    } else {
      return {
        provider: {},
        contract: {},
      };
    }
  }, [isConnected, contractAddress, contractAbi]);

  return {
    contract: paymasterData.contract,
    paymasterProvider: paymasterData.provider,
  };
};

export default usePaymasterContractProvider;
