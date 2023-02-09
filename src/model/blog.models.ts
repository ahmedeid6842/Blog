import mongoose, { mongo } from "mongoose";

export interface BlogDocument extends mongoose.Document {
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

const BlogSchema = new mongoose.Schema(
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

const blog = mongoose.model<BlogDocument>("blog", BlogSchema);
export default blog;
