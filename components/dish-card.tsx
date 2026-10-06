'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { money, productAlt, type Product } from '@/lib/menu';
import { useCart } from './cart/cart-provider';

type DishCardProps = {
  product: Product;
  /** Preload the image when the card is above the fold. */
  preload?: boolean;
};

export function DishCard({ product, preload = false }: DishCardProps) {
  const cart = useCart();
  const quantity = cart.quantityOf(product.id);

  return (
    <article className="dishCard">
      <div className="dishImage">
        <Image
          src={product.image}
          alt={productAlt(product)}
          fill
          sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
          preload={preload}
          loading={preload ? undefined : 'lazy'}
        />
        <span className="dishChip">{product.category}</span>
        {product.featured && <span className="dishTag">Favourite</span>}
      </div>

      <div className="dishBody">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="dishFoot">
          <span className="price">{money(product.price)}</span>

          {quantity === 0 ? (
            <button
              type="button"
              className="addBtn"
              onClick={() => cart.add(product.id)}
              aria-label={`Add ${product.name} to your bag`}
            >
              <Plus size={15} /> Add
            </button>
          ) : (
            <div className="stepper" aria-label={`${product.name} quantity`}>
              <button
                type="button"
                onClick={() => cart.remove(product.id)}
                aria-label={`Remove one ${product.name}`}
              >
                <Minus size={14} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => cart.add(product.id)}
                aria-label={`Add one more ${product.name}`}
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
