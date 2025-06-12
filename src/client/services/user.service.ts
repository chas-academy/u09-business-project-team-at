import { SignUpDto, LoginDto } from "../models/signupdto.model";
import User from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export const UserService = {
  async signUp(data: SignUpDto) {
    const result = await UserRepository.signUp(data);
    return result;
  },

  async login(data: LoginDto) {
    const result = await UserRepository.login(data);
    return result;
  },

  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
