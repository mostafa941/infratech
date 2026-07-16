"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AddProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("10");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);

  // Upload States
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCats();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("folder", "products");

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImages((prev) => [...prev, res.data.url]);
      toast.success("Image uploaded to Cloudinary!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !category) {
      toast.warning("Please fill in Name, Price, and Category.");
      return;
    }

    setLoading(true);
    try {
      const productBody = {
        name,
        nameAr,
        price: parseFloat(price),
        discount: parseFloat(discount),
        category,
        stock: parseInt(stock),
        description,
        descriptionAr,
        images,
        featured,
      };

      await axios.post("/api/products", productBody);
      toast.success("Product created and published successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8" dir="ltr">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Publish New Product</h1>
        <p className="text-slate-500 text-sm mt-1">Fill out the fields to publish an item in customer portals.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details (2/3 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-50 pb-3">Product Name</h3>
            
            {/* English Title */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">English Title (Required)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cisco C1000 Switch 24-Port"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Arabic Title */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Arabic Title (Optional)</label>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="سيسكو سويتش ٢٤ بورت"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white text-right"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-50 pb-3">Descriptions</h3>

            {/* English Description */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">English description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed hardware specifications, warranty rules..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white resize-none"
              />
            </div>

            {/* Arabic Description */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Arabic description</label>
              <textarea
                rows={4}
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                placeholder="المواصفات الفنية بالتفصيل..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white resize-none text-right"
              />
            </div>
          </div>

          {/* Cloudinary Gallery */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-50 pb-3">Image Gallery</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((url, idx) => (
                <div key={idx} className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-1.5 group">
                  <img src={url} alt="" className="max-h-full max-w-full object-contain" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              
              {/* Upload Trigger Box */}
              <label className="w-full h-24 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-slate-50 hover:bg-amber-50/10 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  disabled={uploading}
                />
                <UploadCloud className="w-6 h-6 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500">
                  {uploading ? "Uploading..." : "Add Image"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar Parameters (1/3 column) */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-50 pb-3">Pricing & Category</h3>

            {/* Price */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Base Price ($ USD)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="499"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Discount Percentage (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="10"
                min={0}
                max={100}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Available Quantity (Stock)</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="25"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
              />
            </div>

            {/* Category selection dropdown */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 cursor-pointer"
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Feature this product</span>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 px-6 rounded-xl text-sm transition-all shadow-md shadow-amber-500/15 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Publishing product..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
