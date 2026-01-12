// src/pages/admin/AdminProducts.jsx
import { useNavigate } from "react-router-dom";
import { Search, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:3000";

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        setProducts([]);
        return;
      }

      const res = await axios.get(`${API_BASE}/product`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Products fetched:", res.data);

      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch products");
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId) => {
    console.log("Editing product ID:", productId);
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product deleted successfully");
      // Refresh the list
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          + Add Product
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 text-lg">No products found</p>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                      <span className="font-medium">{product.productName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {product.mainType}
                    </span>
                  </td>
                  <td className="px-6 py-4">NPR {product.productPrice}</td>
                  <td className="px-6 py-4">{product.productStockQty}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium
                      ${
                        product.productStatus === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.productStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit product"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}