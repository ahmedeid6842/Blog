import { omit } from "lodash";
import mongoose, { DocumentDefinition, ObjectId } from "mongoose";
import Plugin, { PluginDocument } from "../model/plugin.models";
import { deletePluginInput, getPluginInput } from "../schema/plugin.schema";

export async function createPlugin(
  input: DocumentDefinition<Omit<PluginDocument, "createdAt" | "updatedAt">>
) {
  try {
    let plugin = await Plugin.create(input);
    return plugin;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPlugin(input: getPluginInput) {
  try {
    let plugins: any;
    if (input.author) {
      let userName = input.author;
      input = omit(input, "author");
      plugins = await Plugin.find({
        $and: [{ ...input }, { "author.userName": userName }],
      });
    } else {
      plugins = await Plugin.find(input);
    }
    if (plugins.length === 0) {
      return false;
    }
    return plugins;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deletePlugin(
  PluginID: deletePluginInput,
  userID: ObjectId
) {
  try {
    let plugin = await Plugin.findOneAndDelete({
      _id: PluginID.id,
      "author._id": userID,
    });
    if (!plugin) {
      return false;
    }
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}
