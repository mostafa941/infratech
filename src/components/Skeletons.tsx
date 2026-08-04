import React from 'react';

export const ProductSkeleton = () => (
  <div className="w-[250px] lg:w-[calc(25%-15px)] flex-shrink-0 bg-white border border-slate-100 shadow-xs rounded-2xl p-4 flex flex-col justify-between animate-pulse">
    <div>
      <div className="w-full h-44 bg-slate-200 rounded-xl mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-slate-200 rounded w-5/6 mb-4"></div>
    </div>
    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
      <div className="h-5 bg-slate-200 rounded w-16"></div>
      <div className="h-4 bg-slate-200 rounded w-12"></div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white border border-slate-100 shadow-xs rounded-2xl p-4 flex flex-col justify-between animate-pulse w-full">
        <div>
          <div className="w-full h-44 bg-slate-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-3 bg-slate-200 rounded w-5/6 mb-4"></div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-12"></div>
        </div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 6 }: { rows?: number, columns?: number }) => (
  <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs animate-pulse w-full">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="p-5">
                <div className="h-3 bg-slate-200 rounded w-20"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {Array.from({ length: rows }).map((_, rIdx) => (
            <tr key={rIdx}>
              {Array.from({ length: columns }).map((_, cIdx) => (
                <td key={cIdx} className="p-5">
                  <div className="h-4 bg-slate-200 rounded w-full max-w-[150px]"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const DashboardStatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between animate-pulse">
        <div className="w-full">
          <div className="h-3 bg-slate-200 rounded w-20 mb-3"></div>
          <div className="h-8 bg-slate-200 rounded w-32 mb-1"></div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0"></div>
      </div>
    ))}
  </div>
);

export const FormSkeleton = ({ fields = 4 }: { fields?: number }) => (
  <div className="space-y-6 w-full animate-pulse">
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i}>
        <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
        <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
      </div>
    ))}
    <div className="h-12 bg-slate-200 rounded-xl w-40 mt-8"></div>
  </div>
);
