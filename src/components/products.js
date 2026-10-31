const raw = [
  [1, "Matte Lipstick", "Cosmetics", 599, 899, 4.4, true, "Smooth matte finish with 12-hour wear and a creamy feel."],
  [2, "Liquid Foundation", "Cosmetics", 849, 1299, 4.3, false, "Lightweight medium coverage foundation with a natural finish."],
  [3, "Eyeshadow Palette 12 Shades", "Cosmetics", 999, 1599, 4.5, true, "Blendable matte and shimmer shades for day and evening looks."],
  [4, "Compact Powder", "Cosmetics", 399, 649, 4.1, false, "Oil-control compact that sets makeup and reduces shine."],
  [5, "Kajal Pencil", "Cosmetics", 199, 349, 4.4, false, "Smudge-proof black kajal with a smooth, intense colour."],
  [6, "Volumising Mascara", "Cosmetics", 449, 749, 4.2, false, "Lengthening and volumising mascara with no clumps."],
  [7, "Cream Blush", "Cosmetics", 549, 899, 4.3, true, "Soft cream blush that blends easily for a natural flush."],
  [8, "Nail Polish Set (6 pcs)", "Cosmetics", 399, 799, 4.3, true, "Six glossy shades in a long-lasting, chip-resistant formula."],
  [9, "Liquid Eyeliner", "Cosmetics", 299, 499, 4.2, false, "Precise waterproof liner with a quick-dry formula."],
  [10, "Glow Highlighter", "Cosmetics", 499, 849, 4.4, false, "Silky highlighter that gives a soft, radiant glow."],
  [11, "Lip Gloss Duo", "Cosmetics", 349, 599, 4.1, false, "Two shiny, non-sticky glosses in everyday shades."],
  [12, "Makeup Brush Set (10 pcs)", "Cosmetics", 799, 1499, 4.5, true, "Soft synthetic brushes for face and eyes with a travel pouch."],
  [13, "Gold Plated Layered Chain", "Jewellery", 1299, 2499, 4.4, true, "Two-layer gold plated chain with a delicate pendant."],
  [14, "Pearl Necklace", "Jewellery", 1899, 3299, 4.5, false, "Classic faux pearl strand with a secure clasp."],
  [15, "Kundan Choker Set", "Jewellery", 2499, 4499, 4.3, true, "Traditional kundan choker with matching earrings."],
  [16, "Jhumka Earrings", "Jewellery", 699, 1299, 4.5, true, "Gold plated jhumkas with a lightweight festive design."],
  [17, "American Diamond Studs", "Jewellery", 899, 1599, 4.3, false, "Sparkling cubic zirconia studs for parties and weddings."],
  [18, "Pearl Drop Earrings", "Jewellery", 799, 1399, 4.2, false, "Elegant drop earrings with faux pearls."],
  [19, "Solitaire Ring", "Jewellery", 1299, 2299, 4.4, true, "Silver tone solitaire ring with a cubic zirconia stone."],
  [20, "Gold Plated Bangles Set (4 pcs)", "Jewellery", 999, 1799, 4.4, false, "Set of four gold plated bangles with a polished finish."],
  [21, "Temple Jewellery Necklace Set", "Jewellery", 2999, 5499, 4.4, true, "Antique gold finish necklace set with matching earrings."],
  [22, "Gold Hoop Earrings", "Jewellery", 599, 1099, 4.4, false, "Classic medium hoops with a polished gold finish."],
  [23, "Silver Tone Anklet Pair", "Jewellery", 599, 1099, 4.2, false, "Lightweight anklets with tiny ghungroo bells."],
  [24, "Statement Cocktail Ring", "Jewellery", 1099, 1899, 4.2, false, "Bold ring with a coloured stone and gold finish."],
];

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const products = raw.map(
  ([id, name, category, price, mrp, rating, featured, description]) => ({
    id, name, category, price, mrp, rating, featured, description,
    image: `/images/${slug(name)}.jpg`,
    discount: Math.round((1 - price / mrp) * 100),
  })
);

export const categories = ["All", "Cosmetics", "Jewellery"];

export function getProductById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === Number(id));
      if (product) resolve(product);
      else reject(new Error("Product not found"));
    }, 500);
  });
}
