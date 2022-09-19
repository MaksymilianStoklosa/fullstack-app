import { http } from "config/http-client";
import { CreateUserSchema } from "types/user-form.types";

export const createUserRequest = (body: CreateUserSchema) => http.post("/user", body);
