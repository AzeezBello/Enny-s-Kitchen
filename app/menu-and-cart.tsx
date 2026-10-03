'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from './seo';

type Category =
  | 'All'
  | 'Rice & Beans'
  | 'Sides'
  | 'Soups'
  | 'Swallow'
  | 'Protein';

type Product = {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  description: string;
  price: number | null;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

const products: Product[] = [
  {
    id: 'cooked-rice',
    name: 'Cooked Rice',
    category: 'Rice & Beans',
    price: 2500,
    description: 'Freshly cooked Nigerian rice, served hot and ready to enjoy.',
    image: '/images/659129063_18080135552421924_3207266206275304446_n.jpg',
    featured: true,
  },
  {
    id: 'rice-and-beans',
    name: 'Rice & Beans',
    category: 'Rice & Beans',
    price: 2500,
    description: 'A comforting combination of fluffy rice and delicious beans.',
    image: '/images/659129063_18080135552421924_3207266206275304446_n.jpg',
    featured: true,
  },
  {
    id: 'beans',
    name: 'Beans',
    category: 'Rice & Beans',
    price: 2000,
    description: 'Slow-cooked Nigerian beans prepared with rich, homestyle flavour.',
    image: undefined,
    featured: true,
  },
  {
    id: 'fried-plantain',
    name: 'Fried Plantain',
    category: 'Sides',
    price: 1500,
    description: 'Golden fried plantain with the perfect sweet and savoury finish.',
    image: '/images/plantain.jpeg',
    featured: true,
  },
  {
    id: 'eba',
    name: 'Eba',
    category: 'Swallow',
    price: 1000,
    description: 'Soft, freshly prepared garri swallow.',
    image: '/images/eba.jpg',
  },
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    category: 'Soups',
    price: 2500,
    description: 'Rich Nigerian melon-seed soup prepared with authentic spices and flavour.',
    image: '/images/Egusi.jpg',
    featured: true,
  },
  {
    id: 'efo-riro',
    name: 'Efo Riro',
    category: 'Soups',
    price: 2500,
    description: 'Traditional Yoruba-style spinach stew with a rich, savoury taste.',
    image: '/images/efo-riro.jpg',
    featured: true,
  },
  {
    id: 'amala',
    name: 'Amala',
    category: 'Swallow',
    price: 1000,
    description: 'Smooth, freshly prepared Nigerian amala.',
    image: '/images/amala.jpeg',
  },
  {
    id: 'chicken',
    name: 'Chicken Portion',
    category: 'Protein',
    price: 3000,
    description: 'Tender, flavourful chicken prepared to complement your meal.',
    image: '/images/chicken.jpg',
    featured: true,
  },
];

const CATEGORIES: Category[] = [
  'All',
  'Rice & Beans',
  'Sides',
  'Soups',
  'Swallow',
  'Protein',
];

const WA =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  BUSINESS_WHATSAPP_NUMBER;

function money(n: number | null) {
  return n == null
    ? 'Price on request'
    : `₦${n.toLocaleString('en-NG')}`;
}

function whatsappUrl(message: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
}

export default function MenuAndCart() {
  const [category, setCategory] = useState<Category>('All');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [openCart, setOpenCart] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [fulfillment, setFulfillment] = useState<
    'Delivery' | 'Pickup'
  >('Delivery');
  const [address, setAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const filtered = useMemo(
    () =>
      category === 'All'
        ? products
        : products.filter(
            (product) => product.category === category,
          ),
    [category],
  );

  const entries = Object.entries(cart)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => ({
      product: products.find((product) => product.id === id)!,
      quantity,
    }));

  const count = entries.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const priced =
    entries.length > 0 &&
    entries.every((item) => item.product.price != null);

  const total = priced
    ? entries.reduce(
        (sum, item) =>
          sum + item.product.price! * item.quantity,
        0,
      )
    : null;

  function add(id: string) {
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }));
  }

  function remove(id: string) {
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] || 0) - 1),
    }));
  }

  function orderText() {
    const lines = entries.map(
      ({ product, quantity }) =>
        `${quantity} x ${product.name}${
          product.price != null
            ? ` — ${money(product.price * quantity)}`
            : ''
        }`,
    );

    return `Hello Enny's Kitchen! I'd like to order:

${lines.join('\n')}

${
  total != null
    ? `Estimated total: ${money(total)}`
    : 'Please confirm the current prices and total.'
}

Name: ${customerName || 'Not provided'}
Order type: ${fulfillment}
Address: ${
      fulfillment === 'Delivery'
        ? address || 'Not provided'
        : 'Pickup'
    }
Order note: ${orderNote || 'None'}`;
  }

  return (
    <>
      <section className="section menuSection" id="menu">
        <div className="sectionHead">
          <div>
            <nav
              className="breadcrumbs"
              aria-label="Breadcrumb"
            >
              <a href="#top">Home</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Menu</span>
            </nav>

            <span className="eyebrow">
              A GOOD PLACE TO START
            </span>

            <h2>
              Made for your kind
              <br />
              of comfort.
            </h2>
          </div>

          <p>
            From a little something on the side to a full plate
            of your favourites. Build your order and we&apos;ll
            take it from there.
          </p>
        </div>

        <div
          className="filters"
          aria-label="Filter menu by category"
        >
          {CATEGORIES.map((item) => (
            <button
              key={item}
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid">
          {filtered.map((product, index) => (
            <article className="card" key={product.id}>
              <div className="cardImage">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={
                      product.imageAlt ??
                      `${product.name}, freshly prepared at Enny's Kitchen`
                    }
                    fill
                    sizes="(max-width: 700px) 46vw, (max-width: 1000px) 45vw, 23vw"
                    priority={index < 4}
                  />
                ) : (
                  <div
                    className="textOnlyFood"
                    role="img"
                    aria-label="Beans, cooked fresh at Enny's Kitchen"
                  >
                    <span>SIMMERED WITH CARE</span>
                    <strong>Beans</strong>
                  </div>
                )}

                <span>{product.category}</span>

                {product.featured && (
                  <b className="popularTag">A favourite</b>
                )}
              </div>

              <div className="cardBody">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>

                <div className="cardFoot">
                  <strong>{money(product.price)}</strong>

                  <button
                    onClick={() => add(product.id)}
                    aria-label={`Add ${product.name} to your order`}
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="menuNote">
          Prices and availability are confirmed when you place
          your order.
        </p>
      </section>

      {count > 0 && (
        <button
          className="floatingOrder"
          onClick={() => setOpenCart(true)}
        >
          <ShoppingBag size={19} />

          <span>
            {count} item{count > 1 ? 's' : ''}
          </span>

          <b>
            {total != null
              ? money(total)
              : 'Review order'}
          </b>
        </button>
      )}

      {openCart && (
        <div
          className="overlay"
          onClick={() => setOpenCart(false)}
        >
          <aside
            className="cart"
            onClick={(event) =>
              event.stopPropagation()
            }
            aria-label="Your order"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
          >
            <div className="cartHead">
              <div>
                <span className="eyebrow">
                  YOUR ORDER
                </span>

                <h2 id="order-title">
                  Order bag
                </h2>
              </div>

              <button
                onClick={() => setOpenCart(false)}
                aria-label="Close order bag"
              >
                <X />
              </button>
            </div>

            {entries.length === 0 ? (
              <div className="empty">
                <ShoppingBag size={40} />

                <h3>Your bag is empty</h3>

                <p>
                  Add a few favourites from the menu.
                </p>

                <button
                  className="textLink"
                  onClick={() =>
                    setOpenCart(false)
                  }
                >
                  Back to the menu
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cartItems">
                  {entries.map(
                    ({ product, quantity }) => (
                      <div
                        className="cartItem"
                        key={product.id}
                      >
                        {product.image ? (
                          <div
                            style={{
                              position:
                                'relative',
                              width: 77,
                              height: 77,
                              flex: '0 0 auto',
                            }}
                          >
                            <Image
                              src={
                                product.image
                              }
                              alt=""
                              fill
                              sizes="77px"
                            />
                          </div>
                        ) : (
                          <div
                            className="cartImageFallback"
                            aria-hidden="true"
                          >
                            B
                          </div>
                        )}

                        <div>
                          <h3>
                            {product.name}
                          </h3>

                          <strong>
                            {money(
                              product.price,
                            )}
                          </strong>

                          <div className="qty">
                            <button
                              onClick={() =>
                                remove(
                                  product.id,
                                )
                              }
                              aria-label={`Remove one ${product.name}`}
                            >
                              <Minus size={14} />
                            </button>

                            <span>
                              {quantity}
                            </span>

                            <button
                              onClick={() =>
                                add(
                                  product.id,
                                )
                              }
                              aria-label={`Add one ${product.name}`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <div className="cartBottom">
                  <div>
                    <span>
                      Estimated total
                    </span>

                    <strong>
                      {total != null
                        ? money(total)
                        : 'Confirm on WhatsApp'}
                    </strong>
                  </div>

                  <div className="orderFields">
                    <label>
                      Name
                      <input
                        value={customerName}
                        onChange={(event) =>
                          setCustomerName(
                            event.target.value,
                          )
                        }
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </label>

                    <label>
                      Order type

                      <select
                        value={fulfillment}
                        onChange={(event) =>
                          setFulfillment(
                            event.target
                              .value as
                              | 'Delivery'
                              | 'Pickup',
                          )
                        }
                      >
                        <option value="Delivery">
                          Delivery
                        </option>

                        <option value="Pickup">
                          Pickup
                        </option>
                      </select>
                    </label>

                    {fulfillment ===
                      'Delivery' && (
                      <label>
                        Delivery address

                        <textarea
                          value={address}
                          onChange={(event) =>
                            setAddress(
                              event.target.value,
                            )
                          }
                          placeholder="Where should we deliver?"
                          rows={2}
                          autoComplete="street-address"
                        />
                      </label>
                    )}

                    <label>
                      Order note{' '}
                      <span>(optional)</span>

                      <textarea
                        value={orderNote}
                        onChange={(event) =>
                          setOrderNote(
                            event.target.value,
                          )
                        }
                        placeholder="Anything we should know?"
                        rows={2}
                      />
                    </label>
                  </div>

                  <p>
                    We&apos;ll confirm availability,
                    final pricing and delivery details
                    on WhatsApp before accepting the
                    order.
                  </p>

                  <a
                    className="primary full"
                    href={whatsappUrl(
                      orderText(),
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send order to WhatsApp
                    <ArrowRight size={18} />
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}