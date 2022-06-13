import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashRuntimeException } from './exception/runtime/hash-runtime.exception';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    if (!password || password === '') {
      throw new HashRuntimeException('Password is undefined or empty');
    }
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
