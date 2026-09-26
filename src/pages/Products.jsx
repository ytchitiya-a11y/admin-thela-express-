import { useEffect, useState } from 'react';
import { getProducts } from '../api/client';
import ProductFormModal from '../components/ProductFormModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = () => getProducts().then(({ data }) => setProducts(data.products)).finally(() => setLoading(false));

  useEffect(() => {
    loadProducts();
  }, []);

  const openAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSaved = () => {
    setModalOpen(false);
    loadProducts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-ink">Products</h1>
        <button
          onClick={openAdd}
          className="bg-chili text-paper font-body text-sm font-medium px-4 py-2 rounded-md hover:brightness-110 transition"
        >
          + Add Product
        </button>
      </div>

      {loading && <p className="font-body text-clay text-sm">Loading…</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-clay/15 p-3">
            <div className="aspect-square rounded-md overflow-hidden bg-slate mb-2">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-clay/40 text-xs font-body">No image</div>
              )}
            </div>
            <p className="font-body text-sm font-medium text-ink truncate">{product.name}</p>
            <p className="font-mono text-xs text-clay mb-2">₹{Number(product.price).toFixed(0)} · stock {product.stock}</p>
            <button
              onClick={() => openEdit(product)}
              className="w-full text-xs font-body font-medium border border-clay/30 text-ink py-1.5 rounded-md hover:bg-slate transition"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {!loading && products.length === 0 && (
        <p className="font-body text-clay text-sm mt-6">No products yet. Add your first item.</p>
      )}

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default Products;
