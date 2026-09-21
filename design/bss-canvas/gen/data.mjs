export const SELLERS = {
  techhub: { name: 'TechHub Kaduna', rating: '4.8', deals: 212, loc: 'Barnawa', since: 'Mar 2023', verified: true },
  mobilepoint: { name: 'Mobile Point NG', rating: '4.6', deals: 96, loc: 'Unguwan Rimi', since: 'Jan 2024', verified: true },
  gadgetworld: { name: 'GadgetWorld Kd', rating: '4.9', deals: 140, loc: 'Kawo', since: 'Aug 2023', verified: true },
  amina: { name: 'Amina Yusuf', rating: '5.0', deals: 43, loc: 'Sabon Tasha', since: 'Feb 2024', verified: true },
  kabir: { name: 'Kabir Musa', rating: '4.2', deals: 12, loc: 'Kakuri', since: 'Nov 2024', verified: false },
  direct: { name: 'BuySellSwap Direct', rating: '4.9', deals: 318, loc: 'Malali', since: 'Jan 2026', verified: true },
};

export const LISTINGS = [
  { id: 'l1', title: 'iPhone 13 Pro 256GB, Sierra Blue', price: 415000, was: 470000, img: 'phone-in-hand-blue.jpg', cond: 'uk-used', loc: 'Barnawa', when: '2h ago', ver: true, swap: false, seller: SELLERS.techhub,
    specs: [['Storage', '256GB'], ['Battery health', '89%'], ['Box and charger', 'Included'], ['Warranty', '3 months, seller']], grade: 'Grade A' },
  { id: 'l2', title: 'Redmi Note 13 Pro+ 512GB, sealed', price: 289000, img: 'phones-trio-lemon.jpg', cond: 'brand-new', loc: 'Unguwan Rimi', when: 'Today', ver: false, swap: true, seller: SELLERS.mobilepoint,
    specs: [['Storage', '512GB'], ['Camera', '200MP'], ['Seal', 'Factory sealed'], ['Warranty', '12 months']], grade: 'New' },
  { id: 'l3', title: 'MacBook Air M2 16GB / 512GB', price: 1150000, was: 1290000, img: 'laptop-minimal-white.jpg', cond: 'uk-used', loc: 'Malali', when: '1d ago', ver: true, swap: false, seller: SELLERS.direct,
    specs: [['Chip', 'Apple M2'], ['RAM', '16GB'], ['Cycle count', '142'], ['Charger', 'Original 35W']], grade: 'Grade A' },
  { id: 'l4', title: 'HP EliteBook 840 G8, i7 11th gen, 16/512', price: 465000, img: 'laptop-and-phone-desk.jpg', cond: 'ng-used', loc: 'Kawo', when: '3d ago', ver: true, swap: false, seller: SELLERS.gadgetworld,
    specs: [['CPU', 'i7-1165G7'], ['RAM', '16GB'], ['Screen', '14" FHD touch'], ['Battery', '5h']], grade: 'Grade B' },
  { id: 'l5', title: 'Samsung Galaxy S24 128GB, cobalt blue', price: 520000, img: 'phones-trio-coral.jpg', cond: 'uk-used', loc: 'Sabon Tasha', when: '5h ago', ver: true, swap: true, seller: SELLERS.amina,
    specs: [['Storage', '128GB'], ['Battery health', '94%'], ['Box', 'No box'], ['Warranty', 'None']], grade: 'Grade A' },
  { id: 'l6', title: 'Dell XPS 13 Plus, spares or repair', price: 185000, img: 'laptop-typing-blank.jpg', cond: 'for-parts', loc: 'Kakuri', when: '1w ago', ver: false, swap: false, seller: SELLERS.kabir,
    specs: [['Fault', 'No display'], ['RAM', '16GB'], ['SSD', 'Removed'], ['Body', 'Good']], grade: 'Parts' },
  { id: 'l7', title: 'iPhone 11 128GB, black', price: 235000, img: 'phone-homescreen.jpg', cond: 'ng-used', loc: 'Tudun Wada', when: '1d ago', ver: true, swap: true, seller: SELLERS.mobilepoint,
    specs: [['Storage', '128GB'], ['Battery health', '82%'], ['Face ID', 'Working'], ['Warranty', '1 month, seller']], grade: 'Grade B' },
  { id: 'l8', title: 'MacBook Pro 15" 2019, 16GB / 512GB', price: 690000, img: 'laptop-white-room.jpg', cond: 'uk-used', loc: 'Ungwan Sarki', when: '2d ago', ver: true, swap: false, seller: SELLERS.techhub,
    specs: [['Chip', 'Core i7'], ['RAM', '16GB'], ['Cycle count', '318'], ['Charger', 'Original 87W']], grade: 'Grade B' },
  { id: 'l9', title: 'MacBook Air 2020, rose gold', price: 545000, img: 'laptop-screen-dark.jpg', cond: 'ng-used', loc: 'Narayi', when: '4d ago', ver: false, swap: false, seller: SELLERS.gadgetworld,
    specs: [['Chip', 'Intel Core i5'], ['RAM', '8GB'], ['Cycle count', '401'], ['Charger', 'Included']], grade: 'Grade B' },
];
export const L = Object.fromEntries(LISTINGS.map((l) => [l.id, l]));

export const CATS = [['Phones', 186, 'smartphone'], ['Laptops', 74, 'laptop'], ['Consoles', 21, 'gamepad-2'], ['Audio', 48, 'headphones'], ['Tablets', 33, 'tablet'], ['Accessories', 112, 'cable']];
