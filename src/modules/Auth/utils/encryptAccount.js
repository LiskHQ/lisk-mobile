/* eslint-disable max-statements */
import { cryptography } from '@liskhq/lisk-client';

import { defaultDerivationPath } from '../constants/recoveryPhrase.constants';
import { extractKeyPair, extractAddressFromPublicKey } from './accountKeys';
import { getKeyFromPasswordWithArgon2 } from './getKeyFromArgon';

const ARGON2 = {
  ITERATIONS: 3,
  MEMORY: 65536,
};

export const encryptAccount = async ({
  recoveryPhrase,
  password,
  name,
  derivationPath,
  enableCustomDerivationPath = false,
}) => {
  try {
    const { encrypt } = cryptography;
    const options = {
      recoveryPhrase,
      enableCustomDerivationPath,
      derivationPath,
    };
    const { privateKey, publicKey, isValid } = await extractKeyPair(options);
    if (!isValid) {
      throw new Error('Failed to extract keypair for given recovery phrase.');
    }
    const address = extractAddressFromPublicKey(publicKey);
    const plainText = JSON.stringify({ privateKey, recoveryPhrase });
    const crypto = await encrypt.encryptMessageWithPassword(plainText, password, {
      getKey: getKeyFromPasswordWithArgon2,
      kdf: cryptography.encrypt.KDF.ARGON2,
      kdfparams: {
        iterations: ARGON2.ITERATIONS,
        memorySize: ARGON2.MEMORY,
      },
    });

    return {
      crypto,
      metadata: {
        name,
        pubkey: publicKey,
        path: derivationPath ?? defaultDerivationPath,
        address,
        creationTime: new Date().toISOString(),
      },
      version: 1,
    };
  } catch (error) {
    throw new Error(error);
  }
};
