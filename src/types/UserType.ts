export interface User {
    id?: string;
    username: string;
    name?: string;
    surname?: string;
    email: string;
    password: string;
    _links?: {
      users: {
        href: string;
      };
    };
  }