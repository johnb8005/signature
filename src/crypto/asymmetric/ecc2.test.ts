import {test, expect, describe} from 'vitest'

import {createKeyPair, deriveKey, encrypt, decrypt, toCipherString, cipherStringToIvAndCipher} from './ecc2'


describe('create keypairs for Alice and Bob: encrypt and decrypt messages', async () => {
    const { publicKey: alicePublicKey, privateKey: alicePrivateKey} = await createKeyPair()
    const {publicKey: bobPublicKey, privateKey: bobPrivateKey} = await createKeyPair()

    const k1 = await deriveKey(alicePrivateKey, bobPublicKey)
    const k2 = await deriveKey(bobPrivateKey, alicePublicKey)

    test('derived keys mut be equal', () => {
        expect(k1).toEqual(k2)
    });

    const message = 'test message2';
    const iv = crypto.getRandomValues(new Uint8Array(12))

    const cMessage = new TextEncoder().encode(message)


    const ctBuffer = await encrypt(cMessage, k1, iv);
    const cipherString = toCipherString(ctBuffer, iv);
    const extracted = cipherStringToIvAndCipher(cipherString);

    test('encrypt', async () => {
       expect(typeof cipherString).toBe('string') 
    });

    test('decrypt', async () => {
      const decryptedMessage = await decrypt(ctBuffer, k1, iv);
      expect(decryptedMessage).toBe(message) 
    });

    test('decrypt with k2', async () => {
        const decryptedMessage = await decrypt(ctBuffer, k2, iv);
        expect(decryptedMessage).toBe(message) 
      });

    test('extract iv and cipher', async () => {
        expect(extracted.ctUint8).toEqual(new Uint8Array(ctBuffer))
        expect(extracted.iv).toEqual(iv)
    })

    test('decrypted with extracted iv and cipher', async () => {
        const decryptedMessage = await decrypt(extracted.ctUint8, k1, extracted.iv)
        expect(decryptedMessage).toBe(message) 
    })
})
