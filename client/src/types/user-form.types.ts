import { createUserSchema } from "config/schema/user-form-schema";
import { InferType } from "yup";

export type CreateUserSchema = InferType<typeof createUserSchema>;
