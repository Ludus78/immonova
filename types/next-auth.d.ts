import "next-auth";

declare module "next-auth" {
  interface User {
    isPremium: boolean;
  }

  interface Session {
    user: User & {
      isPremium: boolean;
    };
  }
} 