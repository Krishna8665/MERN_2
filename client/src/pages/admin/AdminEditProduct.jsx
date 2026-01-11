// src/pages/admin/AdminEditProduct.jsx
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';

export default function AdminEditProduct() {
  const { id } = useParams();

  // In real app → fetch product by id from API
  // For demo, we use mock data (replace this part later)
  const currentProduct = {
    productName: "Classic Chicken Momo",
    productDescription: "Juicy minced chicken seasoned with authentic Nepali spices, wrapped in thin dough and steamed to perfection. Served with spicy tomato achar.",
    productPrice: "320",
    productStockQty: "45",
    productStatus: "available",
    mainType: "Chicken",
    productImage: "https://images.unsplash.com/photo-1626700055272-8e4c0e9b7a5e?w=800", // current image URL
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // In real app: send PATCH request to backend
    console.log("Updating product ID:", id);
    console.log("Updated data:", Object.fromEntries(formData));

    alert(`Product ${id} updated successfully!`);
    // Optional: navigate back to product list
    // navigate('/admin/products');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Edit Product (ID: {id})
      </h2>

      {/* Reuse the same ProductForm component */}
      <ProductForm
        onSubmit={handleUpdate}
        initialData={currentProduct}
        isEditing={true}
      />
    </div>
  );
}