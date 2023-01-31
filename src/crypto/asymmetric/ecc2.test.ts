import {test, expect} from 'vitest'

import {createKeyPair, deriveKey} from './ecc2'

test('derived keys mut be equal',  async () => {
    const { publicKey: alicePublicKey, privateKey: alicePrivateKey} = await createKeyPair()
    const {publicKey: bobPublicKey, privateKey: bobPrivateKey} = await createKeyPair()

    const k1 = await deriveKey(alicePrivateKey, bobPublicKey)
    const k2 = await deriveKey(bobPrivateKey, alicePublicKey)

    expect(k1).toEqual(k2)
})
