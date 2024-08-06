import { authService } from "@/services";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export const useSignup = () => {
  const signup = async (username: string, companyname: string, email: string, password: string) => {
    const user = await authService.signup(username, companyname, email, password);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user as User;
  };

  return { signup };
};
