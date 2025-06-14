import User from "./user.model";

export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: User;
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface EditUserDto {
  username?: string;
  email?: string;
  password?: string;
}
