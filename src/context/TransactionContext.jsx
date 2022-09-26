import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers'

import { cABI, cAddress } from '../utils/constant'

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContext = new ethers.Contract(cAddress, cABI, signer);

    console.log(provider, signer, transactionContext)
}

export function TransactionProvider({ children }) {

    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Kindly install Metamask on  your Browser"); 
        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length) {
            setCurrentAccount(accounts[0])

            // get all the transactions
        }else {
            console.log('No Account found')
        }
        console.log(accounts);
        }
        catch (error) {
            
            console.log(error);
    
            throw new Error('No ethereum Object Found!!')
        }
        
        

        
    }
    async function walletConnect() {
        try {
            if (!ethereum) return alert('Install the Metmask Extension!!');

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        }
        catch(error) {
            console.log(error);

            throw new Error('No ethereum Object Found!!')
        }
    }

    // connect wallet;

    // send Transaction 
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Install the Metmask Extension!!');

            // get data from the form 
            const { addressTo, amount, keyword, message } = formData;
            getEthereumContract()

        }
        catch (error) {
            console.log(error);

            throw new Error('No ethereum Object Found!!')
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();

    }, []
    )
    return(
        <TransactionContext.Provider value={{ 
        walletConnect,
        currentAccount,
        formData,
        setFormData,
        handleChange
        }}>
            { children }
        </TransactionContext.Provider>
            )
}