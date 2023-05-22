export interface User {
    id?: string;
    username: string;
    name?: string;
    surname?: string;
    email: string;
    password: string;
    accessToken?: string;
    _links?: {
      users: {
        href: string;
      };
    };
  }

export interface Credentials {
  username: string;
  password: string;
}