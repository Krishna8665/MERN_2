// src/pages/admin/AdminProducts.jsx
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const navigate = useNavigate();

  // Mock data - replace with real API fetch later
  const products = [
    { id: 1, name: 'Classic Chicken Momo', price: 320, stock: 45, status: 'Available' },
    { id: 2, name: 'Veg Special Momo', price: 280, stock: 12, status: 'Low Stock' },
    { id: 3, name: 'Cheesy Blast', price: 380, stock: 0, status: 'Out of Stock' },
  ];

  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Product</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">NPR {product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                    ${product.status === 'Available' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit product"
                    >
                      <Edit size={18} />
                    </button>
                    <button
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
    </div>
  );
}