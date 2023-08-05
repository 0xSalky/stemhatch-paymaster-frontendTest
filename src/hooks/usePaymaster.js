import { utils } from "zksync-web3";
import { GREETER_ADDRESS, PAYMASTER_CONTRACT_ADDRESS } from "../utils/consts";
import * as ethers from "ethers";
import { useState } from "react";
import { greeterAbi } from "@/web3/abis/greeterAbi";
import usePaymasterContractProvider from "./usePaymasterContractProvider";

const usePaymaster = () => {
  const [paymasterParams, setPaymasterParams] = useState();

  const { contract, paymasterProvider } = usePaymasterContractProvider(
    GREETER_ADDRESS,
    greeterAbi
  );

  const handleGetPaymasterData = async (messageRes) => {
    let gasPrice = await paymasterProvider.getGasPrice();

    const paymasterParams = utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: "General",
        innerInput: new Uint8Array(),
      }
    );

    const gasLimit = await contract.estimateGas.setGreeting(messageRes, {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    });

    setPaymasterParams({
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: ethers.BigNumber.from(0),
      gasLimit,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paymasterParams,
      },
    });
  };

  return { handleGetPaymasterData, paymasterParams };
};

export default usePaymaster;
