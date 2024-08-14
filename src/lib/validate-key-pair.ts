import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function validateKeyPair(publicKey: string): boolean {
  try {
    // Read the private and public keys
    const privateKey = fs.readFileSync(path.join(process.cwd(), 'private.pem'));

    // Create a test message
    const testMessage = 'Test message for RSA key pair validation';

    // Sign the message with the private key
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(testMessage);
    const signature = signer.sign(privateKey, 'base64');

    // Verify the signature with the public key
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(testMessage);
    const isValid = verifier.verify(publicKey, signature, 'base64');

    return isValid;
  } catch (error) {
    console.error('Error validating key pair:', error);
    return false;
  }
}

export default validateKeyPair