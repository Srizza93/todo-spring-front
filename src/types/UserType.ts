export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    _links: {
      users: {
        href: string;
      };
    };
  }
  
  export interface UserProfileList {
    _embedded: {
      userProfileList: User[];
    };
    _links: {
      self: {
        href: string;
      };
    };
  }