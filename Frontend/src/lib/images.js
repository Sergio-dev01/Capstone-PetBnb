// Il backend non gestisce ancora le immagini: ogni location riceve una foto
// stabile (sempre la stessa per lo stesso id) da questa selezione Unsplash.
const unsplash = (id, width = 1200, extra = "") =>
  `https://images.unsplash.com/${id}?w=${width}&q=75&auto=format&fit=crop${extra}`;

// L'ordine fa combaciare le location di test del DataRunner (id 1-6)
// con una foto coerente: Casa Relax, Villa Pet, Appartamento Verde, Baita, Casa Mare, Loft.
const STAY_PHOTOS = [
  "photo-1600585154340-be6161a56a0c",
  "photo-1502672260266-1c1ef2d93688",
  "photo-1600596542815-ffad4c1539a9",
  "photo-1493809842364-78817add7ffb",
  "photo-1568605114967-8130f3a36994",
  "photo-1564013799919-ab600027ffc6",
  "photo-1586023492125-27b2c045efd7",
  "photo-1505691938895-1758d7feb511",
  "photo-1522708323590-d24dbb6b0267",
  "photo-1570129477492-45c003edd2be",
  "photo-1560448204-e02f11c3d0e2",
  "photo-1576941089067-2de3c901e126",
];

export function stayImage(locationOrId, { offset = 0, width = 1200 } = {}) {
  const location = typeof locationOrId === "object" ? locationOrId : null;
  if (offset === 0 && location?.immagineUrl) return `/images/${location.immagineUrl}`;

  const id = Number(location ? location.id : locationOrId);
  const index = Number.isFinite(id) ? Math.abs(id + offset) % STAY_PHOTOS.length : 6;
  return unsplash(STAY_PHOTOS[index], width);
}

const INTERIOR_PHOTOS = [
  "photo-1502672260266-1c1ef2d93688",
  "photo-1493809842364-78817add7ffb",
  "photo-1586023492125-27b2c045efd7",
  "photo-1505691938895-1758d7feb511",
  "photo-1522708323590-d24dbb6b0267",
  "photo-1560448204-e02f11c3d0e2",
];

// Foto principale + due interni diversi da quella principale
export function stayGallery(location) {
  const main = stayImage(location, { width: 1600 });
  const id = Math.abs(Number(location?.id) || 0);
  const interiors = INTERIOR_PHOTOS.filter((photo) => !main.includes(photo));
  const pick = (step) => unsplash(interiors[(id + step) % interiors.length], 900);
  return [main, pick(1), pick(3)];
}

const portrait = (id, width = 600) => unsplash(id, width, "&crop=faces");

// Ritratti su fondo pieno: riprendono i colori del brand
export const PET_PHOTOS = {
  frenchie: portrait("photo-1583337130417-3346a1be7dee", 900),
  pug: portrait("photo-1517849845537-4d257902454a"),
  gingerCat: portrait("photo-1596854407944-bf87f6fdd49e"),
  corgi: portrait("photo-1537151625747-768eb6cf92b2"),
  mintCat: portrait("photo-1592194996308-7b43878e84a6"),
  terrier: portrait("photo-1561037404-61cd46aa615b"),
  beagle: portrait("photo-1543466835-00a7907e9de1"),
  golden: portrait("photo-1591946614720-90a587da4a36", 900),
  collie: unsplash("photo-1587300003388-59208cc962cb", 1400),
  friends: unsplash("photo-1548199973-03cce0bbc87b", 1400),
};

export const AUTH_PHOTOS = {
  login: unsplash("photo-1583337130417-3346a1be7dee", 1100, "&h=1400"),
  register: unsplash("photo-1517849845537-4d257902454a", 1100, "&h=1400"),
};

export const WELCOME_SLIDES = [
  {
    src: "https://plus.unsplash.com/premium_photo-1683133813802-7f3f128e87d1?q=80&w=1738&auto=format&fit=crop",
    alt: "Cucciolo felice",
    title: "Viaggia con il tuo pet",
    text: "Le migliori locations pet-friendly in Italia.",
  },
  {
    src: "https://images.unsplash.com/photo-1638890177649-073e0e82ee5c?q=80&w=1746&auto=format&fit=crop",
    alt: "Casa accogliente",
    title: "Come a casa",
    text: "Comfort e sicurezza per te e il tuo animale.",
  },
  {
    src: "https://images.unsplash.com/photo-1709790533896-4399cb90ba3d?q=80&w=1740&auto=format&fit=crop",
    alt: "Diventa host",
    title: "Diventa Host",
    text: "Condividi la tua casa con altri amanti degli animali.",
  },
];
