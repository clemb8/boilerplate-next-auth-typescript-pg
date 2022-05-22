import "next-auth";

declare module "next-auth" {
  interface User {
    id: number | string;
  }

  interface Session {
    user: User;
  }
}