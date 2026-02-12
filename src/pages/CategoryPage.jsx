import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryByKey } from '../state/MockData.js';
import { useCart } from '../state/CartContext.jsx';
import { useToast } from '../state/ToastContext.jsx';

function titleCase(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

export default function CategoryPage() {
  const { category } = useParams();
  const cat = useMemo(() => getCategoryByKey(category), [category]);
  const { addItem } = useCart();
  const { showToast } = useToast();

  if (!cat) {
    return (
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Category</h2>
        <div className="error">Unknown category.</div>
      </div>
    );
  }

  const items = [
    { id: '1', name: `${titleCase(cat.key)} Item 1` },
    { id: '2', name: `${titleCase(cat.key)} Item 2` },
    { id: '3', name: `${titleCase(cat.key)} Item 3` },
  ];

  function onAddToCart() {
    addItem();
    showToast('Item added to cart.');
  }

  return (
    <div className="row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{cat.label}</h2>
        <div className="hint">Items: {cat.itemCount}</div>
        <div style={{ marginTop: 10 }}>{cat.message}</div>
      </div>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            <div className="hint" style={{ marginTop: 6 }}>
              Mocked item
            </div>
            <div style={{ marginTop: 12 }}>
              <button type="button" className="btn btnPrimary" onClick={onAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
