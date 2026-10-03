'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Instagram, Minus, Plus, ShoppingBag, UtensilsCrossed, X } from 'lucide-react';

type Category = 'All' | 'Rice & Beans' | 'Sides' | 'Soups' | 'Swallow' | 'Protein';
type Product = { id:string; name:string; category:Exclude<Category,'All'>; description:string; price:number|null; image:string; featured?:boolean };

const PRODUCTS: Product[] = [
  {id:'rice',name:'Cooked Rice',category:'Rice & Beans',description:'Soft, fluffy rice prepared fresh for your meal.',price:null,image:'/images/cooked-rice.svg',featured:true},
  {id:'beans',name:'Beans',category:'Rice & Beans',description:'Comforting, well-seasoned beans cooked the Nigerian way.',price:null,image:'/images/beans.svg',featured:true},
  {id:'plantain',name:'Fried Plantain',category:'Sides',description:'Golden, sweet plantain slices fried just right.',price:null,image:'/images/plantain.svg',featured:true},
  {id:'eba',name:'Eba',category:'Swallow',description:'Smooth garri swallow, made fresh and ready for soup.',price:null,image:'/images/eba.svg'},
  {id:'egusi',name:'Egusi Soup',category:'Soups',description:'Rich, hearty egusi soup with deep Nigerian flavour.',price:null,image:'/images/egusi.svg',featured:true},
  {id:'efo-riro',name:'Efo Riro',category:'Soups',description:'Classic leafy vegetable soup simmered in a rich pepper base.',price:null,image:'/images/efo-riro.svg',featured:true},
  {id:'amala',name:'Amala',category:'Swallow',description:'Soft, smooth amala made to pair beautifully with soup.',price:null,image:'/images/amala.svg'},
  {id:'chicken',name:'Chicken Portion',category:'Protein',description:'A generous cooked chicken portion to complete your plate.',price:null,image:'/images/chicken.svg',featured:true},
];

const CATEGORIES: Category[] = ['All','Rice & Beans','Sides','Soups','Swallow','Protein'];
const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

function money(n:number|null){ return n == null ? 'Price on request' : `₦${n.toLocaleString('en-NG')}`; }
function whatsappUrl(message:string){ return WA ? `https://wa.me/${WA}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`; }

export default function Home(){
  const [category,setCategory]=useState<Category>('All');
  const [cart,setCart]=useState<Record<string,number>>({});
  const [openCart,setOpenCart]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);

  const filtered=useMemo(()=>category==='All'?PRODUCTS:PRODUCTS.filter(p=>p.category===category),[category]);
  const entries=Object.entries(cart).filter(([,q])=>q>0).map(([id,q])=>({p:PRODUCTS.find(x=>x.id===id)!,q}));
  const count=entries.reduce((a,x)=>a+x.q,0);
  const priced=entries.every(x=>x.p.price!=null);
  const total=priced?entries.reduce((a,x)=>a+(x.p.price as number)*x.q,0):null;

  function add(id:string){setCart(c=>({...c,[id]:(c[id]||0)+1}));}
  function remove(id:string){setCart(c=>({...c,[id]:Math.max(0,(c[id]||0)-1)}));}
  function orderText(){
    const lines=entries.map(x=>`${x.q} x ${x.p.name}${x.p.price!=null?` — ${money(x.p.price*x.q)}`:''}`);
    return `Hello Enny's Kitchen! I'd like to order:\n\n${lines.join('\n')}\n\n${total!=null?`Total: ${money(total)}`:'Please confirm the current prices and total.'}\n\nName:\nDelivery/Pickup:\nAddress:`;
  }

  return <main>
    <header className="nav"><a className="brand" href="#top"><span className="brandMark">E</span><span>Enny's <b>Kitchen</b></span></a><button className="mobileMenu" onClick={()=>setMenuOpen(!menuOpen)}><UtensilsCrossed size={19}/></button><nav className={menuOpen?'open':''}><a href="#menu" onClick={()=>setMenuOpen(false)}>Menu</a><a href="#about" onClick={()=>setMenuOpen(false)}>About</a><a href="#how" onClick={()=>setMenuOpen(false)}>How to Order</a><a href="https://www.instagram.com/ennyskitchen2/" target="_blank" rel="noreferrer"><Instagram size={17}/> Instagram</a></nav><button className="cartBtn" onClick={()=>setOpenCart(true)}><ShoppingBag size={18}/><span>Order</span>{count>0&&<i>{count}</i>}</button></header>

    <section className="hero" id="top"><div className="heroCopy"><span className="eyebrow">HOME-COOKED NIGERIAN FOOD</span><h1>Good food.<br/><em>Made with love.</em></h1><p>Freshly prepared portions of the Nigerian meals you know and love — simple, satisfying and ready when you are.</p><div className="heroActions"><a className="primary" href="#menu">Explore the menu <ArrowRight size={18}/></a><a className="secondary" href={whatsappUrl("Hello Enny's Kitchen! I'd like to place an order.")} target="_blank" rel="noreferrer">Order on WhatsApp</a></div></div><div className="heroPlate"><div className="plateGlow"><div className="plate"><div className="food foodRice">Rice</div><div className="food foodSoup">Egusi</div><div className="food foodPlantain">Plantain</div><div className="food foodChicken">Chicken</div></div></div><div className="floatingNote">Freshly cooked<br/><strong>Daily</strong></div></div></section>

    <section className="strip"><span>Freshly prepared</span><b>•</b><span>Made to order</span><b>•</b><span>Authentic Nigerian flavours</span><b>•</b><span>WhatsApp ordering</span></section>

    <section className="section" id="menu"><div className="sectionHead"><div><span className="eyebrow">WHAT'S COOKING</span><h2>Choose your meal</h2></div><p>Pick your favourites, add them to your order, then send everything straight to WhatsApp.</p></div><div className="filters">{CATEGORIES.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="grid">{filtered.map(p=><article className="card" key={p.id}><div className="cardImage"><img src={p.image} alt=""/><span>{p.category}</span></div><div className="cardBody"><div><h3>{p.name}</h3><p>{p.description}</p></div><div className="cardFoot"><strong>{money(p.price)}</strong><button onClick={()=>add(p.id)}><Plus size={16}/> Add</button></div></div></article>)}</div></section>

    <section className="about" id="about"><div className="aboutVisual"><div className="recipeCard"><span>FROM THE KITCHEN</span><h3>Every plate<br/>starts with care.</h3><div className="recipeLines"><i/><i/><i/></div></div></div><div className="aboutCopy"><span className="eyebrow">A LITTLE ABOUT US</span><h2>Simple food, generous portions, proper flavour.</h2><p>Enny's Kitchen is all about bringing comforting Nigerian meals to your table. From everyday rice and beans to rich Egusi and Efo Riro, every portion is prepared to feel like a good meal at home.</p><p>We're keeping the experience simple: choose what you want, build your order and send it to us on WhatsApp.</p><a className="textLink" href="https://www.instagram.com/ennyskitchen2/" target="_blank" rel="noreferrer">See us on Instagram <ArrowRight size={17}/></a></div></section>

    <section className="how" id="how"><div className="sectionHead centered"><span className="eyebrow">EASY AS 1, 2, 3</span><h2>How to order</h2></div><div className="steps"><div><b>01</b><h3>Pick your food</h3><p>Browse the menu and add the meals and portions you want.</p></div><div><b>02</b><h3>Review your order</h3><p>Open your order bag to check quantities before sending.</p></div><div><b>03</b><h3>Send on WhatsApp</h3><p>We'll confirm availability, pricing, delivery or pickup details with you.</p></div></div></section>

    <footer><div><a className="brand" href="#top"><span className="brandMark">E</span><span>Enny's <b>Kitchen</b></span></a><p>Home-cooked Nigerian food, made with love.</p></div><div className="footerLinks"><a href="#menu">Menu</a><a href="#about">About</a><a href="https://www.instagram.com/ennyskitchen2/" target="_blank" rel="noreferrer">Instagram</a></div><small>© 2026 Enny's Kitchen</small></footer>

    {count>0&&<button className="floatingOrder" onClick={()=>setOpenCart(true)}><ShoppingBag size={19}/><span>{count} item{count>1?'s':''}</span><b>{total!=null?money(total):'Review order'}</b></button>}

    {openCart&&<div className="overlay" onClick={()=>setOpenCart(false)}><aside className="cart" onClick={e=>e.stopPropagation()}><div className="cartHead"><div><span className="eyebrow">YOUR ORDER</span><h2>Order bag</h2></div><button onClick={()=>setOpenCart(false)}><X/></button></div>{entries.length===0?<div className="empty"><ShoppingBag size={40}/><h3>Your bag is empty</h3><p>Add a few favourites from the menu.</p></div>:<><div className="cartItems">{entries.map(({p,q})=><div className="cartItem" key={p.id}><img src={p.image} alt=""/><div><h3>{p.name}</h3><strong>{money(p.price)}</strong><div className="qty"><button onClick={()=>remove(p.id)}><Minus size={14}/></button><span>{q}</span><button onClick={()=>add(p.id)}><Plus size={14}/></button></div></div></div>)}</div><div className="cartBottom"><div><span>Estimated total</span><strong>{total!=null?money(total):'Confirm on WhatsApp'}</strong></div><p>Prices and availability can be confirmed before your order is accepted.</p><a className="primary full" href={whatsappUrl(orderText())} target="_blank" rel="noreferrer">Send order to WhatsApp <ArrowRight size={18}/></a></div></>}</aside></div>}
  </main>
}
