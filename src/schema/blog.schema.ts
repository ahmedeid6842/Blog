import mongoose from "mongoose";
import * as zod from "zod";
import { string } from "zod";

export const createBlogSchema = zod.object({
  title: zod
    .string({
      required_error: "title is required",
    })
    .min(5)
    .max(100),
  description: zod.string().min(5).max(255).optional(),
  tags: zod.enum(["programming", "health", "sports"]).optional(),
});

export const getBlogQuery = zod.object({
  title: string().optional(),
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
  author: zod.string().optional(),
});

export const deleteBlogParams = zod.object({
  id: zod
    .string()
    .min(24)
    .max(24)
    .refine((val) => {
      try {
        return new mongoose.Schema.Types.ObjectId(val as string);
      } catch (error) {
        return false;
      }
    }),
});

export type createBlogInput = zod.infer<typeof createBlogSchema>;
export type getBlogInput = zod.infer<typeof getBlogQuery>;
export type deleteBlogInput = zod.infer<typeof deleteBlogParams>;
