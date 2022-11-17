import React, {useState, useEffect} from 'react';
import { useProvider, web3Modal, providerOptions, contractAbi, contractAddress } from '../../WalletContext'

import {Button} from 'components/Button';
import {Social} from 'components/Social';
import ButtonDefault from 'components/Button/ButtonDefault';

import style from './styles.module.scss'

import truncateEthAddress from 'truncate-eth-address'

import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export const Header = () => {

  const { providerState, web3State, accountState, chainIdState, errorState } = useProvider()
  // const { connectWallet, disconnect }

  const [provider, setProvider] = providerState;
  const [web3, setWeb3] = web3State;
  const [account, setAccount] = accountState;
  const [chainId, setChainId] = chainIdState;
  const [error, setError] = errorState;

  const connectWallet = async () => {
    try{
  	  const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      const chainId = await web3.eth.getChainId();
      setProvider(provider);
      setAccount(currentAccount);
      setChainId(chainId);
      console.log(currentAccount);
    } catch(error) {
      setError(error);
    }
  }

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  }

  const refreshState = () => {
    setProvider();
    setAccount();
    setChainId();
    setError("");
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
      console.log("Cached provider found")
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        disconnect();
        console.log("You have been disconnected. Only rinkeby testnet supported", _hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
      <header className={style.header}>
          <Social
              withGradient
          />
          {!account ?
            <Button.Default onClick={connectWallet} className={style.button}>Connect wallet</Button.Default>
            :
            <Button.Default onClick={disconnect} className={style.button}>{truncateEthAddress(account)}</Button.Default>}
      </header>
  )
}

export default Header;
