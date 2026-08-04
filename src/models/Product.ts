import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  price: number;
  category: string;
  brand?: string;
  images: string[];
  discount?: number;
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    nameAr: { type: String, trim: true },
    description: { type: String },
    descriptionAr: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    brand: { type: String, trim: true },
    images: [{ type: String }],
    discount: { type: Number, min: 0, max: 100, default: 0 },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
