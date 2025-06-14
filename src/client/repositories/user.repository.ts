import {
  SignUpDto,
  SignUpResponse,
  LoginDto,
  LoginResponse,
  EditUserDto,
} from "../models/signupdto.model";
import User from "../models/user.model";

export const API_DOMAIN =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const UserRepository = {
  async signUp(data: SignUpDto): Promise<SignUpResponse> {
    const response = await fetch(API_DOMAIN + "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  },

  async login(data: LoginDto): Promise<LoginResponse> {
    const response = await fetch(API_DOMAIN + "/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  },

  async update(id:string, token:string, data: EditUserDto): Promise<User> {
    const response = await fetch(API_DOMAIN + `api/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  }
};
