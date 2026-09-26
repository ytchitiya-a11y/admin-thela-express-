import { useState } from 'react';
import { addProduct, updateProduct } from '../api/client';

const ProductFormModal = ({ product, onClose, onSaved }) => {
  const isEdit = !!product;
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || 'food');
  const [price, setPrice] = useState(product?.price || '');
  const [stock, setStock] = useState(product?.stock || '');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(product?.image_url || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('stock', stock);
      if (imageFile) formData.append('image', imageFile); // Cloudinary upload happens on backend

      if (isEdit) {
        await updateProduct(product.id, formData);
      } else {
        await addProduct(formData);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-tandoor/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="font-display text-xl text-ink mb-4">{isEdit ? 'Edit Product' : 'Add Product'}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Image upload - this is what goes to Cloudinary via the backend */}
          <div>
            <label className="block font-body text-xs text-clay mb-1">Image</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-md bg-slate border border-clay/20 overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-clay/40 text-xs">No img</span>
                )}
              </div>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="text-sm font-body" />
            </div>
          </div>

          <div>
            <label className="block font-body text-xs text-clay mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-xs text-clay mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm bg-white">
                <option value="food">Food</option>
                <option value="grocery">Grocery</option>
              </select>
            </div>
            <div>
              <label className="block font-body text-xs text-clay mb-1">Price (₹)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01"
                className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm" />
            </div>
          </div>

          <div>
            <label className="block font-body text-xs text-clay mb-1">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} min="0"
              className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm" />
          </div>

          {error && <p className="text-chili font-body text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-md font-body text-sm border border-clay/30 text-ink">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2 rounded-md font-body text-sm font-medium bg-chili text-paper disabled:opacity-50">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
