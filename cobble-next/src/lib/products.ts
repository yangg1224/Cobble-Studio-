export type ProductColor = { name: string; hex: string }

export type ProductEditorial = {
  img: string
  title?: string
  caption: string
}

export type ProductSpec = {
  capacity: string
  material: string
  finish: string
  dimension: string
}

export type Product = {
  slug: string
  name: string
  displayName: string
  collection: string
  sku: string
  price: string
  description: string
  material: string
  dimensions: string
  care: string
  img: string
  colors: ProductColor[]
  sizes: string[]
  editorial: ProductEditorial[]
  spec: ProductSpec
  careGuide: string
}

export const products: Product[] = [
  {
    slug: "birch-kuksa-no-01",
    name: "Birch Kuksa No.01",
    displayName: "MUG 250 ml",
    collection: "Mug",
    sku: "A0011",
    price: "CA$158",
    description:
      "Hand-carved from a single piece of Finnish birch, each Birch Kuksa No.01 is shaped over several days — no two are alike.",
    material: "Finnish birch",
    dimensions: "10 cm × 8 cm × 7 cm — holds approx. 150 ml",
    care: "Hand wash only. Condition occasionally with food-safe oil. Avoid prolonged soaking.",
    img: "/products/mug-1.jpg",
    colors: [
      { name: "Natural", hex: "#D4BFA0" },
      { name: "Walnut",  hex: "#7B4A2E" },
    ],
    sizes: ["250 ml / 8.5 oz"],
    editorial: [
      {
        img: "/hero/head1.jpg",
        title: "WOODEN COFFEE MUG",
        caption:
          "Inspired by the form of pebbles, this wooden coffee mug is defined by a calm and balanced silhouette.",
      },
      {
        img: "/hero/head3.jpg",
        caption:
          "Available in approximately 200 ml and 250 ml capacities, the design places emphasis on ergonomics and tactile experience. Subtle variations in the handle shape offer different ways of holding and using the cup.",
      },
      {
        img: "/hero/head4.jpg",
        caption:
          "Crafted from solid wood, each piece preserves the natural grain and warmth of the material. A food-safe finish provides protection while maintaining the wood's authentic texture.",
      },
      {
        img: "/hero/head2.png",
        caption:
          "Over time, the mug gradually develops its own patina, carrying traces of daily use and forming a character uniquely its own.",
      },
    ],
    spec: {
      capacity: "Approx. 250ml",
      material: "Solid Wood",
      finish: "Food-safe protective coating",
      dimension:
        "Each piece is individually handcrafted. Dimensions may vary slightly due to the natural characteristics of wood and the making process.",
    },
    careGuide: `COBBLE products are handcrafted from solid wood.
It is not static — it will gradually evolve through time and use.

[USE]
Suitable for coffee, tea, and everyday beverages.
Avoid prolonged contact with very hot liquids.

[CLEANING]
Rinse with warm water after use and dry promptly.
Do not:
· Soak for extended periods
· Use a dishwasher
· Use harsh cleaners

[MAINTENANCE]
Over time, the surface may become drier or deepen in tone — this is natural.
When needed, refresh the surface with a thin coat of food-safe wood oil.
Notes:
· Do not use in a microwave, oven, or over direct heat
· Not intended for long-term liquid storage
· Avoid sudden temperature changes

[A TRACE OF TIME]
Marks of use are not damage — they are part of it becoming yours.`,
  },
  {
    slug: "olivewood-heart-cup",
    name: "Olivewood Heart Cup",
    displayName: "MUG 170 ml",
    collection: "Mug",
    sku: "A0012",
    price: "CA$178",
    description:
      "Carved from dense, fragrant olivewood, this cup bears the wood's signature swirling grain.",
    material: "Olivewood",
    dimensions: "11 cm × 9 cm × 7.5 cm — holds approx. 170 ml",
    care: "Hand wash only. Condition with olive or walnut oil every few months.",
    img: "/products/product2.jpg",
    colors: [{ name: "Olivewood", hex: "#A0784A" }],
    sizes: ["170 ml / 5.7 oz"],
    editorial: [],
    spec: {
      capacity: "Approx. 170ml",
      material: "Olivewood",
      finish: "Food-safe protective coating",
      dimension: "Each piece is individually handcrafted. Dimensions may vary slightly.",
    },
    careGuide: "",
  },
  {
    slug: "spalt-maple-kuksa",
    name: "Spalt Maple Kuksa",
    displayName: "MUG 150 ml",
    collection: "Mug",
    sku: "A0013",
    price: "CA$168",
    description:
      "Spalt maple's dramatic black lines make every cup a one-of-a-kind piece. Sealed with beeswax for food safety.",
    material: "Spalted maple, beeswax finish",
    dimensions: "10 cm × 8 cm × 7 cm — holds approx. 150 ml",
    care: "Hand wash only. Re-wax occasionally with food-safe beeswax.",
    img: "/products/product3.jpg",
    colors: [{ name: "Maple", hex: "#C9A87A" }],
    sizes: ["150 ml / 5 oz"],
    editorial: [],
    spec: {
      capacity: "Approx. 150ml",
      material: "Spalted maple",
      finish: "Beeswax",
      dimension: "Each piece is individually handcrafted. Dimensions may vary slightly.",
    },
    careGuide: "",
  },
  {
    slug: "curly-maple-cup",
    name: "Curly Maple Cup",
    displayName: "MUG 140 ml",
    collection: "Mug",
    sku: "A0014",
    price: "CA$148",
    description:
      "The chatoyant shimmer of curly maple catches the light as you drink. A lighter, everyday companion.",
    material: "Curly maple",
    dimensions: "9.5 cm × 8 cm × 7 cm — holds approx. 140 ml",
    care: "Hand wash only. Condition with food-safe mineral oil.",
    img: "/products/product4.jpg",
    colors: [{ name: "Maple", hex: "#D4A870" }],
    sizes: ["140 ml / 4.7 oz"],
    editorial: [],
    spec: {
      capacity: "Approx. 140ml",
      material: "Curly maple",
      finish: "Food-safe protective coating",
      dimension: "Each piece is individually handcrafted. Dimensions may vary slightly.",
    },
    careGuide: "",
  },
]
