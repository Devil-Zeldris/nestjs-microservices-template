import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AES_SECRET, BCRYPT_SALT, MicroservicesErrors } from '@template/common';
import * as bcrypt from 'bcrypt';
import * as CryptoAes from 'crypto-js/aes';
import * as CryptoEncBase64 from 'crypto-js/enc-base64';
import * as CryptoEncUtf8 from 'crypto-js/enc-utf8';

interface EncryptionPayload {
  id: number;
}

@Injectable()
export class EncryptionService {
  public encodingUserPayload(payload: EncryptionPayload): string {
    try {
      const encrypted = CryptoAes.encrypt(JSON.stringify(payload), AES_SECRET);
      return CryptoEncBase64.stringify(
        CryptoEncUtf8.parse(encrypted.toString()),
      );
    } catch (e) {
      throw new InternalServerErrorException(
        MicroservicesErrors.ENCRYPTION_SERVICE_ERROR,
      );
    }
  }

  public decodingUserToken(token: string): EncryptionPayload {
    try {
      const decrypted = CryptoEncBase64.parse(token).toString(CryptoEncUtf8);
      const result = CryptoAes.decrypt(decrypted, AES_SECRET).toString(
        CryptoEncUtf8,
      );
      return JSON.parse(result) as EncryptionPayload;
    } catch (e) {
      throw new ForbiddenException(MicroservicesErrors.USER_TOKEN_INVALID);
    }
  }

  public async encodingUserPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, BCRYPT_SALT);
    } catch (e) {
      throw new InternalServerErrorException(
        MicroservicesErrors.ENCRYPTION_SERVICE_ERROR,
      );
    }
  }

  public async compareUserPassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (e) {
      throw new InternalServerErrorException(
        MicroservicesErrors.ENCRYPTION_SERVICE_ERROR,
      );
    }
  }
}
