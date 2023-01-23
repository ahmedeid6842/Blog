import mongoose from "mongoose";
import * as zod from "zod";

export const createUserSchema = zod.object({
  userName: zod.string({
    required_error: "user name is required",
  }),
  password: zod
    .string({
      required_error: "password is requierd",
    })
    .min(6, "password too short - should be 6 chars minimum"),
  passwordConfirmation: zod.string({
    required_error: "password confiramtion is required",
  }),
  email: zod
    .string({
      required_error: "email is required",
    })
    .email("Not a valid email"),
});

export const getUserQuery = zod.object({
  userName: zod.string().optional(),
  id: zod
    .string()
    .min(24)
    .max(24)
    .optional()
    .refine((val) => {
      try {
        return new mongoose.Schema.Types.ObjectId(val as string);
      } catch (error) {
        return false;
      }
    }),
});

export const loginUserSchema = zod.object({
  email: zod
    .string({
      required_error: "email is required",
    })
    .email("must be valid email"),
  password: zod.string({
    required_error: "password is required",
  }),
});

export type createUserInput = zod.infer<typeof createUserSchema>;
export type getUserInput = zod.infer<typeof getUserQuery>;
export type loginUserInput = zod.infer<typeof loginUserSchema>;
