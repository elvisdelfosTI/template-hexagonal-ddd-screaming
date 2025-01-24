import * as bcrypt from 'bcrypt';
import { EncryptError } from './errors/EncryptError';
import { Logger, ILogObj } from 'tslog';
const log: Logger<ILogObj> = new Logger();
export class Encrypt {
  static async encryptPassword(password: string): Promise<string> {
    try {
      const saltRounds: number = 10;
      const salt: string = bcrypt.genSaltSync(saltRounds);
      const passwordEncrypt: string = bcrypt.hashSync(password, salt);
      return passwordEncrypt;
    } catch (error: unknown) {
      log.error(error);
      throw new EncryptError('Error encrypting password');
    }
  }

  static async comparePassword(
    password: string,
    passwordDb: string,
  ): Promise<boolean> {
    try {
      const isCorrect = bcrypt.compareSync(password, passwordDb);
      return isCorrect;
    } catch (error: unknown) {
      log.error(error);
      throw new EncryptError('Error comparePassword ');
    }
  }
}

export const encrypt = Encrypt;
