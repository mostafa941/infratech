import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface IOrder extends Document {
  orderId: string;
  items: IOrderItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
  category: { type: String },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, unique: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String },
    },
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Auto-generate orderId before save
OrderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
