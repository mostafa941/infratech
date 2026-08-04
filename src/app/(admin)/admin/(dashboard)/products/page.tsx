"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { TableSkeleton } from "@/components/Skeletons";

export default function AdminAllProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products?limit=100");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return <TableSkeleton rows={5} columns={7} />;
  }

  return (
    <div className="space-y-8" dir="ltr">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Products Catalog</h1>
          <p className="text-slate-500 text-sm mt-1">Review, delete and manage active items offered in user-store portals.</p>
        </div>
        <Link
          href="/admin/add-product"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-md shadow-amber-500/10 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Catalog Table */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <th className="p-5">Thumbnail</th>
                <th className="p-5">Product Name</th>
                <th className="p-5">Category</th>
                <th className="p-5">Base Price</th>
                <th className="p-5">Discount</th>
                <th className="p-5">Quantity Stock</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-medium">
                    No products added to directory yet. Use Add New Product to start.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Image */}
                    <td className="p-5">
                      <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-1">
                        <img
                          src={(p.images && p.images[0]) || p.thumbnail || ""}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="p-5 font-bold text-slate-900 max-w-xs truncate">
                      {p.name}
                      {p.nameAr && <span className="block text-[10px] text-slate-400 font-normal">{p.nameAr}</span>}
                    </td>

                    {/* Category */}
                    <td className="p-5">
                      <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                        {p.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-5 font-extrabold text-slate-900">${p.price}</td>

                    {/* Discount */}
                    <td className="p-5 font-bold text-rose-500">
                      {p.discount > 0 ? `${p.discount}% Off` : "None"}
                    </td>

                    {/* Stock */}
                    <td className="p-5">
                      <span className={`font-bold ${p.stock > 0 ? "text-slate-700" : "text-rose-500"}`}>
                        {p.stock > 0 ? `${p.stock} units` : "Out of stock"}
                      </span>
                    </td>

                    {/* Actions: Edit + Delete */}
                    <td className="p-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="inline-flex items-center justify-center p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="inline-flex items-center justify-center p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
