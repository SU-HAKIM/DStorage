import React, { useState, useEffect } from "react";
import getContract from "./getWeb3";
import Web3 from 'web3';
import "./App.css";

import Navbar from "./components/Navbar";
import DStorage from "./contracts/DStorage.json";
import ipfs from "./ipfs";
import Main from "./components/Main";

const App = () => {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  const [description, setDescription] = useState('');
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    let connect = async () => {
      await connectToMetaMask();
    }
    connect()
  }, [])

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleBufferChange = (e) => {
    let file = e.target.files[0];
    let reader = new window.FileReader();

    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    }
  }

  const upload = async (e) => {
    try {
      console.log(description, buffer);
    } catch (error) {
      console.log(error);
    }
  }


  const connectToMetaMask = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        const contract = await getContract(web3, DStorage);
        setWeb3(web3);
        setContract(contract.contract);
        setAccounts(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Please install Meta Mask")
    }
  }
  console.log(contract, accounts);
  return (
    <>
      <Navbar address={accounts} NavText="DStorage" />
      <Main handleDescriptionChange={handleDescriptionChange} handleBufferChange={handleBufferChange} upload={upload} description={description} />
    </>
  );
}


export default App;

