import React, { useState } from "react";

export const SimpleStore = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  function handleConnectWallet() {}

  return (
    <div>
      <h3>Get/Set Intercation with contract!</h3>
      <button onClick={handleConnectWallet}>{connectButtonText}</button>
    </div>
  );
};
