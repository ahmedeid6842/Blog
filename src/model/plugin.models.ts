import mongoose, { mongo } from "mongoose";

export interface PluginDocument extends mongoose.Document {
  title: string;
  description?: string;
  tags?: "programming" | "health" | "sports" | undefined;
  author: {
    userName: string;
    _id: mongoose.Schema.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PluginSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: String,
      enum: ["programming", "health", "sports"],
    },
    author: {
      userName: {
        type: String,
        required: true,
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    },
  },
  { timestamps: true }
);

const plugin = mongoose.model<PluginDocument>("plugin", PluginSchema);
export default plugin;
