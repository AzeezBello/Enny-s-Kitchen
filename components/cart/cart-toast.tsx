'use client';

import { Check } from 'lucide-react';
import { useCart } from './cart-provider';

export function CartToast() {
  const cart = useCart();

  return (
    <div className="toastRegion" aria-live="polite" aria-atomic="true">
      {cart.notice && !cart.isOpen && (
        <div className="toast" key={cart.notice.id}>
          <Check size={16} />
          <span>{cart.notice.text}</span>
          <button type="button" onClick={cart.open}>
            View bag
          </button>
        </div>
      )}
    </div>
  );
}
