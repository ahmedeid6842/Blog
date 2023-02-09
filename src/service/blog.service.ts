import { omit } from "lodash";
import mongoose, { DocumentDefinition, ObjectId } from "mongoose";
import Blog, { BlogDocument } from "../model/blog.models";
import { deleteBlogInput, getBlogInput } from "../schema/blog.schema";

export async function createBlog(
  input: DocumentDefinition<Omit<BlogDocument, "createdAt" | "updatedAt">>
) {
  try {
    let blog = await Blog.create(input);
    return blog;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getBlog(input: getBlogInput) {
  try {
    let blogs: any;
    if (input.author) {
      let userName = input.author;
      input = omit(input, "author");
      blogs = await Blog.find({
        $and: [{ ...input }, { "author.userName": userName }],
      });
    } else {
      blogs = await Blog.find(input);
    }
    if (blogs.length === 0) {
      return false;
    }
    return blogs;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteBlog(
  BlogID: deleteBlogInput,
  userID: ObjectId
) {
  try {
    let blog = await Blog.findOneAndDelete({
      _id: BlogID.id,
      "author._id": userID,
    });
    if (!blog) {
      return false;
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}
