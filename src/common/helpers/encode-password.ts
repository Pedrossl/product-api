import { hashSync } from 'bcryptjs';

export const encodePassword = {
  to(password: string): string {
    if (password && password.length < 40) {
      const SALT_FACTOR = 10;
      const hash = hashSync(password, SALT_FACTOR);
      return hash;
    }
  },
  from(hash: string): string {
    if (hash) return hash;
  },
};
