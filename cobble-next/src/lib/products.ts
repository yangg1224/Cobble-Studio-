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

export type CareRow = { label: string; value: string }

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
  sizePrices?: string[]
  woodTypes?: string[]
  woodTypePriceAdjustments?: number[]
  editorial: ProductEditorial[]
  spec: ProductSpec
  careGuide: string
  careRows?: CareRow[]
}

export const products: Product[] = [
  {
    slug: "birch-kuksa-no-01",
    name: "Wooden Cup",
    displayName: "Wooden Cup",
    collection: "Mug",
    sku: "A0011",
    price: "CAD 118",
    description:
      "Hand-carved from a single piece of Finnish birch, each Birch Kuksa No.01 is shaped over several days — no two are alike.",
    material: "Finnish birch",
    dimensions: "10 cm × 8 cm × 7 cm — holds approx. 150 ml",
    care: "Hand wash only. Condition occasionally with food-safe oil. Avoid prolonged soaking.",
    img: "/products/mug-1.jpg",
    colors: [],
    sizes: ["M — Approx. 200 ml", "L — Approx. 250 ml"],
    sizePrices: ["CAD 118", "CAD 138"],
    woodTypes: ["maple", "blackWalnut", "mountainBeech", "hickory"],
    woodTypePriceAdjustments: [0, 5, -5, -5],
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
    careGuide: "",
    careRows: [
      { label: "Wash",    value: "Do not use in a dishwasher. Wash with care. Do not use abrasive cleansers or steel wool." },
      { label: "Drying",  value: "Wipe off water soon after washing." },
      { label: "Storage", value: "Do not soak in water for long periods. Do not place near open flames. Avoid direct sunlight — dry well after use and store in a dry place." },
      { label: "Note",    value: "Slight differences may occur being handmade. Color and grain of natural wood varies in each item." },
    ],
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
