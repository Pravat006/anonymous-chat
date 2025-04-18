import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;

    username?: string;
    password?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
  interface Session {
    user: {
      _id?: string;
      username?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
    } & DefaultSessionn["user"];
  }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string;
        username?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
    }
}


