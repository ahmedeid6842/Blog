import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../model/user.models";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    let user = await User.create(input);
    return omit(user.toObject(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}


export async function getUser(
  input: Partial<
    DocumentDefinition<
      Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
    >
  >,
  password?: boolean
) {
  /**
   * DONE: make get user reusable so it can take any argument and search with it
   * DONE: using Partial typescript mapped to make all property optaion
   */
  try {
    let users = await User.find(input);
    if (users.length == 0) {
      return false;
    }

    if (password) {
     
      // if password = true then return password with document
      return users;
    }

    return users.map((user) => {
      return omit(user.toObject(), "password");
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
