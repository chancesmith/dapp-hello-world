// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import React, { useState } from "react";
import SimpleStore_abi from "./SimpleStore_abi.json";

export const SimpleStore = () => {
  const contractAddress = "0x42E66DF7B638422262B260E62F872f19c7b45F9B";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [defaultAccount, setDefaultAccount] = useState<unknown | null>(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [newContractVal, setNewContractVal] = useState("");

  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  function updateEthers() {
    const tempProvider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ); // new readonly metamask provider
    setProvider(tempProvider); // is a bit ugly to move fast atm

    const tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    const tempContract = new ethers.Contract(
      contractAddress,
      SimpleStore_abi,
      tempSigner
    );
    setContract(tempContract);
  }

  function handleChangeAccount(newAccount: unknown) {
    setDefaultAccount(newAccount);
    updateEthers();
  }

  function handleConnectWallet() {
    if ((window as any).ethereum) {
      (window as any).ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any[]) => {
          handleChangeAccount(result[0]);
          setConnectButtonText("Wallet Connected");
        }); // returns the metamask account
    } else {
      setErrorMessage("Need to install MetaMask!");
    }
  }

  async function handleGetCurrentValue() {
    const val = await contract?.get();
    setCurrentContractVal(val);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    contract?.set(newContractVal);
  }

  return (
    <div>
      <h3>Get/Set Intercation with contract!</h3>
      <button onClick={handleConnectWallet}>{connectButtonText}</button>
      <h3>Address: {defaultAccount}</h3>

      <form onSubmit={handleSubmit}>
        <input
          id="setText"
          type="text"
          onChange={(e) => setNewContractVal(e.target.value)}
        />
        <button type="submit">update contract</button>
      </form>

      <button onClick={handleGetCurrentValue}>Get Current Value</button>
      <h3>Current Value: {currentContractVal}</h3>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
