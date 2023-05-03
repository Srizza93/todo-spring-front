export interface User {
    id?: string;
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