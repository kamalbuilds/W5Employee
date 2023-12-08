const forge = require('node-forge')
const srt = process.env.SRT;
const PK = process.env.PK;
const entitySecret = forge.util.hexToBytes(srt);
const publicKey = forge.pki.publicKeyFromPem(PK)
const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha256.create(),
  },
})

const Ciphertext = forge.util.encode64(encryptedData);

export default function getciphertext (req, res) {
    res.status(200).json( {Ciphertext} );
};