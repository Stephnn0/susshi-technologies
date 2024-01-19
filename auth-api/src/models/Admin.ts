import mongoose, { Document, Schema, Model } from "mongoose";

enum UserRole {
  Employee = '2001',
  Marketing = '',
  Admin = '',
}

export interface AdminInferface extends Document {
  username: string;
  roles: {
    User: UserRole;
    Editor: UserRole;
    Admin: UserRole;
  };
  password: string;
  refreshToken: string[];
}

export const adminSchema: Schema<AdminInferface> = new Schema<AdminInferface>({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: String,
      default: UserRole.Employee,
    },
    Editor: {
      type: String,
      default: UserRole.Marketing,
    },
    Admin: {
      type: String,
      default: UserRole.Admin,
    },
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: [String],
});

export const User: Model<AdminInferface> = mongoose.model<AdminInferface>("Admin", adminSchema);

export default User;