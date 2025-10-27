export interface IUserLoginData {
  email: string;
  password?: string;
}

export interface IUserSignUpData extends IUserLoginData {
  name: string;
  faculty?: string;

}

export interface IUserDB extends IUserSignUpData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUserToken {
  user: IUserDB;
  accessToken: string;
}
