import { createAsyncThunk } from "@reduxjs/toolkit";

import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { setConnectedAddress } from "../slices/accountSlice";
export const connectToProvider = createAsyncThunk(
  "account/connectToProvider",
  async ({ provider, setProvider }, { dispatch }) => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              31337: "http://localhost:8545/",
            },
          },
        },
      }, // required
    });

    if (!provider) {
      try {
        const rawProvider = await web3Modal.connect();

        if (!rawProvider.on) {
          console.log("yee");
          return;
        }

        rawProvider.on("accountsChanged", (accounts) => {
          console.log(accounts);
          dispatch(setConnectedAddress(accounts[0]));
        });

        // Subscribe to chainId change
        rawProvider.on("chainChanged", (chainId) => {
          console.log(chainId);
        });

        // Subscribe to provider connection
        rawProvider.on("connect", (info) => {
          console.log(info);
        });

        // Subscribe to provider disconnection
        rawProvider.on("disconnect", (error) => {
          console.log(error);
        });

        const connectedProvider = new Web3Provider(rawProvider, "any");
        const connectedAddress = await connectedProvider
          .getSigner()
          .getAddress();

        setProvider(connectedProvider);
        return {
          connected: true,
          connectedAddress,
        };
      } catch (error) {
        console.error(error);
      }
    }
  }
);
