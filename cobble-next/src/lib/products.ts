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
    colors: [],
    sizes: ["M — Approx. 130 ml", "L — Approx. 170 ml"],
    sizePrices: ["CA$178", "CA$178"],
    editorial: [
      {
        img: "/hero/head1.jpg",
        title: "OLIVEWOOD HEART CUP",
        caption:
          "Carved from dense Mediterranean olivewood, each cup reveals a landscape of swirling grain — warm amber to deep gold, with veins that tell the life of the tree.",
      },
      {
        img: "/hero/head3.jpg",
        caption:
          "At 170 ml, the cup is sized for slow mornings — an espresso, a short tea, a moment held in both hands. The heart-shaped silhouette fits naturally against the palm.",
      },
      {
        img: "/hero/head4.jpg",
        caption:
          "Olivewood is one of the densest hardwoods used in crafting. Its tight grain takes a fine finish and resists moisture well, making it an ideal material for a daily drinking vessel.",
      },
      {
        img: "/hero/head2.png",
        caption:
          "With use, the wood deepens in tone and develops a quiet luster — a patina formed not by treatment but by time, touch, and the rituals of everyday life.",
      },
    ],
    spec: {
      capacity: "Approx. 170ml",
      material: "Olivewood",
      finish: "Food-safe protective coating",
      dimension: "Each piece is individually handcrafted. Dimensions may vary slightly.",
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
    colors: [],
    sizes: ["M — Approx. 120 ml", "L — Approx. 150 ml"],
    sizePrices: ["CA$168", "CA$168"],
    editorial: [
      {
        img: "/hero/head1.jpg",
        title: "SPALT MAPLE KUKSA",
        caption:
          "Spalted maple is defined by its dramatic black zone lines — the mark of a natural process that transforms ordinary maple into something singular. No two pieces share the same pattern.",
      },
      {
        img: "/hero/head3.jpg",
        caption:
          "At 150 ml, this kuksa is a considered size — enough for a full espresso or a careful pour of tea. The slightly tapered form sits comfortably in the hand with or without a handle.",
      },
      {
        img: "/hero/head4.jpg",
        caption:
          "Sealed with food-safe beeswax, the surface carries a soft, matte warmth. The finish enhances the grain's contrast while protecting the wood from daily moisture without obscuring its natural character.",
      },
      {
        img: "/hero/head2.png",
        caption:
          "Because spalting is a natural phenomenon, each cup is entirely one of a kind. The black veining — never the same twice — makes this piece as much an object to look at as to use.",
      },
    ],
    spec: {
      capacity: "Approx. 150ml",
      material: "Spalted maple",
      finish: "Beeswax",
      dimension: "Each piece is individually handcrafted. Dimensions may vary slightly.",
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
    slug: "maple-spoon-no-01",
    name: "Maple Spoon",
    displayName: "Maple Spoon No.01",
    collection: "Spoon",
    sku: "B0011",
    price: "CA$65",
    description:
      "Hand-carved from a single piece of maple, this spoon is shaped over several sessions — the deep bowl and squared handle reflect a quiet, considered form.",
    material: "Maple",
    dimensions: "Approx. 22 cm length — bowl width approx. 7 cm",
    care: "Hand wash only. Condition occasionally with food-safe oil. Avoid prolonged soaking.",
    img: "/products/spoon-maple-1.png",
    colors: [],
    sizes: [],
    editorial: [
      {
        img: "/products/spoon-maple-1.png",
        title: "MAPLE SPOON NO.01",
        caption:
          "Shaped from a single block of maple, this spoon is the result of careful hand-carving — a form that balances utility with quiet beauty.",
      },
      {
        img: "/products/spoon-maple-group.png",
        caption:
          "The deep, rounded bowl carries broth or grain with ease. The squared handle — slightly tapered — provides a natural grip that settles into the hand without effort.",
      },
      {
        img: "/products/spoon-maple-detail.jpg",
        caption:
          "Maple's tight grain and moderate hardness make it well-suited for daily use at the table. A food-safe finish seals the surface while preserving the wood's warm, pale tone.",
      },
      {
        img: "/products/spoon-maple-lifestyle.jpg",
        caption:
          "Each piece carries slight variations in grain and proportion — the mark of something made entirely by hand. Over time, the spoon deepens in character with every use.",
      },
    ],
    spec: {
      capacity: "—",
      material: "Solid Maple",
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
    slug: "wood-leather-clip-no-01",
    name: "Wood & Leather Clip",
    displayName: "Wood & Leather Clip No.01",
    collection: "Clip",
    sku: "C0011",
    price: "CA$86",
    description:
      "Two pieces of turned wood held together by a loop of vegetable-tanned leather — a clip that works through tension alone, no springs or hardware.",
    material: "Turned wood, vegetable-tanned leather",
    dimensions: "Approx. 22 cm length",
    care: "Keep dry. Condition leather occasionally with a small amount of natural wax or leather balm.",
    img: "/products/clip-wood-1.png",
    colors: [],
    sizes: [],
    editorial: [
      {
        img: "/products/clip-wood-1.png",
        title: "WOOD & LEATHER CLIP NO.01",
        caption:
          "Two turned wooden forms, bound by a single loop of vegetable-tanned leather. The clip holds by tension — no metal, no spring, no mechanism beyond the material itself.",
      },
      {
        img: "/products/clip-wood-detail1.jpg",
        caption:
          "The upper piece tapers to a rounded finial; the lower spreads into a broad, weighted form. Together they create a natural pivot, closing with quiet certainty around whatever they hold.",
      },
      {
        img: "/products/clip-wood-detail2.jpg",
        caption:
          "The leather band is hand-cut and stitched at a single point — enough to hold the pair together while allowing the tension to distribute evenly across both arms.",
      },
      {
        img: "/products/clip-wood-lifestyle1.jpg",
        caption:
          "At home on a kitchen shelf, a studio table, or beside a writing desk. It holds bags sealed, papers gathered, or simply rests as an object worth looking at.",
      },
    ],
    spec: {
      capacity: "—",
      material: "Turned wood, vegetable-tanned leather",
      finish: "Natural oil finish",
      dimension:
        "Each piece is individually handcrafted. Dimensions may vary slightly due to the natural characteristics of wood and the making process.",
    },
    careGuide: "",
    careRows: [
      { label: "Wood",    value: "Wipe clean with a dry cloth. Avoid prolonged exposure to moisture." },
      { label: "Leather", value: "Condition occasionally with a small amount of natural wax or leather balm to maintain suppleness." },
      { label: "Storage", value: "Store in a dry place away from direct sunlight. Do not submerge in water." },
      { label: "Note",    value: "Slight differences may occur being handmade. Color and grain of natural wood varies in each item." },
    ],
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
    colors: [],
    sizes: ["M — Approx. 110 ml", "L — Approx. 140 ml"],
    sizePrices: ["CA$148", "CA$148"],
    editorial: [
      {
        img: "/hero/head1.jpg",
        title: "CURLY MAPLE CUP",
        caption:
          "Curly maple catches light in a way few other woods do — a rippling, three-dimensional shimmer that shifts as you move the cup. It is quiet and beautiful in the same motion.",
      },
      {
        img: "/hero/head3.jpg",
        caption:
          "At 140 ml, this is the smallest cup in the collection. It is designed for intention: a single espresso, a concentrated pour, a ritual that fits into a moment rather than filling it.",
      },
      {
        img: "/hero/head4.jpg",
        caption:
          "The food-safe finish preserves the maple's natural brightness — a pale, almost luminous tone that contrasts gently with the chatoyant figure running through the grain.",
      },
      {
        img: "/hero/head2.png",
        caption:
          "Lighter than olivewood, warmer than birch — curly maple occupies a quiet middle place. Over time it becomes softer in tone, the shimmer settling into something more familiar.",
      },
    ],
    spec: {
      capacity: "Approx. 140ml",
      material: "Curly maple",
      finish: "Food-safe protective coating",
      dimension: "Each piece is individually handcrafted. Dimensions may vary slightly.",
    },
    careGuide: "",
    careRows: [
      { label: "Wash",    value: "Do not use in a dishwasher. Wash with care. Do not use abrasive cleansers or steel wool." },
      { label: "Drying",  value: "Wipe off water soon after washing." },
      { label: "Storage", value: "Do not soak in water for long periods. Do not place near open flames. Avoid direct sunlight — dry well after use and store in a dry place." },
      { label: "Note",    value: "Slight differences may occur being handmade. Color and grain of natural wood varies in each item." },
    ],
  },
]
