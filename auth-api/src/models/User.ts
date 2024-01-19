import mongoose, { Document, Schema, Model } from "mongoose";

//----------------------------------- ENUMS

enum UserRole {
  User = '2001',
  Editor = '',
  Admin = '',
}

enum ServiceCategory {
  AUTOMATION = "automation",
  INDUSTRY = "industry",
  SECURITY = "security",
  AI = "ai",
  ANALYTICS = "analytics",
  SUSTAINABILITY = "sustainability",
  INFRASTRUCTURE = "infrastructure",
  DATABASES = "databases",
  SERVERS = "servers",
  DEVOPS = "devops",
  QUANTUM = "quantum",
  BLOCKCHAIN = "blockchain"
}

enum OrderStatus {
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Completed = "Completed",
  Canceled = "Canceled",
}

// ----------------------------------------- INTERFACES 

export interface IUser extends Document {
  userId: string;

  email: string;
  firstName: string;
  lastName: string;
  password: string;
  refreshToken: string[];

  profilePicLink: string;
  profilePicAWSURL: string;

  phoneNumber: string;
  address: Address

  orders: Order[],

  createdAt: Date; 
  updatedAt: Date;
  roles: {
    User: UserRole;
    Editor: UserRole;
    Admin: UserRole;
  }; 
}

export interface Order extends Document {
  orderId: string; 
  orderNumber: string; 
  items: OrderItem[]; 
  totalAmount: number; 
  orderDate: Date; 
  status: OrderStatus; 
}

export interface OrderItem extends Document {
  orderItemId: string; 
  service: Service; 
  quantity: number; 
  subtotal: number; 
}

interface Service extends Document {
  category: ServiceCategory;

  serviceId: string;
  price: number;

  topic: string;
  description: string;
  overviewtopic: string;
  overviewDescription: string;
  benefits: Array<{
    topic: string;
    description: string;
  }>;
  useCases: Array<{
    topic: string;
    description: string;
  }>;
  solutionsDesc: string;
  productDesc: string;
  imgUrl: string;
  awsUrl: string;

}

export interface Address extends Document {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

}


//------------------------------------------- SCHEMAS

export const useCasesSchema = new Schema({
  topic: { type: String, required: true },
  description: { type: String, required: true },
});

export const BenefitSchema = new Schema({
  topic: { type: String, required: true },
  description: { type: String, required: true },
});


export const AddressSchema = new Schema({
  street: {type: String, required: true },
  city: {type: String, required: true},
  state: {type: String, required: true },
  postalCode: {type: String, required: true },
  country: {type: String, required: true }
})


export const ServiceSchema = new Schema({
  serviceId: {type: String, required: true },
  price: {type: Number, required: true },

  category: {
    type: String,
    enum: Object.values(ServiceCategory), 
    required: true,
  },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  overviewtopic: { type: String, required: true },
  overviewDescription: { type: String, required: true },

  benefits: [BenefitSchema],
  useCases: [useCasesSchema],

  solutionsDesc: { type: String, required: true },
  productDesc: { type: String, required: true },

  imgUrl: { type: String, default: '' },
  awsUrl: { type: String, default: '' },


})





export const OrderItem = new Schema({
  orderItemId: {type: String, required: true   },
  service: {type: ServiceSchema, required: true},
  quantity: {type: Number, required: true },
  subtotal: {type: Number, required: true }
})

export const OrderSchema = new Schema({
  orderId: { type: String, required: true },
  orderNumber: { type: String, required: true },
  items: [OrderItem],
  totalAmount: { type: Number, required: true},
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: OrderStatus, required: true }
});





export const userSchema: Schema<IUser> = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: [String],

  profilePicAWSURL: { type: String, default: '' },
  profilePicLink: { type: String, default: '' },

  phoneNumber: {
    type: String,
    default: '',
  },
  
  orders: [ServiceSchema],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  roles: {
    User: {
      type: String,
      default: UserRole.User,
    },
    Editor: {
      type: String,
      default: UserRole.Editor,
    },
    Admin: {
      type: String,
      default: UserRole.Admin,
    },
  },
});

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
