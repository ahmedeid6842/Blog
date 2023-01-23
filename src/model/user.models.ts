import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(userPassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("user", UserSchema);
export default User;
