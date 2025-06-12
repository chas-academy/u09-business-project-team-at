import {
  SignUpDto,
  SignUpResponse,
  LoginDto,
  LoginResponse,
} from "../models/signupdto.model";

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
      throw new Error("Failed to sign up");
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
      throw new Error("Failed to login");
    }
    return response.json();
  },
};
