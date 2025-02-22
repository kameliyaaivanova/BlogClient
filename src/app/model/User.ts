import { Role } from "./Role";

export interface User {
  id?: number
  username: String;
  email: String;
  createdAt?: Date;
  role: Role;
  password?: String;
}
