import { Ed25519KeyIdentity } from '@dfinity/identity'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'

export function generateNewSeedPhrase(): string {
    return generateMnemonic()
}

export function identityFromSeed(seedPhrase: string): Ed25519KeyIdentity {
    const seed = mnemonicToSeedSync(seedPhrase)
    // Convert Buffer to Uint8Array and then to ArrayBuffer
    const privateKey = new Uint8Array(seed.slice(0, 32)).buffer
    return Ed25519KeyIdentity.fromSecretKey(privateKey)
}
