import React, { useState, useEffect } from "react";
import getContract from "./getWeb3";
import Web3 from 'web3';
import "./App.css";

import Navbar from "./components/Navbar";
import DStorage from "./contracts/DStorage.json";
import ipfs from "./ipfs";
import Main from "./components/Main";
import DataTable from "./components/DataTable";



const App = () => {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  const [description, setDescription] = useState('');
  const [fileInfo, setFileInfo] = useState({
    buffer: [],
    type: '',
    name: ''
  });
  const [files, setFiles] = useState([]);

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
      setFileInfo({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
    }
  }

  const upload = async (e) => {
    try {
      ipfs.files.add(fileInfo.buffer, async (error, result) => {
        if (error) {
          console.log(error)
          return
        }
        await contract.methods.uploadFile(result[0].hash, result[0].size, fileInfo.type, fileInfo.name, description).send({ from: accounts });
      })
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
        const fileCount = await contract.contract.methods.fileCount().call();

        for (let i = 1; i < fileCount; i++) {
          let file = await contract.contract.methods.files(i).call();
          setFiles(prev => ([...prev, file]))
        }
        //TODO: Setting all the information
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
  console.log(files);
  return (
    <>
      <Navbar address={accounts} NavText="DStorage" />
      <Main handleDescriptionChange={handleDescriptionChange} handleBufferChange={handleBufferChange} upload={upload} description={description} />
      <DataTable files={files} />
    </>
  );
}


export default App;

