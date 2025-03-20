declare module 'bcryptjs' {
  export function compare(s: string, hash: string): Promise<boolean>;
  export function compareSync(s: string, hash: string): boolean;
  export function hash(s: string, salt: string | number): Promise<string>;
  export function hashSync(s: string, salt: string | number): string;
  export function genSalt(rounds?: number): Promise<string>;
  export function genSaltSync(rounds?: number): string;
  export default {
    compare,
    compareSync,
    hash,
    hashSync,
    genSalt,
    genSaltSync
  };
} 