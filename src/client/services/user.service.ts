import { SignUpDto, LoginDto, EditUserDto } from "../models/signupdto.model";
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

  async editUser(data: EditUserDto) {
    const user = UserService.getUser();
    const token = localStorage.getItem("token");
    if (user?.id && token) {
      const result = await UserRepository.update(user.id, token, data);
      return result;
    }
  },

  async deleteUser() {
    const user = UserService.getUser();
    const token = localStorage.getItem("token");
    if (user?.id && token) {
      const result = await UserRepository.delete(user.id, token);
      return result;
    }
  },

  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async oauth(GoogleToken:string) {
    const result = await UserRepository.oauth(GoogleToken);
    return result;
  }
};
