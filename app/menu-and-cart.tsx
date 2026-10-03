'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from './seo';

type Category = 'All' | 'Rice & Beans' | 'Sides' | 'Soups' | 'Swallow' | 'Protein';
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

const PRODUCTS: Product[] = [
  {
    id: 'rice',
    name: 'Cooked Rice',
    category: 'Rice & Beans',
    description: 'Soft, fluffy rice prepared fresh for your meal.',
    price: null,
    image: '/images/659129063_18080135552421924_3207266206275304446_n.jpg',
    imageAlt: 'A takeaway meal with a serving of cooked rice and Nigerian stew',
    featured: true,
  },
  {
    id: 'beans',
    name: 'Beans',
    category: 'Rice & Beans',
    description: 'Comforting, well-seasoned beans cooked the Nigerian way.',
    price: null,
    featured: true,
  },
  {
    id: 'plantain',
    name: 'Fried Plantain',
    category: 'Sides',
    description: 'Golden, sweet plantain slices fried just right.',
    price: null,
    image: '/images/plantain.jpeg',
    featured: true,
  },
  {
    id: 'eba',
    name: 'Eba',
    category: 'Swallow',
    description: 'Smooth garri swallow, made fresh and ready for soup.',
    price: null,
    image: '/images/eba.jpg',
  },
  {
    id: 'egusi',
    name: 'Egusi Soup',
    category: 'Soups',
    description: 'Rich, hearty egusi soup with deep Nigerian flavour.',
    price: null,
    image: '/images/Egusi.jpg',
    featured: true,
  },
  {
    id: 'efo-riro',
    name: 'Efo Riro',
    category: 'Soups',
    description: 'Classic leafy vegetable soup simmered in a rich pepper base.',
    price: null,
    image: '/images/efo-riro.jpg',
    imageAlt: 'A bowl of Nigerian Efo Riro leafy vegetable soup with assorted meat',
    featured: true,
  },
  {
    id: 'amala',
    name: 'Amala',
    category: 'Swallow',
    description: 'Soft, smooth amala made to pair beautifully with soup.',
    price: null,
    image: '/images/amala.jpeg',
  },
  {
    id: 'chicken',
    name: 'Chicken Portion',
    category: 'Protein',
    description: 'A generous cooked chicken portion to complete your plate.',
    price: null,
    image: '/images/chicken.jpg',
    featured: true,
  },
];

const CATEGORIES: Category[] = ['All', 'Rice & Beans', 'Sides', 'Soups', 'Swallow', 'Protein'];
const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS_WHATSAPP_NUMBER;

function money(n: number | null) {
  return n == null ? 'Price on request' : `₦${n.toLocaleString('en-NG')}`;
}

function whatsappUrl(message: string) {
  return WA
    ? `https://wa.me/${WA}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export default function MenuAndCart() {
  const [category, setCategory] = useState<Category>('All');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [openCart, setOpenCart] = useState(false);

  const filtered = useMemo(
    () => (category === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category],
  );
  const entries = Object.entries(cart)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => ({ product: PRODUCTS.find((product) => product.id === id)!, quantity }));
  const count = entries.reduce((sum, item) => sum + item.quantity, 0);
  const priced = entries.every((item) => item.product.price != null);
  const total = priced
    ? entries.reduce((sum, item) => sum + item.product.price! * item.quantity, 0)
    : null;

  function add(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  function remove(id: string) {
    setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) - 1) }));
  }

  function orderText() {
    const lines = entries.map(
      ({ product, quantity }) =>
        `${quantity} x ${product.name}${product.price != null ? ` — ${money(product.price * quantity)}` : ''}`,
    );
    return `Hello Enny's Kitchen! I'd like to order:\n\n${lines.join('\n')}\n\n${total != null ? `Total: ${money(total)}` : 'Please confirm the current prices and total.'}\n\nName:\nDelivery/Pickup:\nAddress:`;
  }

  return (
    <>
      <section className="section menuSection" id="menu">
        <div className="sectionHead">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="#top">Home</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Menu</span>
            </nav>
            <span className="eyebrow">A GOOD PLACE TO START</span>
            <h2>Made for your kind<br />of comfort.</h2>
          </div>
          <p>
            From a little something on the side to a full plate of your favourites. Build your
            order and we&apos;ll take it from there.
          </p>
        </div>
        <div className="filters" aria-label="Filter menu by category">
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
                  <img
                    src={product.image}
                    alt={product.imageAlt ?? `${product.name}, freshly prepared at Enny's Kitchen`}
                    loading={index > 3 ? 'lazy' : 'eager'}
                  />
                ) : (
                  <div className="textOnlyFood" role="img" aria-label="Beans, cooked fresh at Enny's Kitchen">
                    <span>SIMMERED WITH CARE</span>
                    <strong>Beans</strong>
                  </div>
                )}
                <span>{product.category}</span>
                {product.featured && <b className="popularTag">A favourite</b>}
              </div>
              <div className="cardBody">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="cardFoot">
                  <strong>{money(product.price)}</strong>
                  <button onClick={() => add(product.id)} aria-label={`Add ${product.name} to your order`}>
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="menuNote">Prices and availability are confirmed when you place your order.</p>
      </section>

      {count > 0 && (
        <button className="floatingOrder" onClick={() => setOpenCart(true)}>
          <ShoppingBag size={19} />
          <span>{count} item{count > 1 ? 's' : ''}</span>
          <b>{total != null ? money(total) : 'Review order'}</b>
        </button>
      )}

      {openCart && (
        <div className="overlay" onClick={() => setOpenCart(false)}>
          <aside
            className="cart"
            onClick={(event) => event.stopPropagation()}
            aria-label="Your order"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
          >
            <div className="cartHead">
              <div><span className="eyebrow">YOUR ORDER</span><h2 id="order-title">Order bag</h2></div>
              <button onClick={() => setOpenCart(false)} aria-label="Close order bag"><X /></button>
            </div>
            {entries.length === 0 ? (
              <div className="empty">
                <ShoppingBag size={40} />
                <h3>Your bag is empty</h3>
                <p>Add a few favourites from the menu.</p>
                <button className="textLink" onClick={() => setOpenCart(false)}>
                  Back to the menu <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cartItems">
                  {entries.map(({ product, quantity }) => (
                    <div className="cartItem" key={product.id}>
                      {product.image ? (
                        <img src={product.image} alt="" />
                      ) : (
                        <div className="cartImageFallback" aria-hidden="true">B</div>
                      )}
                      <div>
                        <h3>{product.name}</h3>
                        <strong>{money(product.price)}</strong>
                        <div className="qty">
                          <button
                            onClick={() => remove(product.id)}
                            aria-label={`Remove one ${product.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => add(product.id)}
                            aria-label={`Add one ${product.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cartBottom">
                  <div>
                    <span>Estimated total</span>
                    <strong>{total != null ? money(total) : 'Confirm on WhatsApp'}</strong>
                  </div>
                  <p>Prices and availability can be confirmed before your order is accepted.</p>
                  <a className="primary full" href={whatsappUrl(orderText())} target="_blank" rel="noreferrer">
                    Send order to WhatsApp <ArrowRight size={18} />
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
