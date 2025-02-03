import React, { useState } from "react";
import { encryptData, decryptData } from "./cryptoUtils";
import { getBalance, getAccountInfo } from "./solana";
import { Keypair } from "@solana/web3.js";
import styles from "./App.module.css";
import { Coupons } from "./Coupons";

export const LockScreen = () => {
  const [privateKeyInput, setPrivateKeyInput] = useState("");
  const [password, setPassword] = useState("");
  const [storedPrivateKey, setStoredPrivateKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [message, setMessage] = useState("");

  const saveKey = async () => {
    try {
      // Expecting the private key as a JSON array (e.g., "[12,34,56,...]")
      let arr;
      try {
        arr = JSON.parse(privateKeyInput);
        if (!Array.isArray(arr)) throw new Error("Not an array");
      } catch (e) {
        throw new Error(
          "Invalid private key format. Expected JSON array of numbers."
        );
      }
      // Validate the key by trying to create a Keypair
      const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
      // Encrypt the private key string using the provided password
      const encrypted = await encryptData(privateKeyInput, password);
      // Store the encrypted key using Chrome’s storage API
      chrome.storage.local.set({ encryptedPrivateKey: encrypted }, () => {
        setMessage("Private key saved successfully.");
        setStoredPrivateKey(privateKeyInput);
      });
    } catch (err: any) {
      setMessage("Error saving key: " + err.message);
    }
  };

  const loadKey = async () => {
    try {
      chrome.storage.local.get(["encryptedPrivateKey"], async (result) => {
        if (result.encryptedPrivateKey) {
          const decrypted = await decryptData(
            result.encryptedPrivateKey,
            password
          );
          // Validate the decrypted key
          let arr = JSON.parse(decrypted);
          const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
          setStoredPrivateKey(decrypted);
          setMessage("Private key loaded successfully.");
        } else {
          setMessage("No private key found.");
        }
      });
    } catch (err: any) {
      setMessage("Error loading key: " + err.message);
    }
  };

  const fetchBalance = async () => {
    try {
      if (!storedPrivateKey) {
        setMessage("Load your private key first.");
        return;
      }
      let arr = JSON.parse(storedPrivateKey);
      const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
      const pubkeyStr = keypair.publicKey.toBase58();
      const lamports = await getBalance(pubkeyStr);
      setBalance(lamports);
      setMessage(`Balance: ${lamports} lamports`);
    } catch (err: any) {
      setMessage("Error fetching balance: " + err.message);
    }
  };

  const fetchAccountInfo = async () => {
    try {
      if (!storedPrivateKey) {
        setMessage("Load your private key first.");
        return;
      }
      let arr = JSON.parse(storedPrivateKey);
      const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
      const pubkeyStr = keypair.publicKey.toBase58();
      const info = await getAccountInfo(pubkeyStr);
      setAccountInfo(info);
      setMessage("Account info fetched.");
    } catch (err: any) {
      setMessage("Error fetching account info: " + err.message);
    }
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif" }}
      className={styles.frame}
    >
      <h1>Solana Wallet Extension</h1>
      <div>
        <label>Private Key (JSON Array):</label>
        <br />
        <textarea
          rows={3}
          cols={50}
          value={privateKeyInput}
          onChange={(e) => setPrivateKeyInput(e.target.value)}
          placeholder="e.g., [12,34,56,...]"
        />
      </div>
      <div>
        <label>Password:</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password for encryption"
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={saveKey}>Save Private Key</button>
        <button onClick={loadKey} style={{ marginLeft: "10px" }}>
          Load Private Key
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={fetchBalance}>Get Balance</button>
        <button onClick={fetchAccountInfo} style={{ marginLeft: "10px" }}>
          Get Account Info
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>{message}</p>
        {balance !== null && <p>Balance: {balance} lamports</p>}
        {accountInfo && (
          <pre
            style={{
              textAlign: "left",
              background: "#f0f0f0",
              padding: "10px",
            }}
          >
            {JSON.stringify(accountInfo, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
