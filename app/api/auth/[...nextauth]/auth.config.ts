import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Utility functions for password handling with crypto
const hashPassword = (password: string): string => {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');
  // Hash the password with the salt using scrypt
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  // Store both salt and hash together
  return `${salt}:${hash}`;
};

const verifyPassword = (storedPassword: string, suppliedPassword: string): boolean => {
  // Split the stored password into salt and hash
  const [salt, hash] = storedPassword.split(':');
  // Hash the supplied password with the same salt
  const suppliedHash = crypto.scryptSync(suppliedPassword, salt, 64).toString('hex');
  // Compare the hashes
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(suppliedHash, 'hex'));
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          throw new Error("Utilisateur non trouvé");
        }

        const isPasswordValid = verifyPassword(user.password, credentials.password);

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isPremium: user.isPremium
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/connexion"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isPremium = user.isPremium;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isPremium = token.isPremium as boolean;
      }
      return session;
    }
  }
}; 