'use client';

import { ShoppingBag } from 'lucide-react';
import { money } from '@/lib/menu';
import { useCart } from './cart-provider';

export function FloatingOrder() {
  const cart = useCart();
  if (cart.count === 0 || cart.isOpen) return null;

  return (
    <button type="button" className="floatingOrder" onClick={cart.open}>
      <ShoppingBag size={18} />
      <span>
        {cart.count} item{cart.count === 1 ? '' : 's'}
      </span>
      <b>{cart.total != null ? money(cart.total) : 'Review order'}</b>
    </button>
  );
}
