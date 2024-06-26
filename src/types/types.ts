export interface CreateUserRequestBody {
    email: string;
    password: string;
    username: string;
  }
  export interface TokenData {
    userId: string;
    userRol: string;
    userFirstName?: string;
    userLastName?: string;
    userPhoneNumber?: string;
  }
  
  export interface LoginUserRequestBody {
    email: string;
    password: string;
  }