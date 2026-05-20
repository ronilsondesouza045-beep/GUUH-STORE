export interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  description?: string;
  ageRequired?: boolean;
  note?: string;
  image?: string;
}

export const CATEGORIES = [
  "Mercado Negro 🔞",
  "Salas +18",
  "Poses +18",
  "Promoções",
  "Crowns via presente",
  "Gift Card Google",
  "Gift Card Apple",
  "Números Virtuais",
  "Via Presente IMVU",
  "Via Direto IMVU",
  "Assinatura VIP"
];

export const CATEGORY_DRIVE_LINKS: Record<string, string> = {
  "Mercado Negro 🔞": "https://drive.google.com/drive/folders/1F51d0alfBNAAtt5pugP6huDrjJQ2nzul?usp=sharing",
  "Salas +18": "https://drive.google.com/drive/folders/1dkOT9DYrFZbPUYfIMRxILTPg4UsrkSF5?usp=sharing"
};

export const PRODUCTS = [
  // Mercado Negro 🔞
  { id: "mn1", category: "Mercado Negro 🔞", name: "King Kong Wander", price: 45, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/uploads/2022/09/4k-triggers-imvu-black-market-1.jpg" },
  { id: "mn2", category: "Mercado Negro 🔞", name: "Venom Wander", price: 40, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/10/new-king-kong-mega-5-black-market-imvu.png.webp" },
  { id: "mn3", category: "Mercado Negro 🔞", name: "King Kong Clássico", price: 35, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/08/kingkong-4-0-imvu-black-market-700x466.jpg.webp" },
  { id: "mn4", category: "Mercado Negro 🔞", name: "King Kong Realista", price: 35, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/11/king-kong-classic-imvu-black-market-triggers.jpg.webp" },
  { id: "mn5", category: "Mercado Negro 🔞", name: "Venom Realista", price: 40, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/10/Screenshot_53-700x443.png.webp" },
  { id: "mn6", category: "Mercado Negro 🔞", name: "Venom Clássico", price: 40, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2023/01/new-80k-king-kong-black-market-imvu-1-700x689.png.webp" },
  { id: "mn7", category: "Mercado Negro 🔞", name: "Venom Ultra", price: 40, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/11/best-venom-8k-120-actions-imvu-black-market-triggers.jpg.webp" },
  { id: "mn8", category: "Mercado Negro 🔞", name: "Venom Ultra HD", price: 40, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/09/trigger-imvu-venom-3-0-imvu-black-market.jpg.webp" },
  { id: "mn9", category: "Mercado Negro 🔞", name: "Nú Feminino Trans", price: 35, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2023/02/5-0-king-kong-female-black-market-imvu.png.webp" },
  { id: "mn10", category: "Mercado Negro 🔞", name: "Nú feminino Premium com ações", price: 30, description: "Nus enviados somente se o cliente tiver sala comprovada com vídeo ou print.", ageRequired: true, image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/12/female-nude-15-actions-v1-black-market-imvu.png.webp" },

  // Salas +18
  { id: "s1", category: "Salas +18", name: "Sala Elegance", price: 35, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s2", category: "Salas +18", name: "Sala Luxury", price: 35, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s3", category: "Salas +18", name: "Móvel Yatch (Casal e Trisal)", price: 40, description: "Preciso acessar a conta do cliente para fazer a montagem.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s4", category: "Salas +18", name: "Sala Netflix", price: 35, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s5", category: "Salas +18", name: "Sala Purple Trisal", price: 40, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s6", category: "Salas +18", name: "Sala Blue", price: 35, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s7", category: "Salas +18", name: "Sala Rose", price: 35, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s8", category: "Salas +18", name: "Sala Red", price: 35, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },
  { id: "s9", category: "Salas +18", name: "Pleasure", price: 35, image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh53-b2jSAxmdwtjPQpVq6aDrGPTgosyRZX97Hf6JrOiW5eUCOkaAETju_vI0TDOnnnPyjVFnpG6drRQIJR8BLxRIXtdUCCgi8MwD6Y-mCamv-sCoJ33fyulu7rTGibwSO-7UqsVysqXdCY/s1600/ezgif.com-optimize+%25283%2529.gif" },

  // Poses +18
  { id: "p1", category: "Poses +18", name: "Poses +18 avulsas", price: 15, note: "Cada uma", image: "https://www.imvumafias.org/images/graymarket/packs/Ride%20in%20Air.png" },
  { id: "p2", category: "Poses +18", name: "Pacote Trisal", price: 25, image: "https://nlt04.hdsex.org/2/d/c/2dc6fdb84caa1a2c681f67f04048f7f3/thumbs/480x270/1.jpeg" },
  { id: "p3", category: "Poses +18", name: "Poses +18 Sofá & Carro", price: 19, image: "https://blackmarketvu.com/wp-content/uploads/2022/10/pose-movel-890-imvu-black-market.jpg" },

  // Promoções
  { id: "promo1", category: "Promoções", name: "Combo NU + Sala", price: 75, description: "Somente envios no mesmo @. Venda somente para contas com AGE.", image: "https://blackmarketvu.com/wp-content/webp-express/webp-images/uploads/2022/09/apartment-room-imvu-black-market.jpg.webp" },

  // Crowns via presente
  ...[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 150, 200, 250, 300, 500, 1000].map((amount, idx) => ({
    id: `crowns-${amount}`,
    category: "Crowns via presente",
    name: `${amount} Crowns`,
    price: amount === 5 ? 1.10 : amount === 10 ? 1.60 : (amount/10) + (amount === 1000 ? 0.60 : 0.60), // Simplified logic but matching user's table
    priceRaw: [1.1, 1.6, 2.1, 2.6, 3.1, 3.6, 4.1, 4.6, 5.1, 5.6, 10.6, 15.6, 20.6, 25.6, 30.6, 50.6, 100.6][idx],
    description: "Com risco de remoção.",
    image: "https://cdn.ggmax.com.br/images/ac8da638f5c0bc2bb9e97dc22ab08a53.sm.jpg"
  })).map(c => ({...c, price: c.priceRaw})),

  // Gift Card Google
  { id: "gcg1", category: "Gift Card Google", name: "Gift Card Google 15", price: 19.75, image: "https://cdn.ggmax.com.br/images/47b0c236c90884b641156d111525562e.sm.jpg" },
  { id: "gcg2", category: "Gift Card Google", name: "Gift Card Google 20", price: 24.75, image: "https://cdn.ggmax.com.br/images/47b0c236c90884b641156d111525562e.sm.jpg" },
  { id: "gcg3", category: "Gift Card Google", name: "Gift Card Google 30", price: 34.75, image: "https://cdn.ggmax.com.br/images/47b0c236c90884b641156d111525562e.sm.jpg" },
  { id: "gcg4", category: "Gift Card Google", name: "Gift Card Google 40", price: 44.75, image: "https://cdn.ggmax.com.br/images/47b0c236c90884b641156d111525562e.sm.jpg" },
  { id: "gcg5", category: "Gift Card Google", name: "Gift Card Google 50", price: 54.75, image: "https://cdn.ggmax.com.br/images/47b0c236c90884b641156d111525562e.sm.jpg" },
  { id: "gcg6", category: "Gift Card Google", name: "Gift Card Google 70", price: 74.75, image: "https://cdn.ggmax.com.br/images/47b0c236c90884b641156d111525562e.sm.jpg" },

  // Gift Card Apple
  { id: "gca1", category: "Gift Card Apple", name: "Gift Card Apple 20", price: 24.75, image: "https://microless.com/cdn/products/3bd4e9683ee2180fcccb02bdc20f78e5-hi.jpg" },
  { id: "gca2", category: "Gift Card Apple", name: "Gift Card Apple 50", price: 54.75, image: "https://microless.com/cdn/products/3bd4e9683ee2180fcccb02bdc20f78e5-hi.jpg" },
  { id: "gca3", category: "Gift Card Apple", name: "Gift Card Apple 100", price: 104.75, image: "https://microless.com/cdn/products/3bd4e9683ee2180fcccb02bdc20f78e5-hi.jpg" },
  { id: "gca4", category: "Gift Card Apple", name: "Gift Card Apple 150", price: 154.75, image: "https://microless.com/cdn/products/3bd4e9683ee2180fcccb02bdc20f78e5-hi.jpg" },
  { id: "gca5", category: "Gift Card Apple", name: "Gift Card Apple 200", price: 204.75, image: "https://microless.com/cdn/products/3bd4e9683ee2180fcccb02bdc20f78e5-hi.jpg" },
  { id: "gca6", category: "Gift Card Apple", name: "Gift Card Apple 300", price: 304.75, image: "https://microless.com/cdn/products/3bd4e9683ee2180fcccb02bdc20f78e5-hi.jpg" },

  // Números Virtuais
  { id: "nv1", category: "Números Virtuais", name: "Número BR", price: 25, description: "Ativar verificação de duas etapas. Adicionar e-mail de recuperação.", image: "https://es.vnumero.com/img/og.jpg" },
  { id: "nv2", category: "Números Virtuais", name: "Número Mundial", price: 12, description: "Ativar verificação de duas etapas. Adicionar e-mail de recuperação.", image: "https://es.vnumero.com/img/og.jpg" },

  // Via Presente IMVU
  ...[5, 10, 15, 20, 25, 30, 40, 50, 100].map((k, idx) => ({
    id: `vpresente-${k}k`,
    category: "Via Presente IMVU",
    name: `${k}K Credits (Via Presente)`,
    price: [8.75, 17.50, 26.25, 35.00, 46.75, 52.50, 70.00, 87.50, 175.00][idx],
    image: "https://cdn.ggmax.com.br/images/14e95aec403b3b5ed0add932e272f585.sm.jpg"
  })),

  // Via Direto IMVU
  ...[5, 10, 15, 20, 25, 30, 40, 50, 100].map((k, idx) => ({
    id: `vdireto-${k}k`,
    category: "Via Direto IMVU",
    name: `${k}K Credits (Via Direto)`,
    price: [14.00, 28.00, 42.00, 56.00, 70.00, 84.00, 112.00, 140.00, 280.00][idx],
    image: "https://cdn.ggmax.com.br/images/7e8ff17f9bccb16332531a877538dde7.sm.jpg"
  })),

  // Assinatura VIP
  {
    id: "vip-gold",
    category: "Assinatura VIP",
    name: "VIP Gold",
    price: 32.00,
    description: "Assinatura VIP Gold para sua conta IMVU com todos os benefícios inclusos.",
    image: "https://tse2.mm.bing.net/th/id/OIP.ocVqaVGhYyjr8Eh2MC8pBwAAAA?pid=Api&P=0&h=180"
  },
  {
    id: "vip-plat-1",
    category: "Assinatura VIP",
    name: "VIP Platinum 1 Mês",
    price: 38.00,
    description: "Assinatura VIP Platinum válida por 1 mês para o seu perfil.",
    image: "https://cdn.ggmax.com.br/images/61a95fc96df775ccafa9142bc849a749.sm.jpg"
  },
  {
    id: "vip-plat-3",
    category: "Assinatura VIP",
    name: "VIP Platinum 3 Meses",
    price: 114.00,
    description: "Combo trimestral de Assinatura VIP Platinum com desconto especial.",
    image: "https://cdn.ggmax.com.br/images/61a95fc96df775ccafa9142bc849a749.sm.jpg"
  },
  {
    id: "vip-plat-6",
    category: "Assinatura VIP",
    name: "VIP Platinum 6 Meses",
    price: 228.00,
    description: "Combo semestral de Assinatura VIP Platinum completo.",
    image: "https://cdn.ggmax.com.br/images/61a95fc96df775ccafa9142bc849a749.sm.jpg"
  },
  {
    id: "vip-diamond",
    category: "Assinatura VIP",
    name: "VIP Diamond",
    price: 110.00,
    description: "Assinatura VIP Diamond Premium.",
    image: "https://tse3.mm.bing.net/th/id/OIP.jxkFY40ZLN93DzBc5XAQmAAAAA?pid=Api&P=0&h=180"
  },
  {
    id: "vip-emerald",
    category: "Assinatura VIP",
    name: "VIP Esmerald",
    price: 175.00,
    description: "Crassa de elite para sua conta! Assinatura VIP Esmerald com benefícios máximos.",
    image: "https://cdn.sistemawbuy.com.br/arquivos/b7f36453f415a540dffee82d02b0ae0c/produtos/6737cad79ce56/esmeralda-1-6737cad7da8b5_mini.jpg"
  }
];
