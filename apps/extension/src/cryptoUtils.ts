// src/cryptoUtils.ts

// Helper to import password material for PBKDF2
async function getKeyMaterial(password: string) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
}

// Derives an AES-GCM key from the password and salt
async function deriveKey(password: string, salt: Uint8Array) {
  const keyMaterial = await getKeyMaterial(password);
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// Encrypt data (in this case, the private key string) with the given password
export async function encryptData(
  data: string,
  password: string
): Promise<string> {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const enc = new TextEncoder();
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    enc.encode(data)
  );
  // Package the salt, IV, and ciphertext together (here we JSON-stringify arrays)
  const buffer = new Uint8Array(encrypted);
  const result = {
    salt: Array.from(salt),
    iv: Array.from(iv),
    data: Array.from(buffer),
  };
  return btoa(JSON.stringify(result));
}

// Decrypt the data with the provided password
export async function decryptData(
  encryptedData: string,
  password: string
): Promise<string> {
  const decoded = atob(encryptedData);
  const obj = JSON.parse(decoded);
  const salt = new Uint8Array(obj.salt);
  const iv = new Uint8Array(obj.iv);
  const data = new Uint8Array(obj.data);
  const key = await deriveKey(password, salt);
  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      data
    );
    const dec = new TextDecoder();
    return dec.decode(decrypted);
  } catch (err) {
    throw new Error("Decryption failed. Possibly wrong password.");
  }
}
