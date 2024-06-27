// const crypto = require('crypto');
import 'crypto' // Use built-in crypto module
import { PKCS7Padding } from 'crypto'; // Import PKCS7 padding
import * as crypto from 'crypto'; // Import PKCS7 padding
// import  { TextEncoder, TextDecoder } from 'util'; // For string encoding/decoding
import React, { useState } from 'react';
function decryptClientResponse(encryptedResponse) {
  // Hardcoded password is a security risk. Consider environment variables or secure key management.
  const passwords = process.env.DECRYPTION_PASSWORD; // Use environment variable if possible
  const password = 'thisIsMyPassword'; // Use environment variable if possible

  if (!password) {
    throw new Error('Missing DECRYPTION_PASSWORD environment variable');
  }

  const salt = crypto.randomBytes(16); // Generate random salt
  const key = generateKey(password, salt);

  try {
    console.log('Trying')
    const iv = encryptedResponse.slice(0, 16); // Assuming first 16 bytes are the initialization vector
    const ciphertext = encryptedResponse.slice(16); // Rest is the ciphertext

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    decipher.setAutoPadding(false); // Manual padding for security (PKCS7)
    const paddedMessage = [decipher.update(ciphertext)];
    paddedMessage.push(decipher.final());
    console.log(paddedMessage)


    const decrypter = new TextDecoder();
    // const decryptedMessage = crypto.PKCS7Padding.unpad(paddedMessage, crypto.PKCS7Padding.MODE_STRICT); // Strict padding validation
    const decryptedMessage = PKCS7Padding.unpad(paddedMessage, PKCS7Padding.MODE_STRICT);

    const jsonResponse = JSON.parse(decrypter.decode(decryptedMessage));

    return jsonResponse;
  } catch (error) {
    console.error('Error decrypting client response:', error);
    throw error; // Re-throw for further handling
  }
}

function generateKey(password, salt) {
  const passwordBuffer = new TextEncoder('utf-8').encode(password);
  const kdf = crypto.pbkdf2Sync(passwordBuffer, salt, 10000, 32, 'sha256');
  return kdf;
}
export default decryptClientResponse

// Example usage (assuming encryptedResponse is a Buffer):
// const decryptedData = decryptClientResponse(encryptedResponse);
// console.log(decryptedData);