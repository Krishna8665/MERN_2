// src/components/admin/ProductCard.jsx
import { Edit, Trash2, Eye } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete, onView }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={
            product.productImage ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.productName}
          className="max-h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
          {product.productName}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-orange-600">
            NPR {product.productPrice}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.productStockQty}
          </span>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium
              ${
                product.productStatus === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            {product.productStatus === "available"
              ? "Available"
              : "Unavailable"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onView?.(product)}
            className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-colors"
          >
            <Eye size={16} />
            View
          </button>

          <button
            onClick={() => onEdit?.(product)}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete?.(product.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete product"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
