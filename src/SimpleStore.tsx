// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
import React, { useState } from "react";

export const SimpleStore = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [defaultAccount, setDefaultAccount] = useState<unknown | null>(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  function handleChangeAccount(newAccount: unknown) {
    setDefaultAccount(newAccount);
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

  return (
    <div>
      <h3>Get/Set Intercation with contract!</h3>
      <button onClick={handleConnectWallet}>{connectButtonText}</button>
      <h3>Address: {defaultAccount}</h3>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
