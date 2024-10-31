declare module "next-auth" {
  interface User {
    id?: number | null;
    email?: string | null;
    name?: string | null;
    first_name: string | undefined;
    last_name: string | undefined;
    image?: string | undefined;
  }

  interface Session {
    access: string | null;
    user: User;
  }
  interface Token {
    access: string | null;
    user: User;
  }
}
