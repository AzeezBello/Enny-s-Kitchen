'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { money, productAlt } from '@/lib/menu';
import { whatsappUrl } from '@/lib/site';
import { useCart, type CartLine } from './cart-provider';

type Fulfillment = 'Delivery' | 'Pickup';

function buildOrderMessage(input: {
  lines: CartLine[];
  total: number | null;
  name: string;
  fulfillment: Fulfillment;
  address: string;
  note: string;
}) {
  const items = input.lines.map(({ product, quantity }) => {
    const lineTotal =
      product.price != null ? ` — ${money(product.price * quantity)}` : '';
    return `• ${quantity} x ${product.name}${lineTotal}`;
  });

  const totalLine =
    input.total != null
      ? `Estimated total: ${money(input.total)}`
      : 'Please confirm the current prices and total.';

  const where =
    input.fulfillment === 'Delivery'
      ? `Deliver to: ${input.address.trim() || 'Not provided yet'}`
      : 'Pickup from the kitchen';

  return [
    "Hello Enny's Kitchen! I'd like to order:",
    '',
    ...items,
    '',
    totalLine,
    '',
    `Name: ${input.name.trim() || 'Not provided yet'}`,
    `Order type: ${input.fulfillment}`,
    where,
    `Note: ${input.note.trim() || 'None'}`,
  ].join('\n');
}

export function CartDrawer() {
  const cart = useCart();
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState('');
  const [fulfillment, setFulfillment] = useState<Fulfillment>('Delivery');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const { isOpen, close } = cart;

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const message = buildOrderMessage({
    lines: cart.lines,
    total: cart.total,
    name,
    fulfillment,
    address,
    note,
  });

  return (
    <div className="overlay" onClick={cart.close}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="drawerHead">
          <div>
            <span className="eyebrow">Your order</span>
            <h2 id={titleId}>Order bag</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="iconBtn"
            onClick={cart.close}
            aria-label="Close order bag"
          >
            <X size={20} />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="drawerEmpty">
            <ShoppingBag size={42} strokeWidth={1.5} />
            <h3>Your bag is empty</h3>
            <p>Add a few favourites and they will show up here.</p>
            <Link href="/menu" className="btn btn-primary" onClick={cart.close}>
              Browse the menu <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawerItems">
              {cart.lines.map(({ product, quantity }) => (
                <li className="lineItem" key={product.id}>
                  <div className="lineThumb">
                    <Image
                      src={product.image}
                      alt={productAlt(product)}
                      fill
                      sizes="72px"
                    />
                  </div>
                  <div className="lineBody">
                    <h3>{product.name}</h3>
                    <span className="lineMeta">
                      {money(product.price)}
                      {product.price != null && quantity > 1 && (
                        <> · {money(product.price * quantity)}</>
                      )}
                    </span>
                    <div className="qty" aria-label={`Quantity of ${product.name}`}>
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
                        aria-label={`Add one ${product.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawerFoot">
              <div className="summaryRow">
                <span>Estimated total</span>
                <strong>
                  {cart.total != null ? money(cart.total) : 'Confirm on WhatsApp'}
                </strong>
              </div>

              <form className="fields" onSubmit={(event) => event.preventDefault()}>
                <label className="field">
                  <span>Your name</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="So we know who to expect"
                    autoComplete="name"
                  />
                </label>

                <fieldset className="field segmented">
                  <legend>Order type</legend>
                  {(['Delivery', 'Pickup'] as const).map((option) => (
                    <label key={option} className={fulfillment === option ? 'isActive' : ''}>
                      <input
                        type="radio"
                        name="fulfillment"
                        value={option}
                        checked={fulfillment === option}
                        onChange={() => setFulfillment(option)}
                      />
                      {option}
                    </label>
                  ))}
                </fieldset>

                {fulfillment === 'Delivery' && (
                  <label className="field">
                    <span>Delivery address</span>
                    <textarea
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Street, area and a landmark"
                      rows={2}
                      autoComplete="street-address"
                    />
                  </label>
                )}

                <label className="field">
                  <span>
                    Order note <em>(optional)</em>
                  </span>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Extra pepper, no onions, delivery time..."
                    rows={2}
                  />
                </label>
              </form>

              <p className="drawerHint">
                We confirm availability, final pricing and delivery details on
                WhatsApp before accepting the order.
              </p>

              <a
                className="btn btn-primary btn-block"
                href={whatsappUrl(message)}
                target="_blank"
                rel="noreferrer"
              >
                Send order on WhatsApp <ArrowRight size={18} />
              </a>

              <button type="button" className="btn btn-ghost btn-block" onClick={cart.clear}>
                <Trash2 size={15} /> Clear bag
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
