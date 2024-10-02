import { z, ZodType } from "zod";
import { ISignIn } from "../types/administrateur";

export const LoginSchemaWithEmailSuper: ZodType<ISignIn> = z
  .object({
    Email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "please enter a valid email" }),
    Password: z
      .string({
        required_error: "Password is required",
      })
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "please enter a strong password"
      ),
  })
  .required();
