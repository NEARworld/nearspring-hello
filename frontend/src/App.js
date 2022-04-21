import * as nearApi from 'near-api-js'
import './App.css';
import {Button, TextField, Typography, Grid} from '@mui/material'
import { useState } from 'react';

const CONTRACT_NAME = 'nearspring-hello.decentralworld.testnet'
const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: CONTRACT_NAME,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  deps: {}
}
function App() {
  const [nameInput, setNameInput] = useState('');
  const [nameFromBlockchain, setNameFromBlockchain] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    fetchName();
  }

  async function fetchName() {
    if (nameInput) {
      try {
        const near = await nearApi.connect(nearConfig)
        const walletConnection = new nearApi.WalletConnection(near)
        const contract = new nearApi.Contract(walletConnection.account(), nearConfig.contractName, {
          viewMethods: ['getName']
        })
        const data = await contract.getName({name: nameInput})
        setNameFromBlockchain(data)
        console.log(nameFromBlockchain);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Grid container justifyContent='center' alignItems='center' flexDirection='column' sx={{
      width: '100%',
      height: '100vh',
    }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField label='input your name here!' sx={{
          width: '100%',
          margin: '10px'
        }}
        onChange={(e) => setNameInput(e.target.value)}
        />
        <Button variant='contained' type='submit' sx={{
          display: 'block',
          width: '100%',
          margin: '10px'
        }}>submit</Button>
      </form>
      <Typography variant='h3' component='h1'>
        {nameFromBlockchain}
      </Typography>
    </Grid>
  );
}

export default App;
