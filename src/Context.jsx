import { createContext, useContext, useState } from "react";

const EmitterContext = createContext({
  data: null,
  setValue: (value) => {}
});

export const useEmitter = () => useContext(EmitterContext);

function  Emitter({children}) = () {

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState("");

  const setProviderEvent = (provider) => {
    setProvider(provider);
  }

  const setAccountEvent = (account) => {
    setAccount(account);
  }

  const setChainIdEvent = (chainId) => {
    setChainId(chainId);
  }

  const setErrorEvent = (error) => {
    setError(error);
  }

  const providerValue = {provider, setProvider};
  const accountValue = {account, setAccount};
  const chainIdValue = {chainId, setChainId};
  const errorValue = {error, setError};

  return <EmitterContext.Provider accountValue={accountValue}>{children}</EmitterContext.Provider>
}

export default useEmitter;
