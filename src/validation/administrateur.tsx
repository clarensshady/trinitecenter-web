import { z, ZodType } from "zod";
import { ISignIn } from "../types/administrateur";

export const LoginSchemaWithEmail: ZodType<ISignIn> = z
  .object({
    Email: z
      .string({
        required_error: "Email must not be empty",
      })
      .email({ message: "please enter a valid email" }),
    Password: z
      .string({
        required_error: "Password must not be empty",
      })
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "please enter a strong password"
      ),
  })
  .required();
