import { LOGIN_USER, LOGOUT_USER } from "./types";
import * as Api from "../../api";

export function login(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}
