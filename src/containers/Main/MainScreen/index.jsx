import { useState } from "react";
import { Button } from "components/Button";
import Modal from "react-modal";
import { SelectWithValue } from "./SelectWithValue";
import logo from "../../../assets/img/logo.svg";
import bird from "../../../assets/img/bird.svg";
import birdsCloud from "../../../assets/img/birdsCloud.svg";
import style from "./styles.module.scss";
import { useProvider, web3Modal, providerOptions, contractAbi, contractAddress, whitelistedAddresses } from "../../../WalletContext";
import { err_messages } from "../../../Err_messages";

import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";
import Web3 from "web3";

const abiDecoder = require("abi-decoder");
abiDecoder.addABI(contractAbi);

export const MainScreen = () => {
  const [value, setValue] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");

  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalErrorValue, setModalErrorValue] = useState("");

  const openSaleDate = new Date(1663158120);

  const { providerState, web3State, accountState, chainIdState, errorState } = useProvider();

  const [provider, setProvider] = providerState;
  const [web3, setWeb3] = web3State;
  const [account, setAccount] = accountState;
  const [chainId, setChainId] = chainIdState;
  const [error, setError] = errorState;

  var errorText;

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      const chainId = await web3.eth.getChainId();
      setProvider(provider);
      setAccount(currentAccount);
      setChainId(chainId);
      console.log(currentAccount);
    } catch (error) {
      setError(error);
    }
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  const refreshState = () => {
    setProvider();
    setAccount();
    setChainId();
    setError("");
  };

  function openModal(value) {
    setModalValue(value);
    setModalVisible(true);
  }

  function openErrorModal(value) {
    setModalErrorValue(value);
    setModalErrorVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setModalValue("");
  }

  function closeErrorModal() {
    setModalErrorVisible(false);
    setModalErrorValue("");
  }

  const publicMint = async () => {
    const web3 = new Web3(provider);
    const price = 30000;
    const user = web3.utils.toChecksumAddress(account);

    try {
      const myContract = new web3.eth.Contract(contractAbi, contractAddress);
      let gasEstimate = await myContract.methods.mintCard(value).estimateGas({ from: account, value: price * value });
      let nonce = await web3.eth.getTransactionCount(account, "latest");

      let mint = await myContract.methods
        .mintCard(value)
        .send({ from: account, value: price * value })
        .on("transactionHash", function (hash) {
          let message = (
            <>
              {"🎉 The hash of your transaction is: "}
              <a href={`https://goerli.etherscan.io/tx/${hash}`}>{hash}</a>
              {"\n Check Rinkeby Etherscan to view the status of your transaction!"}
            </>
          );
          openModal(message);
        });
    } catch (error) {
      parseError(error);
    }
  };

  const mintFromWhitelist = async () => {
    const web3 = new Web3(provider);
    const user = web3.utils.toChecksumAddress(account);
    let price;

    if (whitelistedAddresses[user]) {
      if (value > 1 && value < 7) {
        price = 300000;
      } else if (value == 1) {
        price = 0;
      }

      try {
        const myContract = new web3.eth.Contract(contractAbi, contractAddress);
        let gasEstimate = await myContract.methods.whitelistHybridMint(value, whitelistedAddresses[user]).estimateGas({ from: account, value: price * (value - 1) });
        let nonce = await web3.eth.getTransactionCount(account, "latest");

        let mint = await myContract.methods
          .whitelistHybridMint(value, whitelistedAddresses[user])
          .send({ from: account, value: price * (value - 1) })
          .on("transactionHash", function (hash) {
            let message = (
              <>
                {"🎉 The hash of your transaction is: "}
                <a href={`https://goerli.etherscan.io/tx/${hash}`}>{hash}</a>
                {"\n Check Rinkeby Etherscan to view the status of your transaction!"}
              </>
            );
            openModal(message);
          });
      } catch (error) {
        parseError(error);
      }
    } else {
      let notAllowed = "Your address is not allowed to participate during whitelist sale";
      openErrorModal(notAllowed);
    }
  };

  const parseError = async (error) => {
    if (error instanceof Error) {
      errorText = "Something gone wrong";
      try {
        const errorJson = error.message.slice(error.message.indexOf("{") - 1).replace(/(\r\n|\n|\r)/gm, "");
        console.log(errorJson);
        const errorObj = JSON.parse(errorJson);
        if ("originalError" in errorObj && "data" in errorObj.originalError) {
          errorText = errorObj.originalError.data;
          errorText = abiDecoder.decodeMethod(errorText);
          errorText = err_messages[errorText.name];
          console.log(errorText);
        }
      } catch (errorInJson) {
        console.log(errorInJson);
        errorText = error;
      }
      openErrorModal(errorText);
      throw new Error(errorText);
    }
  };

  const wrappedMint = async () => {
    let currentTime;
    let timer = Math.floor(openSaleDate.getTime());

    fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
      .then((response) => response.json())
      .then((data) => (currentTime = data.unixtime))
      .then(() => console.log(currentTime))
      .then(() => {
        if (timer <= currentTime) {
          console.log(timer, currentTime);
          publicMint();
        } else {
          console.log(timer, currentTime);
          mintFromWhitelist();
        }
      });
  };

  return (
    <section className={style.section} style={{ zIndex: 20 }}>
      <>
        <div className={style.title}>
          <img className={style.logo} src={logo} alt="logo" />
          <div className={style.bird}>
            <img className={style.birdImg} src={bird} alt="bird" />
            <img className={style.birdsCloud} src={birdsCloud} alt="" />
          </div>
        </div>
        <div className={style.action}>
          <SelectWithValue value={value} setValue={setValue} />
          {!account ? (
            <Button.Default onClick={connectWallet} className={style.mainBtn}>
              Mint
            </Button.Default>
          ) : (
            <Button.Default onClick={wrappedMint} className={style.mainBtn}>
              Mint
            </Button.Default>
          )}
        </div>
      </>
      <Modal isOpen={modalVisible} className={style.modal} overlayClassName={style["modal-overlay"]} onClick={closeModal} ariaHideApp={false}>
        <button className={style["modal__close"]} onClick={closeModal}>
          X
        </button>
        {modalValue}
      </Modal>
      <Modal
        isOpen={modalErrorVisible}
        onRequestClose={closeErrorModal}
        className={style["modal_error"]}
        overlayClassName={style["modal-overlay_error"]}
        onClick={closeErrorModal}
        ariaHideApp={false}
      >
        <button className={style["modal__close"]} onClick={closeErrorModal}>
          X
        </button>
        {modalErrorValue}
      </Modal>
    </section>
  );
};
