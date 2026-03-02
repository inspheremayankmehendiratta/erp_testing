import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENC_KEY = 'TkQn8l7f5CbrN3x94Uhv1JVD6sR2LEB7'; // Encryption key
const IV = 'j49e78D3sP65dE6g'; // Initialization vector

// const ENC_KEY = Buffer.from('TkQn8l7f5CbrN3x94Uhv1JVD6sR2LEB7'); // Encryption key
// const IV = Buffer.from('j49e78D3sP65dE6g'); // Initialization vector

//used for new encryption
const algorithm = 'aes-256-gcm';
const ivLength = 12;
const key:any = Buffer.from(`${process.env.NEXT_PUBLIC_ENCRYPTED_KEY}`, 'hex');

export const encryptData = (plainText: any) => {
  let encrypted = '';
  if (plainText && plainText !== '') {
    const cipher = createCipheriv('aes-256-cbc', ENC_KEY, IV);
    encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
  }
  return encrypted;
};

export const decryptData = (encryptedText: any) => {
  let decrypted = '';
  if (encryptedText && encryptedText !== '') {
    const decipher = createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
  }
  return decrypted;
};

export const encrypt = (text: string) => {
  const iv:any = randomBytes(ivLength);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  const combinedBuffer = Buffer.concat([iv, authTag, Buffer.from(encrypted, 'hex')]);

  return combinedBuffer.toString('base64');
};

export const decrypt = (base64Data: string): string => {
  const combinedBuffer = Buffer.from(base64Data, 'base64');

  const iv:any = combinedBuffer.subarray(0, ivLength);
  const authTag:any = combinedBuffer.subarray(ivLength, ivLength + 16);
  const encryptedData = combinedBuffer.subarray(ivLength + 16).toString('hex');

  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Utility for URL-safe base64
export const toUrlSafeBase64 = (str: string) =>
  str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

 export const fromUrlSafeBase64 = (str: string) =>
  str.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - (str.length % 4)) % 4);

