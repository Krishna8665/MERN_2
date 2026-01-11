// src/components/admin/ProductForm.jsx
export default function ProductForm({
  onSubmit,
  initialData = {},
  isEditing = false,
  isLoading = false,
}) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6">
      {/* 1. Product Image - show current when editing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Image {isEditing ? '(Current image below)' : ''}
        </label>

        {/* Current image preview (only in edit mode) */}
        {isEditing && initialData.productImage && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <img
              src={initialData.productImage}
              alt="Current product"
              className="w-40 h-40 object-contain rounded-lg border border-gray-300"
            />
          </div>
        )}

        <input
          type="file"
          name="productImage"
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-50 file:text-orange-700
            hover:file:bg-orange-100"
        />
      </div>

      {/* 2. Name - pre-filled */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          name="productName"
          defaultValue={initialData.productName || ''}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          placeholder="Classic Chicken Momo"
        />
      </div>

      {/* 3. Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="productDescription"
          defaultValue={initialData.productDescription || ''}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          placeholder="Describe the product..."
        />
      </div>

      {/* 4. Price, Stock, Status, Main Type - all pre-filled */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (NPR) *
          </label>
          <input
            type="number"
            name="productPrice"
            defaultValue={initialData.productPrice || ''}
            required
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="productStockQty"
            defaultValue={initialData.productStockQty || ''}
            required
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            name="productStatus"
            defaultValue={initialData.productStatus || 'available'}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Type *
          </label>
          <select
            name="mainType"
            defaultValue={initialData.mainType || ''}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Chicken">Chicken</option>
            <option value="Buff">Buff</option>
            <option value="Pork">Pork</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors
            ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
        >
          {isLoading 
            ? 'Saving...' 
            : isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}