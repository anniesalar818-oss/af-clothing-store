const products = [
  {id:1, img:'images/p1.jpg?v=4', name:'Emerald Lawn Ensemble', cat:'Lawn', price:12500, oldPrice:15000, tag:'New Arrival', desc:'Hand-embroidered emerald lawn suit with delicate thread work and organza dupatta. Perfect for summer soirées.'},
  {id:2, img:'images/p2.jpg?v=4', name:'Rose Garden Chiffon', cat:'Chiffon', price:18900, tag:'Bestseller', desc:'Soft chiffon in dusty rose with floral hand-embroidery. Includes matching trousers and sheer dupatta.'},
  {id:3, img:'images/p3.jpg?v=4', name:'Ivory Silk Formal', cat:'Silk', price:24500, oldPrice:28000, tag:'Limited Edition', desc:'Pure raw silk in ivory with gold thread accents. A timeless formal piece for weddings and Eid celebrations.'},
  {id:4, img:'images/p4.jpg?v=4', name:'Midnight Velvet Coat', cat:'Velvet', price:21000, tag:'Winter Pick', desc:'Luxurious velvet coat with zardozi embroidery on cuffs and neckline. Pairs beautifully with silk inner.'},
  {id:5, img:'images/p5.jpg?v=4', name:'Sapphire Organza Set', cat:'Organza', price:16800, tag:"Editor's Pick", desc:'Translucent organza in deep sapphire with scalloped hemlines and mirror-work embellishments.'},
  {id:6, img:'images/p6.jpg?v=4', name:'Pearl White Karandi', cat:'Karandi', price:14200, tag:'New Arrival', desc:'Breathable karandi weave in pearl white with subtle self-print. Ideal for everyday elegance.'},
  {id:7, img:'images/p7.jpg?v=4', name:'Gold Heritage Lehnga', cat:'Festive', price:45000, oldPrice:52000, tag:'Bridal', desc:'Heavily embroidered lehnga in gold with classic Mughal motifs. A statement piece for special occasions.'},
  {id:8, img:'images/p8.jpg?v=4', name:'Peony Print Lawn', cat:'Lawn', price:8900, tag:'Summer Essential', desc:'Lightweight lawn with peony print in blush tones. Comfortable and chic for daily wear.'}
];

let cart = JSON.parse(localStorage.getItem('af_cart') || '[]');

function fmt(n){ return 'PKR ' + n.toLocaleString('en-US'); }

function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

function addToCart(id){
  const p = products.find(x => x.id == id);
  cart.push(p);
  localStorage.setItem('af_cart', JSON.stringify(cart));
  renderCart();
  showToast(p.name + ' added to bag');
}

function removeFromCart(idx){
  cart.splice(idx, 1);
  localStorage.setItem('af_cart', JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const itemsEl = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count');
  const subtotalEl = document.getElementById('cart-subtotal');
  countEl.textContent = cart.length;
  if(cart.length === 0){
    itemsEl.innerHTML = '<div class="cart-empty">Your bag is empty.<br>Discover something beautiful from the collection.</div>';
    subtotalEl.textContent = fmt(0);
    return;
  }
  itemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((p, idx) => {
    total += p.price;
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-item-info">
        <h4>${p.name}</h4>
        <div class="cat">${p.cat}</div>
        <div class="price">${fmt(p.price)}</div>
        <span class="cart-remove" data-idx="${idx}">Remove</span>
      </div>
    `;
    itemsEl.appendChild(item);
  });
  subtotalEl.textContent = fmt(total);
  itemsEl.querySelectorAll('.cart-remove').forEach(el => {
    el.addEventListener('click', () => removeFromCart(parseInt(el.dataset.idx)));
  });
}

function closeCart(){
  document.getElementById('cart-overlay').classList.remove('active');
  document.getElementById('cart-drawer').classList.remove('active');
}

function initCart(){
  const cartIcon = document.getElementById('cart-icon');
  const cartOverlay = document.getElementById('cart-overlay');
  cartIcon.addEventListener('click', () => {
    cartOverlay.classList.add('active');
    document.getElementById('cart-drawer').classList.add('active');
  });
  document.getElementById('cart-close').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  renderCart();
}

function initModal(){
  const modalOverlay = document.getElementById('modal-overlay');
  const grid = document.getElementById('product-grid');
  if(!grid) return;

  grid.addEventListener('click', e => {
    const t = e.target.closest('[data-action="view"]');
    if(!t) return;
    const p = products.find(x => x.id == t.dataset.id);
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-cat').textContent = p.cat;
    document.getElementById('modal-title').textContent = p.name;
    document.getElementById('modal-price').innerHTML = (p.oldPrice ? '<del>'+fmt(p.oldPrice)+'</del> ' : '') + fmt(p.price);
    document.getElementById('modal-desc').textContent = p.desc;
    document.getElementById('modal-add').dataset.id = p.id;
    modalOverlay.classList.add('active');
  });

  document.getElementById('modal-close').addEventListener('click', () => modalOverlay.classList.remove('active'));
  modalOverlay.addEventListener('click', e => { if(e.target === modalOverlay) modalOverlay.classList.remove('active'); });
  document.getElementById('modal-add').addEventListener('click', e => {
    addToCart(e.target.dataset.id);
    modalOverlay.classList.remove('active');
  });
}

function initMobileMenu(){
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    const nav = document.querySelector('nav ul');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'var(--cream)';
    nav.style.padding = '24px';
    nav.style.borderTop = '1px solid var(--line)';
    nav.style.gap = '20px';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initModal();
  initMobileMenu();
});
