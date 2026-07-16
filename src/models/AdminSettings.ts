import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminSettings extends Document {
  name: string;
  avatar: string;
  lang: "en" | "ar";
  companyName: string;
  companyLogo: string;
  whatsappNumber: string;
}

const AdminSettingsSchema = new Schema<IAdminSettings>(
  {
    name: { type: String, default: "Admin" },
    avatar: { type: String, default: "" },
    lang: { type: String, enum: ["en", "ar"], default: "ar" },
    companyName: { type: String, default: "InfraTech" },
    companyLogo: { type: String, default: "/images/logoInfra.jpg" },
    whatsappNumber: { type: String, default: "201278167506" },
  },
  { timestamps: true }
);

const AdminSettings: Model<IAdminSettings> =
  mongoose.models.AdminSettings ||
  mongoose.model<IAdminSettings>("AdminSettings", AdminSettingsSchema);

export default AdminSettings;
