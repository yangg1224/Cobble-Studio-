"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "fr" | "zh" | "ja"

export interface Translations {
  // ── HEADER ──
  nav: { shop: string; journal: string; about: string; contact: string; shopByCollection: string }
  banner: string
  search: string
  myAccount: string
  signOut: string

  // ── COMMON ──
  viewMore: string
  viewAll: string
  shopNow: string
  continueShopping: string
  optional: string
  free: string
  and: string

  // ── HERO CAROUSEL ──
  hero: { newArrivals: string }

  // ── PRODUCTS SCROLL ──
  productsSection: { title: string; viewAll: string }

  // ── HOME PAGE ──
  home: { journalTitle: string; videoQuote: string; videoQuoteLine2: string; aboutUs: string }

  // ── ABOUT PAGE ──
  about: {
    heroQuote: string
    ourStory: string
    storyBody: string[]
    cobbleNameDesc: string
    cobbleWorkDesc: string
    ourProducts: string
    productEssence: string
    productStory: string
    productStoryDesc: string
    essenceSections: { title: string; body: string }[]
    productCards: { label: string; desc: string }[]
    journalCategories: string[]
  }

  // ── CONTACT PAGE ──
  contact: {
    title: string
    intro1: string
    intro2: string
    contactFormBtn: string
    instagram: string
    customerService: string
    collaboration: string
    collaborationDesc: string
    locationsTitle: string
    locationsDesc: string
    retailerLabel: string
    retailerName: string
    retailerAddress: string
    visitUsTitle: string
    visitUsDesc: string
    studioLabel: string
    studioAddress: string
    getDirections: string
    mapTitle: string
    sendMessage: string
    nameLbl: string
    namePlaceholder: string
    emailLbl: string
    messageLbl: string
    messagePlaceholder: string
    sendBtn: string
  }

  // ── JOURNAL PAGE ──
  journal: {
    title: string
    subtitle: string
    catAll: string
    catCraft: string
    catProcess: string
    catMaterial: string
    catStory: string
    catStudioNote: string
    noStories: string
  }

  // ── COLLECTIONS PAGE ──
  collections: { allCollections: string }

  // ── FOOTER ──
  footer: {
    tagline: string
    shopTitle: string
    shopLinks: string[]
    aboutTitle: string
    aboutLinks: string[]
    supportTitle: string
    supportLinks: string[]
    newsletterTitle: string
    newsletterDesc: string
    emailPlaceholder: string
    joinBtn: string
    copyright: string
    privacyPolicy: string
    termsOfUse: string
  }

  // ── CART ──
  cart: {
    title: string
    emptyTitle: string
    emptyDesc: string
    colProduct: string
    colQty: string
    colPrice: string
    colorLbl: string
    sizeLbl: string
    clearCart: string
    orderSummary: string
    subtotal: string
    shipping: string
    addMoreForFreeShipping: string
    total: string
    proceedToCheckout: string
    continueShopping: string
    trustSignals: string[]
  }

  // ── CHECKOUT ──
  checkout: {
    stepCart: string
    stepShipping: string
    sectionContact: string
    sectionShipping: string
    sectionEngraving: string
    engravingDesc: string
    textToEngrave: string
    engravingInputPlaceholder: string
    placementLbl: string
    placementPlaceholder: string
    engravingNote: string
    deliveryHeading: string
    deliveryBody: string
    orderNotesLbl: string
    orderNotesPlaceholder: string
    paymentTitle: string
    paymentBodyPrefix: string
    paymentBodySuffix: string
    placeOrder: string
    placingOrder: string
    termsText: string
    termsLink: string
    privacyLink: string
    orderSummary: string
    subtotal: string
    shipping: string
    engravingLbl: string
    total: string
    dueETransfer: string
    trustSignals: string[]
    emptyTitle: string
    orderReceived: string
    thankYouPrefix: string
    orderConfirmedPrefix: string
    orderConfirmedSuffix: string
    whatHappensNext: string
    nextSteps: { heading: string; copy: string }[]
    firstName: string
    lastName: string
    emailLbl: string
    phoneLbl: string
    address1: string
    address2: string
    cityLbl: string
    provinceLbl: string
    postalCode: string
    countryLbl: string
    optional: string
    required: string
    enterValidEmail: string
    pleaseEnterEngraving: string
    characters: string
  }

  // ── DASHBOARD ──
  dashboard: {
    memberSince: string
    signOut: string
    sections: { overview: string; orders: string; saved: string; profile: string; addresses: string }
    eyebrow: string
    welcomeBack: string
    recentOrderText: string
    noOrdersText: string
    mostRecentOrder: string
    allOrders: string
    noOrdersYet: string
    browseShop: string
    savedPieces: string
    viewAll: string
    noSavedPiecesOverview: string
    orderLabel: string
    placedLabel: string
    totalLabel: string
    viewOrder: string
    ordersTitle: string
    ordersSub: string
    noOrdersPlaced: string
    piece: string
    pieces: string
    close: string
    details: string
    orderTotal: string
    engraving: string
    shipTo: string
    viewInvoice: string
    buyAgain: string
    orderStages: { ordered: string; workshop: string; shipped: string; delivered: string }
    savedTitle: string
    savedSub: string
    noSavedPieces: string
    browseShopArrow: string
    removeFromSaved: string
    profileTitle: string
    profileSub: string
    loginDetails: string
    fullNameLabel: string
    emailLabel: string
    passwordLabel: string
    lastChanged: string
    studioNotes: string
    prefNewPieces: string
    prefNewPiecesHint: string
    prefJournal: string
    prefJournalHint: string
    prefSMS: string
    prefSMSHint: string
    saveChanges: string
    cancel: string
    addressesTitle: string
    addressesSub: string
    defaultLabel: string
    edit: string
    remove: string
    setAsDefault: string
    addAddress: string
    editAddress: string
    addressLabelField: string
    addressLine1: string
    addressLine2: string
    cityLabel: string
    stateLabel: string
    postalLabel: string
    countryLabel: string
    phoneLabel: string
    setAsDefaultOnSave: string
    saving: string
  }

  // ── PRODUCT PAGE ──
  productPage: {
    home: string
    shop: string
    collectionBadge: string
    uniqueGrain: string
    productDetail: string
    specification: string
    careGuide: string
    capacity: string
    material: string
    finish: string
    dimension: string
    features: string[]
    shippingInfo: string
    relatedProducts: string
    quickAdd: string
    newBadge: string
  }

  // ── PRODUCT PURCHASE ──
  productPurchase: {
    quantity: string
    color: string
    size: string
    addToCart: string
    added: string
    save: string
    saved: string
    viewCart: string
  }

  // ── JOURNAL ARTICLES ──
  journalContent: {
    backToJournal: string
    brandStoryBreadcrumb: string
    minRead: string
    brandStory: {
      poem: string
      poemLines: string[]
      attribution: string
      caption1: string
      caption2: string
    }
    posts: Record<string, { category: string; title: string; body: string[] }>
  }

  // ── ACCOUNT ──
  account: {
    sectionLabel: string
    welcomeBack: string
    createAccount: string
    signInDesc: string
    registerDesc: string
    signInTab: string
    registerTab: string
    fullNameLbl: string
    emailLbl: string
    passwordLbl: string
    confirmPasswordLbl: string
    rememberMe: string
    forgotPassword: string
    signingIn: string
    creatingAccount: string
    signInBtn: string
    createAccountBtn: string
    newToCobble: string
    alreadyHaveAccount: string
    createAccountLink: string
    signInLink: string
    termsText: string
    imageQuote: string
    checkEmailTitle: string
    checkEmailDescPrefix: string
    checkEmailDescSuffix: string
    resendEmail: string
    backToSignIn: string
    linkResent: string
    fullNamePlaceholder: string
    emailPlaceholder: string
    passwordPlaceholder: string
    passwordsMustMatch: string
    passwordTooShort: string
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────

const en: Translations = {
  nav: { shop: "Shop", journal: "Journal", about: "About", contact: "Contact", shopByCollection: "• Shop by Collection" },
  banner: "Enjoy free shipping on orders of $100 or more.",
  search: "Search",
  myAccount: "My Account",
  signOut: "Sign Out",

  viewMore: "View More",
  viewAll: "View All",
  shopNow: "Shop Now",
  continueShopping: "Continue Shopping",
  optional: "optional",
  free: "Free",
  and: "and",

  hero: { newArrivals: "New Arrivals" },

  productsSection: { title: "Products", viewAll: "View All" },

  home: {
    journalTitle: "Journal",
    videoQuote: "Let your day be filled with",
    videoQuoteLine2: "what inspires you.",
    aboutUs: "About Us",
  },

  about: {
    heroQuote: "\"Observe. Reflect. Let it become.\"",
    ourStory: "Our Story",
    storyBody: [
      "C O B B L E is a woodworking brand based in Toronto, Canada. The studio creates handcrafted objects that explore the relationship between everyday use, materiality, and quiet living.",
      "Each piece is made from solid wood, preserving the natural grain and tactile quality of the material. The design is simple and functional, focused on long-term use.",
      "Our goal is to make objects that are not only beautiful, but meant to be used and lived with.",
      "Over time, the wood will evolve, developing a unique character with use — a natural part of what makes each piece yours.",
    ],
    cobbleNameDesc: "is the name of my studio. Like stones once edged and irregular, gradually shaped by nature over time, each piece emerges in its own distinct form.",
    cobbleWorkDesc: "The current body of work explores everyday objects—developed across five series: mugs, scoops, spoons, clips, and plates.",
    ourProducts: "Our Products",
    productEssence: "Product Essence",
    productStory: "Product Story",
    productStoryDesc: "Find out about the story and ideas behind our products through interviews.",
    essenceSections: [
      { title: "Nature", body: "Every piece carries the unique marks of the tree it came from. Grain patterns, tones, and textures vary naturally, making each object one of a kind." },
      { title: "Craft", body: "Designed and finished by hand, each object reflects careful attention to proportion, touch, and detail." },
      { title: "Touch", body: "Wood invites interaction. Its warmth and weight sit comfortably in the hand, asking to be held and used daily." },
      { title: "Patina", body: "Objects become more meaningful through use. Over time, wood develops richer tones and subtle traces of everyday life." },
      { title: "Ritual", body: "We believe everyday moments deserve attention. Whether enjoying a morning coffee or an afternoon tea, the right object makes the ritual complete." },
    ],
    productCards: [
      { label: "MUG",   desc: "A wooden object that celebrates the warmth and character of natural timber" },
      { label: "SCOOP", desc: "A handcrafted scoop designed for measuring coffee with ease and precision" },
      { label: "PLATE", desc: "Crafted to reveal the beauty of wood and handwork" },
    ],
    journalCategories: ["BRAND STORY", "COMMUNITY", "BUSINESS", "MATERIAL"],
  },

  contact: {
    title: "CONTACT",
    intro1: "We'd love to hear from you.",
    intro2: "For product inquiries, collaborations, press requests, or general questions, please get in touch.",
    contactFormBtn: "CONTACT FORM",
    instagram: "INSTAGRAM",
    customerService: "CUSTOMER SERVICE",
    collaboration: "COLLABORATION",
    collaborationDesc: "For creative partnerships and collaborations",
    locationsTitle: "LOCATIONS",
    locationsDesc: "Discover COBBLE through a curated selection of cafés, tea houses, and independent retailers.",
    retailerLabel: "RETAILER",
    retailerName: "MIKA Gift Shop — Toronto",
    retailerAddress: "496 College Street, Toronto, Ontario",
    visitUsTitle: "VISIT US",
    visitUsDesc: "Our studio is where ideas take shape and objects come to life. We look forward to welcoming visitors for studio visits, workshops, and shared moments centered around craftsmanship and everyday rituals.",
    studioLabel: "STUDIO",
    studioAddress: "380 Alliance Ave, Toronto, Ontario",
    getDirections: "GET DIRECTIONS",
    mapTitle: "Map showing Cobble Studio at 380 Alliance Ave, Toronto, Ontario",
    sendMessage: "SEND A MESSAGE",
    nameLbl: "Name",
    namePlaceholder: "Your name",
    emailLbl: "Email",
    messageLbl: "Message",
    messagePlaceholder: "How can we help?",
    sendBtn: "SEND",
  },

  journal: {
    title: "Journal",
    subtitle: "Stories that enrich the senses,\ninspiring daily life with comfort and intention.",
    catAll: "All",
    catCraft: "Craft",
    catProcess: "Process",
    catMaterial: "Material",
    catStory: "Story",
    catStudioNote: "Studio Note",
    noStories: "No stories in this category yet.",
  },

  collections: { allCollections: "All Collections" },

  footer: {
    tagline: "Handcrafted wooden objects made with intention. Every piece is one of a kind.",
    shopTitle: "Shop",
    shopLinks: ["Cups & Mugs", "Trays & Boards", "Spoons", "New Arrivals", "Gift Ideas"],
    aboutTitle: "About",
    aboutLinks: ["Our Story", "The Craft", "Journal", "Sustainability"],
    supportTitle: "Support",
    supportLinks: ["FAQ", "Shipping & Returns", "Product Care", "Contact Us"],
    newsletterTitle: "Newsletter",
    newsletterDesc: "Stay in the loop — new pieces, stories, and studio notes delivered to your inbox.",
    emailPlaceholder: "Your email",
    joinBtn: "Join",
    copyright: "© 2026 Cobble Canada Inc.",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
  },

  cart: {
    title: "Your Cart",
    emptyTitle: "Your cart is empty",
    emptyDesc: "Explore our handcrafted collections and find something you love.",
    colProduct: "Product",
    colQty: "Qty",
    colPrice: "Price",
    colorLbl: "Color:",
    sizeLbl: "Size:",
    clearCart: "Clear cart",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    addMoreForFreeShipping: "Add {0} more for free shipping",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    continueShopping: "Continue Shopping",
    trustSignals: ["Free shipping on orders over CA$100", "Made in Canada", "Secure checkout"],
  },

  checkout: {
    stepCart: "Cart",
    stepShipping: "Shipping",
    sectionContact: "Contact",
    sectionShipping: "Shipping Address",
    sectionEngraving: "Personal Engraving",
    engravingDesc: "Add a name, date, or short phrase hand-carved into your piece.",
    textToEngrave: "Text to Engrave",
    engravingInputPlaceholder: "e.g. For Sarah, with love — June 2025",
    placementLbl: "Placement",
    placementPlaceholder: "e.g. bottom of the piece, inside rim…",
    engravingNote: "Our Brand Director will confirm your engraving details over email before we begin. Final placement and font style will be agreed upon together.",
    deliveryHeading: "Handmade with care — delivered in about 1 week",
    deliveryBody: "Every Cobble piece is shaped entirely by hand in our Canadian studio. Because your order is made specifically for you, please allow 5–7 business days for crafting before it ships. Quality is our first principle — we won't send a piece that isn't ready.",
    orderNotesLbl: "Order Notes",
    orderNotesPlaceholder: "Gift messages, delivery instructions, or anything else…",
    paymentTitle: "Payment via e-transfer",
    paymentBodyPrefix: "No payment is collected today. After you place your order, our Brand Director will personally reach out to you at",
    paymentBodySuffix: "with e-transfer instructions and to confirm all the details of your piece.",
    placeOrder: "Place Order",
    placingOrder: "Placing Order…",
    termsText: "By placing your order you agree to our",
    termsLink: "Terms",
    privacyLink: "Privacy Policy",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    engravingLbl: "Engraving",
    total: "Total",
    dueETransfer: "Due via e-transfer after your order is confirmed.",
    trustSignals: [
      "Every piece made by hand in Canada",
      "Brand Director connects with you personally",
      "Payment only after order is confirmed",
      "Quality-inspected before it leaves our studio",
    ],
    emptyTitle: "Your cart is empty",
    orderReceived: "Order Received",
    thankYouPrefix: "Thank you,",
    orderConfirmedPrefix: "Your order",
    orderConfirmedSuffix: "is confirmed. We've noted your shipping address and any engraving details.",
    whatHappensNext: "What happens next",
    nextSteps: [
      { heading: "Our Brand Director will reach out", copy: "Expect a personal email at {0} within 1 business day. They'll confirm your order details, answer any questions, and send your e-transfer payment instructions." },
      { heading: "Payment via e-transfer", copy: "Your order total is {1}. Once your e-transfer is received, we'll begin crafting your piece immediately." },
      { heading: "Handcrafted to your order", copy: "Every Cobble piece is made by hand in our Canadian studio. Quality is our first principle — crafting takes 5–7 business days." },
      { heading: "Tracked delivery", copy: "Your order ships with full tracking. Estimated arrival: within 1 week of shipping." },
    ],
    firstName: "First Name",
    lastName: "Last Name",
    emailLbl: "Email",
    phoneLbl: "Phone",
    address1: "Address",
    address2: "Apt / Suite",
    cityLbl: "City",
    provinceLbl: "Province / State",
    postalCode: "Postal / ZIP Code",
    countryLbl: "Country",
    optional: "optional",
    required: "Required",
    enterValidEmail: "Enter a valid email",
    pleaseEnterEngraving: "Please enter the text to engrave",
    characters: "characters",
  },

  dashboard: {
    memberSince: "Member since",
    signOut: "Sign out",
    sections: { overview: "Overview", orders: "Orders", saved: "Saved", profile: "Profile", addresses: "Addresses" },
    eyebrow: "Account",
    welcomeBack: "Welcome back,",
    recentOrderText: "Your most recent piece is below. Take your time — good things are slow.",
    noOrdersText: "Your workshop is quiet for now. Browse the shop when you're ready.",
    mostRecentOrder: "Most recent order",
    allOrders: "All orders",
    noOrdersYet: "No orders yet. Your commissions will appear here.",
    browseShop: "Browse the shop",
    savedPieces: "Saved pieces",
    viewAll: "View all",
    noSavedPiecesOverview: "No saved pieces yet — browse the shop to start saving.",
    orderLabel: "Order",
    placedLabel: "Placed",
    totalLabel: "Total",
    viewOrder: "View order",
    ordersTitle: "Orders",
    ordersSub: "A record of every piece you've commissioned, from the bench to your hands.",
    noOrdersPlaced: "You haven't placed any orders yet.",
    piece: "piece",
    pieces: "pieces",
    close: "Close",
    details: "Details",
    orderTotal: "Order total",
    engraving: "Engraving",
    shipTo: "Ship to",
    viewInvoice: "View invoice",
    buyAgain: "Buy again",
    orderStages: { ordered: "Ordered", workshop: "In the workshop", shipped: "Shipped", delivered: "Delivered" },
    savedTitle: "Saved pieces",
    savedSub: "Pieces you're keeping an eye on. Each is one of a kind — when it's gone, it's gone.",
    noSavedPieces: "No saved pieces yet.",
    browseShopArrow: "Browse the shop →",
    removeFromSaved: "Remove from saved",
    profileTitle: "Profile",
    profileSub: "Your details and how we reach you. We write seldom, and only about the work.",
    loginDetails: "Login details",
    fullNameLabel: "Full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    lastChanged: "Last changed 4 months ago.",
    studioNotes: "Studio notes",
    prefNewPieces: "New pieces & restocks",
    prefNewPiecesHint: "A quiet note when fresh work lands.",
    prefJournal: "Journal & studio stories",
    prefJournalHint: "Long-form notes from the bench.",
    prefSMS: "Order updates by SMS",
    prefSMSHint: "Texts about your commissions.",
    saveChanges: "Save changes",
    cancel: "Cancel",
    addressesTitle: "Addresses",
    addressesSub: "Where your pieces travel to. We pack each by hand in recycled wool and paper.",
    defaultLabel: "Default",
    edit: "Edit",
    remove: "Remove",
    setAsDefault: "Set as default",
    addAddress: "Add address",
    editAddress: "Edit address",
    addressLabelField: "Label",
    addressLine1: "Address line 1",
    addressLine2: "Address line 2 (optional)",
    cityLabel: "City",
    stateLabel: "Province / State",
    postalLabel: "Postal code",
    countryLabel: "Country",
    phoneLabel: "Phone (optional)",
    setAsDefaultOnSave: "Set as default address",
    saving: "Saving…",
  },

  productPage: {
    home: "Home",
    shop: "Shop",
    collectionBadge: "Collection",
    uniqueGrain: "Each piece carries the grain and small irregularities of the wood it came from — no two are alike.",
    productDetail: "Product Detail",
    specification: "Specification",
    careGuide: "Care Guide",
    capacity: "Capacity",
    material: "Material",
    finish: "Finish",
    dimension: "Dimension",
    features: ["Free shipping over $100", "Made in Canada", "One of a kind — ships in 3–5 days"],
    shippingInfo: "Shipping Information",
    relatedProducts: "Complete Your Experience",
    quickAdd: "Quick Add",
    newBadge: "New",
  },

  productPurchase: {
    quantity: "Quantity",
    color: "Color",
    size: "Size",
    addToCart: "Add to Cart",
    added: "Added ✓",
    save: "Save",
    saved: "Saved ♥",
    viewCart: "View cart →",
  },

  journalContent: {
    backToJournal: "← Back to Journal",
    brandStoryBreadcrumb: "Brand Story",
    minRead: "min read",
    brandStory: {
      poem: "Time that has passed ultimately takes form as a wooden object.",
      poemLines: ["Born of wood", "Shaped into vessel", "Refined through use"],
      attribution: "Beginning on October 1, 2025, this work took one month to complete—carried out independently from design to realization, with occasional support from friends along the way.",
      caption1: "From here, my creative journey in Toronto, Canada began— in the company of wood, moving quietly alongside music.",
      caption2: "This process mirrors the making of the work—a continuous cycle of observing, carving, and refining. Time gradually fades from awareness. At times, I come back to myself to find the music has stopped—and an hour has already passed.",
    },
    posts: {
      "the-craft-behind-the-cup": {
        category: "Craft",
        title: "The Craft Behind the Cup",
        body: [
          "Each cup begins as a rough block — walnut, cherry, or maple — chosen for density and the quiet character of its grain. There is no shortcut through this part of the process. The block must be evaluated, turned in the hands, understood.",
          "The first cuts are the most uncertain. A gouge starts the hollow, and from that moment the cup begins to reveal itself. The walls thin gradually. Too fast and the wood splits; too slow and the rhythm breaks. Working with wood means working with its nature, not against it.",
          "The final form emerges not from a drawing but from conversation — between the maker and the material. Each cup is one of a kind because the wood insists on it.",
        ],
      },
      "from-wood-to-hand": {
        category: "Process",
        title: "From Wood to Hand — Inside the Workshop",
        body: [
          "The workshop is quiet in the mornings. Light comes in low across the workbench, catching the fine dust left from the day before. This is when the work is clearest — before the noise of decisions, before the phone.",
          "A morning session might produce nothing more than a well-prepared blank, or a single curve resolved after hours of small adjustments. Progress in woodworking is rarely linear. Some days the chisel finds the right angle on the first pass. Other days it takes most of the morning.",
          "What stays constant is the rhythm: hold, listen, cut, assess. The hand learns something new each time it touches the wood, and that learning carries forward into every piece that follows.",
        ],
      },
      "light-and-shadow": {
        category: "Story",
        title: "Light & Shadow — Objects at Rest",
        body: [
          "An object at rest is not passive. It accumulates light in its grain, holds shadow in its curves, and keeps the mark of its making in places that only close attention finds.",
          "A cup sitting on a windowsill in the afternoon is the same cup that was held at breakfast — but it is also something else. The light changes what we see, and in changing what we see, it changes how we remember using it.",
          "This is what wooden objects do over time. They do not age so much as deepen. The grain that seemed plain in the workshop becomes luminous after years of handling. The finish softens. The object becomes more fully itself.",
        ],
      },
    },
  },

  account: {
    sectionLabel: "Account",
    welcomeBack: "Welcome back",
    createAccount: "Create an account",
    signInDesc: "Sign in to view your orders and saved pieces.",
    registerDesc: "Join Cobble for order history, saved pieces, and studio notes.",
    signInTab: "Sign In",
    registerTab: "Register",
    fullNameLbl: "Full Name",
    emailLbl: "Email",
    passwordLbl: "Password",
    confirmPasswordLbl: "Confirm Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signingIn: "Signing in…",
    creatingAccount: "Creating account…",
    signInBtn: "Sign In",
    createAccountBtn: "Create Account",
    newToCobble: "New to Cobble? ",
    alreadyHaveAccount: "Already have an account? ",
    createAccountLink: "Create an account",
    signInLink: "Sign in",
    termsText: "By creating an account you agree to our Terms of Use and Privacy Policy.",
    imageQuote: "Every piece is one of a kind — and so is the hand it's made for.",
    checkEmailTitle: "Check your email",
    checkEmailDescPrefix: "We sent a confirmation link to",
    checkEmailDescSuffix: "Click the link to activate your account.",
    resendEmail: "Resend email",
    backToSignIn: "← Back to sign in",
    linkResent: "A new link has been sent.",
    fullNamePlaceholder: "Jane Maker",
    emailPlaceholder: "you@email.com",
    passwordPlaceholder: "••••••••",
    passwordsMustMatch: "Passwords do not match.",
    passwordTooShort: "Password must be at least 6 characters.",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// FRENCH
// ─────────────────────────────────────────────────────────────────────────────
const fr: Translations = {
  nav: { shop: "Boutique", journal: "Journal", about: "À Propos", contact: "Contact", shopByCollection: "• Acheter par Collection" },
  banner: "Livraison gratuite pour toute commande de 100 $ ou plus.",
  search: "Rechercher",
  myAccount: "Mon Compte",
  signOut: "Déconnexion",

  viewMore: "Voir Plus",
  viewAll: "Tout Voir",
  shopNow: "Acheter",
  continueShopping: "Continuer mes Achats",
  optional: "facultatif",
  free: "Gratuit",
  and: "et",

  hero: { newArrivals: "Nouveautés" },

  productsSection: { title: "Produits", viewAll: "Tout Voir" },

  home: {
    journalTitle: "Journal",
    videoQuote: "Que votre journée soit remplie de",
    videoQuoteLine2: "ce qui vous inspire.",
    aboutUs: "À Propos",
  },

  about: {
    heroQuote: "« Observer. Réfléchir. Laisser émerger. »",
    ourStory: "Notre Histoire",
    storyBody: [
      "C O B B L E est une marque de menuiserie basée à Toronto, au Canada. Le studio crée des objets artisanaux qui explorent la relation entre l'usage quotidien, la matérialité et la vie paisible.",
      "Chaque pièce est fabriquée en bois massif, préservant le grain naturel et la qualité tactile du matériau. Le design est simple et fonctionnel, axé sur une utilisation à long terme.",
      "Notre objectif est de créer des objets non seulement beaux, mais destinés à être utilisés et vécus au quotidien.",
      "Avec le temps, le bois évoluera, développant un caractère unique par l'usage — une partie naturelle de ce qui rend chaque pièce la vôtre.",
    ],
    cobbleNameDesc: "est le nom de mon studio. Comme des pierres autrefois irrégulières, façonnées peu à peu par la nature, chaque pièce émerge sous sa propre forme distincte.",
    cobbleWorkDesc: "Le corpus actuel explore des objets du quotidien — développés en cinq séries : mugs, cuillers doseuses, cuillères, agrafes et assiettes.",
    ourProducts: "Nos Produits",
    productEssence: "L'Essence du Produit",
    productStory: "Histoire du Produit",
    productStoryDesc: "Découvrez l'histoire et les idées derrière nos produits à travers des entretiens.",
    essenceSections: [
      { title: "Nature", body: "Chaque pièce porte les marques uniques de l'arbre dont elle provient. Les motifs de grain, les tons et les textures varient naturellement, rendant chaque objet unique en son genre." },
      { title: "Artisanat", body: "Conçu et fini à la main, chaque objet reflète une attention méticuleuse à la proportion, au toucher et au détail." },
      { title: "Toucher", body: "Le bois invite à l'interaction. Sa chaleur et son poids reposent confortablement dans la main, invitant à être tenu et utilisé quotidiennement." },
      { title: "Patine", body: "Les objets prennent plus de sens avec l'usage. Avec le temps, le bois développe des tons plus riches et de subtiles traces de la vie quotidienne." },
      { title: "Rituel", body: "Nous croyons que les moments du quotidien méritent attention. Que vous savouriez un café du matin ou un thé de l'après-midi, l'objet juste complète le rituel." },
    ],
    productCards: [
      { label: "MUG",        desc: "Un objet en bois qui célèbre la chaleur et le caractère du bois naturel" },
      { label: "CUILLER",    desc: "Une cuiller artisanale conçue pour doser le café avec précision" },
      { label: "ASSIETTE",   desc: "Fabriqué pour révéler la beauté du bois et du travail main" },
    ],
    journalCategories: ["HISTOIRE DE MARQUE", "COMMUNAUTÉ", "AFFAIRES", "MATÉRIAUX"],
  },

  contact: {
    title: "CONTACT",
    intro1: "Nous serions ravis de vous entendre.",
    intro2: "Pour toute demande de renseignements sur les produits, les collaborations, la presse ou toute autre question, n'hésitez pas à nous contacter.",
    contactFormBtn: "FORMULAIRE DE CONTACT",
    instagram: "INSTAGRAM",
    customerService: "SERVICE CLIENT",
    collaboration: "COLLABORATION",
    collaborationDesc: "Pour les partenariats créatifs et collaborations",
    locationsTitle: "EMPLACEMENTS",
    locationsDesc: "Découvrez COBBLE dans une sélection de cafés, maisons de thé et détaillants indépendants.",
    retailerLabel: "DÉTAILLANT",
    retailerName: "MIKA Gift Shop — Toronto",
    retailerAddress: "496 College Street, Toronto, Ontario",
    visitUsTitle: "NOUS RENDRE VISITE",
    visitUsDesc: "Notre studio est l'endroit où les idées prennent forme et les objets prennent vie. Nous accueillons volontiers les visiteurs pour des visites d'atelier, des ateliers pratiques et des moments partagés autour de l'artisanat et des rituels quotidiens.",
    studioLabel: "STUDIO",
    studioAddress: "380 Alliance Ave, Toronto, Ontario",
    getDirections: "ITINÉRAIRE",
    mapTitle: "Carte indiquant Cobble Studio au 380 Alliance Ave, Toronto, Ontario",
    sendMessage: "ENVOYER UN MESSAGE",
    nameLbl: "Nom",
    namePlaceholder: "Votre nom",
    emailLbl: "Courriel",
    messageLbl: "Message",
    messagePlaceholder: "Comment pouvons-nous vous aider ?",
    sendBtn: "ENVOYER",
  },

  journal: {
    title: "Journal",
    subtitle: "Des histoires qui enrichissent les sens,\ninspirer la vie quotidienne avec confort et intention.",
    catAll: "Tout",
    catCraft: "Artisanat",
    catProcess: "Processus",
    catMaterial: "Matériaux",
    catStory: "Histoire",
    catStudioNote: "Note de Studio",
    noStories: "Pas encore d'histoires dans cette catégorie.",
  },

  collections: { allCollections: "Toutes les Collections" },

  footer: {
    tagline: "Objets en bois faits à la main avec intention. Chaque pièce est unique.",
    shopTitle: "Boutique",
    shopLinks: ["Tasses & Mugs", "Plateaux & Planches", "Cuillères", "Nouveautés", "Idées Cadeaux"],
    aboutTitle: "À Propos",
    aboutLinks: ["Notre Histoire", "L'Artisanat", "Journal", "Durabilité"],
    supportTitle: "Support",
    supportLinks: ["FAQ", "Livraison & Retours", "Entretien", "Nous Contacter"],
    newsletterTitle: "Infolettre",
    newsletterDesc: "Restez informé — nouvelles pièces, histoires et notes de studio livrées dans votre boîte de réception.",
    emailPlaceholder: "Votre courriel",
    joinBtn: "S'inscrire",
    copyright: "© 2026 Cobble Canada Inc.",
    privacyPolicy: "Politique de Confidentialité",
    termsOfUse: "Conditions d'Utilisation",
  },

  cart: {
    title: "Votre Panier",
    emptyTitle: "Votre panier est vide",
    emptyDesc: "Explorez nos collections artisanales et trouvez quelque chose que vous aimez.",
    colProduct: "Produit",
    colQty: "Qté",
    colPrice: "Prix",
    colorLbl: "Couleur :",
    sizeLbl: "Taille :",
    clearCart: "Vider le panier",
    orderSummary: "Récapitulatif",
    subtotal: "Sous-total",
    shipping: "Livraison",
    addMoreForFreeShipping: "Ajoutez {0} pour la livraison gratuite",
    total: "Total",
    proceedToCheckout: "Passer à la Caisse",
    continueShopping: "Continuer mes Achats",
    trustSignals: ["Livraison gratuite dès CA$100", "Fabriqué au Canada", "Paiement sécurisé"],
  },

  checkout: {
    stepCart: "Panier",
    stepShipping: "Livraison",
    sectionContact: "Contact",
    sectionShipping: "Adresse de Livraison",
    sectionEngraving: "Gravure Personnelle",
    engravingDesc: "Ajoutez un nom, une date ou une courte phrase gravée à la main dans votre pièce.",
    textToEngrave: "Texte à Graver",
    engravingInputPlaceholder: "ex. Pour Sarah, avec amour — Juin 2025",
    placementLbl: "Emplacement",
    placementPlaceholder: "ex. fond de la pièce, bord intérieur…",
    engravingNote: "Notre Directeur de Marque confirmera les détails de votre gravure par courriel avant de commencer. L'emplacement final et le style de police seront convenus ensemble.",
    deliveryHeading: "Fait à la main avec soin — livré en environ 1 semaine",
    deliveryBody: "Chaque pièce Cobble est façonnée entièrement à la main dans notre studio canadien. Comme votre commande est réalisée spécifiquement pour vous, veuillez prévoir 5 à 7 jours ouvrables pour la fabrication avant l'expédition. La qualité est notre premier principe — nous n'enverrons pas une pièce qui n'est pas prête.",
    orderNotesLbl: "Notes de Commande",
    orderNotesPlaceholder: "Messages cadeaux, instructions de livraison ou autre…",
    paymentTitle: "Paiement par virement",
    paymentBodyPrefix: "Aucun paiement n'est prélevé aujourd'hui. Après votre commande, notre Directeur de Marque vous contactera à",
    paymentBodySuffix: "avec les instructions de virement et pour confirmer tous les détails.",
    placeOrder: "Passer la Commande",
    placingOrder: "Commande en cours…",
    termsText: "En passant votre commande, vous acceptez nos",
    termsLink: "Conditions",
    privacyLink: "Politique de Confidentialité",
    orderSummary: "Récapitulatif",
    subtotal: "Sous-total",
    shipping: "Livraison",
    engravingLbl: "Gravure",
    total: "Total",
    dueETransfer: "Dû par virement après confirmation de votre commande.",
    trustSignals: [
      "Chaque pièce faite à la main au Canada",
      "Le Directeur de Marque vous contacte personnellement",
      "Paiement uniquement après confirmation",
      "Inspectée qualité avant de quitter notre studio",
    ],
    emptyTitle: "Votre panier est vide",
    orderReceived: "Commande Reçue",
    thankYouPrefix: "Merci,",
    orderConfirmedPrefix: "Votre commande",
    orderConfirmedSuffix: "est confirmée. Nous avons noté votre adresse de livraison et les détails de gravure éventuels.",
    whatHappensNext: "Ce qui se passe ensuite",
    nextSteps: [
      { heading: "Notre Directeur de Marque vous contactera", copy: "Attendez un courriel personnel à {0} dans un délai d'un jour ouvrable. Ils confirmeront les détails de votre commande et enverront les instructions de virement." },
      { heading: "Paiement par virement", copy: "Le total de votre commande est de {1}. Dès réception de votre virement, nous commencerons immédiatement à fabriquer votre pièce." },
      { heading: "Fabriqué sur commande", copy: "Chaque pièce Cobble est faite à la main dans notre studio canadien. La fabrication prend 5 à 7 jours ouvrables." },
      { heading: "Livraison avec suivi", copy: "Votre commande est expédiée avec un suivi complet. Arrivée estimée : dans la semaine suivant l'expédition." },
    ],
    firstName: "Prénom",
    lastName: "Nom de famille",
    emailLbl: "Courriel",
    phoneLbl: "Téléphone",
    address1: "Adresse",
    address2: "Apt / Suite",
    cityLbl: "Ville",
    provinceLbl: "Province / État",
    postalCode: "Code Postal / ZIP",
    countryLbl: "Pays",
    optional: "facultatif",
    required: "Requis",
    enterValidEmail: "Entrez un courriel valide",
    pleaseEnterEngraving: "Veuillez entrer le texte à graver",
    characters: "caractères",
  },

  dashboard: {
    memberSince: "Membre depuis",
    signOut: "Déconnexion",
    sections: { overview: "Aperçu", orders: "Commandes", saved: "Sauvegardés", profile: "Profil", addresses: "Adresses" },
    eyebrow: "Compte",
    welcomeBack: "Bon retour,",
    recentOrderText: "Votre pièce la plus récente est ci-dessous. Prenez votre temps — les belles choses sont lentes.",
    noOrdersText: "Votre atelier est calme pour l'instant. Parcourez la boutique quand vous serez prêt.",
    mostRecentOrder: "Commande la plus récente",
    allOrders: "Toutes les commandes",
    noOrdersYet: "Pas encore de commandes. Vos commissions apparaîtront ici.",
    browseShop: "Parcourir la boutique",
    savedPieces: "Pièces sauvegardées",
    viewAll: "Tout voir",
    noSavedPiecesOverview: "Pas encore de pièces sauvegardées — parcourez la boutique pour commencer.",
    orderLabel: "Commande",
    placedLabel: "Passée le",
    totalLabel: "Total",
    viewOrder: "Voir la commande",
    ordersTitle: "Commandes",
    ordersSub: "Un registre de chaque pièce commandée, de l'atelier à vos mains.",
    noOrdersPlaced: "Vous n'avez pas encore passé de commande.",
    piece: "pièce",
    pieces: "pièces",
    close: "Fermer",
    details: "Détails",
    orderTotal: "Total de la commande",
    engraving: "Gravure",
    shipTo: "Livrer à",
    viewInvoice: "Voir la facture",
    buyAgain: "Commander à nouveau",
    orderStages: { ordered: "Commandé", workshop: "En atelier", shipped: "Expédié", delivered: "Livré" },
    savedTitle: "Pièces sauvegardées",
    savedSub: "Les pièces que vous surveillez. Chacune est unique — quand elle est partie, elle est partie.",
    noSavedPieces: "Pas encore de pièces sauvegardées.",
    browseShopArrow: "Parcourir la boutique →",
    removeFromSaved: "Retirer des sauvegardés",
    profileTitle: "Profil",
    profileSub: "Vos coordonnées. Nous écrivons rarement, et seulement sur le travail.",
    loginDetails: "Informations de connexion",
    fullNameLabel: "Nom complet",
    emailLabel: "Courriel",
    passwordLabel: "Mot de passe",
    lastChanged: "Modifié il y a 4 mois.",
    studioNotes: "Notes de studio",
    prefNewPieces: "Nouvelles pièces & réassorts",
    prefNewPiecesHint: "Une note discrète quand de nouvelles pièces arrivent.",
    prefJournal: "Journal & histoires de studio",
    prefJournalHint: "Notes longues depuis l'établi.",
    prefSMS: "Mises à jour par SMS",
    prefSMSHint: "Textos sur vos commissions.",
    saveChanges: "Enregistrer",
    cancel: "Annuler",
    addressesTitle: "Adresses",
    addressesSub: "Où voyagent vos pièces. Nous emballons chacune à la main dans de la laine et du papier recyclés.",
    defaultLabel: "Par défaut",
    edit: "Modifier",
    remove: "Supprimer",
    setAsDefault: "Définir par défaut",
    addAddress: "Ajouter une adresse",
    editAddress: "Modifier l'adresse",
    addressLabelField: "Étiquette",
    addressLine1: "Ligne d'adresse 1",
    addressLine2: "Ligne d'adresse 2 (optionnel)",
    cityLabel: "Ville",
    stateLabel: "Province / État",
    postalLabel: "Code postal",
    countryLabel: "Pays",
    phoneLabel: "Téléphone (optionnel)",
    setAsDefaultOnSave: "Définir comme adresse par défaut",
    saving: "Enregistrement…",
  },

  productPage: {
    home: "Accueil",
    shop: "Boutique",
    collectionBadge: "Collection",
    uniqueGrain: "Chaque pièce porte le grain et les petites irrégularités du bois dont elle est issue — aucune n'est identique.",
    productDetail: "Détail du Produit",
    specification: "Spécification",
    careGuide: "Guide d'entretien",
    capacity: "Capacité",
    material: "Matériau",
    finish: "Finition",
    dimension: "Dimension",
    features: ["Livraison gratuite dès 100 $", "Fabriqué au Canada", "Unique — expédié en 3 à 5 jours"],
    shippingInfo: "Informations de livraison",
    relatedProducts: "Complétez Votre Expérience",
    quickAdd: "Ajout rapide",
    newBadge: "Nouveau",
  },

  productPurchase: {
    quantity: "Quantité",
    color: "Couleur",
    size: "Taille",
    addToCart: "Ajouter au Panier",
    added: "Ajouté ✓",
    save: "Sauvegarder",
    saved: "Sauvegardé ♥",
    viewCart: "Voir le panier →",
  },

  journalContent: {
    backToJournal: "← Retour au Journal",
    brandStoryBreadcrumb: "Histoire de Marque",
    minRead: "min de lecture",
    brandStory: {
      poem: "Le temps qui passe prend finalement forme en un objet de bois.",
      poemLines: ["Né du bois", "Façonné en vessel", "Affiné par l'usage"],
      attribution: "À partir du 1er octobre 2025, ce travail a pris un mois à réaliser — mené de manière indépendante, de la conception à la réalisation, avec le soutien occasionnel d'amis en chemin.",
      caption1: "C'est ici que mon voyage créatif à Toronto, Canada, a commencé — en compagnie du bois, avançant doucement au rythme de la musique.",
      caption2: "Ce processus reflète la réalisation de l'œuvre — un cycle continu d'observation, de taille et d'affinement. Le temps s'efface progressivement de la conscience. Parfois, je reviens à moi pour constater que la musique s'est arrêtée — et qu'une heure s'est déjà écoulée.",
    },
    posts: {
      "the-craft-behind-the-cup": {
        category: "Artisanat",
        title: "L'Artisanat Derrière la Tasse",
        body: [
          "Chaque tasse commence comme un bloc brut — noyer, cerisier ou érable — choisi pour sa densité et le caractère discret de son grain. Il n'y a pas de raccourci dans cette partie du processus. Le bloc doit être évalué, tourné entre les mains, compris.",
          "Les premières coupes sont les plus incertaines. Un gouge commence le creux, et à partir de ce moment la tasse commence à se révéler. Les parois s'amincissent progressivement. Trop vite et le bois se fend ; trop lentement et le rythme se brise. Travailler avec le bois signifie travailler avec sa nature, non contre elle.",
          "La forme finale émerge non pas d'un dessin mais d'une conversation — entre le faiseur et le matériau. Chaque tasse est unique parce que le bois l'exige.",
        ],
      },
      "from-wood-to-hand": {
        category: "Processus",
        title: "Du Bois à la Main — Dans l'Atelier",
        body: [
          "L'atelier est calme le matin. La lumière entre en biais sur l'établi, captant la fine poussière laissée de la veille. C'est quand le travail est le plus clair — avant le bruit des décisions, avant le téléphone.",
          "Une session matinale ne peut produire rien de plus qu'une ébauche bien préparée, ou une seule courbe résolue après des heures de petits ajustements. La progression dans la menuiserie est rarement linéaire. Certains jours, le ciseau trouve le bon angle du premier coup. D'autres jours, cela prend la plupart du matin.",
          "Ce qui reste constant, c'est le rythme : tenir, écouter, couper, évaluer. La main apprend quelque chose de nouveau chaque fois qu'elle touche le bois, et cet apprentissage se répercute dans chaque pièce qui suit.",
        ],
      },
      "light-and-shadow": {
        category: "Histoire",
        title: "Lumière & Ombre — Objets au Repos",
        body: [
          "Un objet au repos n'est pas passif. Il accumule la lumière dans son grain, retient l'ombre dans ses courbes, et garde la marque de sa fabrication dans des endroits que seule une attention proche peut trouver.",
          "Une tasse posée sur un rebord de fenêtre l'après-midi est la même tasse qui était tenue au petit-déjeuner — mais c'est aussi autre chose. La lumière change ce que nous voyons, et en changeant ce que nous voyons, elle change notre façon de nous souvenir de l'avoir utilisée.",
          "C'est ce que font les objets en bois avec le temps. Ils ne vieillissent pas tant qu'ils s'approfondissent. Le grain qui semblait ordinaire dans l'atelier devient lumineux après des années de manipulation. La finition s'adoucit. L'objet devient plus pleinement lui-même.",
        ],
      },
    },
  },

  account: {
    sectionLabel: "Compte",
    welcomeBack: "Bon retour",
    createAccount: "Créer un compte",
    signInDesc: "Connectez-vous pour voir vos commandes et pièces sauvegardées.",
    registerDesc: "Rejoignez Cobble pour l'historique des commandes, les pièces sauvegardées et les notes de studio.",
    signInTab: "Se Connecter",
    registerTab: "S'inscrire",
    fullNameLbl: "Nom complet",
    emailLbl: "Courriel",
    passwordLbl: "Mot de passe",
    confirmPasswordLbl: "Confirmer le mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
    signingIn: "Connexion en cours…",
    creatingAccount: "Création du compte…",
    signInBtn: "Se Connecter",
    createAccountBtn: "Créer un Compte",
    newToCobble: "Nouveau chez Cobble ? ",
    alreadyHaveAccount: "Vous avez déjà un compte ? ",
    createAccountLink: "Créer un compte",
    signInLink: "Se connecter",
    termsText: "En créant un compte, vous acceptez nos Conditions d'Utilisation et Politique de Confidentialité.",
    imageQuote: "Chaque pièce est unique — tout comme la main pour laquelle elle est faite.",
    checkEmailTitle: "Vérifiez votre courriel",
    checkEmailDescPrefix: "Nous avons envoyé un lien de confirmation à",
    checkEmailDescSuffix: "Cliquez sur le lien pour activer votre compte.",
    resendEmail: "Renvoyer le courriel",
    backToSignIn: "← Retour à la connexion",
    linkResent: "Un nouveau lien a été envoyé.",
    fullNamePlaceholder: "Jane Maker",
    emailPlaceholder: "vous@courriel.com",
    passwordPlaceholder: "••••••••",
    passwordsMustMatch: "Les mots de passe ne correspondent pas.",
    passwordTooShort: "Le mot de passe doit comporter au moins 6 caractères.",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// CHINESE (SIMPLIFIED)
// ─────────────────────────────────────────────────────────────────────────────
const zh: Translations = {
  nav: { shop: "商店", journal: "日志", about: "关于我们", contact: "联系我们", shopByCollection: "• 按系列购物" },
  banner: "订单满 $100 享免费配送。",
  search: "搜索",
  myAccount: "我的账户",
  signOut: "退出登录",

  viewMore: "查看更多",
  viewAll: "查看全部",
  shopNow: "立即购买",
  continueShopping: "继续购物",
  optional: "选填",
  free: "免费",
  and: "和",

  hero: { newArrivals: "新品上市" },

  productsSection: { title: "产品", viewAll: "查看全部" },

  home: {
    journalTitle: "日志",
    videoQuote: "让你的每一天充满",
    videoQuoteLine2: "给你灵感的事物。",
    aboutUs: "关于我们",
  },

  about: {
    heroQuote: "「观察。思考。让它成为。」",
    ourStory: "我们的故事",
    storyBody: [
      "C O B B L E 是一个总部位于加拿大多伦多的木工品牌。工作室创作手工艺品，探索日常使用、材料性与安静生活之间的关系。",
      "每件作品均由实木制成，保留了材料的天然纹理和触感。设计简洁实用，专注于长期使用。",
      "我们的目标是制作不仅美观，而且适合日常使用和生活的物品。",
      "随着时间的推移，木材将不断演变，在使用中形成独特的个性——这是使每件作品成为您专属的自然组成部分。",
    ],
    cobbleNameDesc: "是我工作室的名字。就像曾经棱角分明的石块，在岁月中被自然慢慢塑造，每件作品以其独特的形态呈现。",
    cobbleWorkDesc: "目前的创作系列探索日常器物——分为五个系列：马克杯、量勺、汤匙、夹子和盘子。",
    ourProducts: "我们的产品",
    productEssence: "产品精髓",
    productStory: "产品故事",
    productStoryDesc: "通过访谈了解我们产品背后的故事与理念。",
    essenceSections: [
      { title: "自然", body: "每件作品都承载着来源树木的独特印记。纹理、色调和质感自然变化，使每个物件独一无二。" },
      { title: "工艺", body: "手工设计与精细打磨，每件器物都体现了对比例、触感和细节的精心关注。" },
      { title: "触感", body: "木材邀请人们与之互动。它的温度和重量舒适地握在手中，令人想要每天持握和使用。" },
      { title: "包浆", body: "物件在使用中变得更有意义。随着时间流逝，木材发展出更丰富的色调和日常生活的细微痕迹。" },
      { title: "仪式", body: "我们相信日常的时刻值得被珍视。无论是享用清晨咖啡还是午后茶，合适的器物使仪式圆满完整。" },
    ],
    productCards: [
      { label: "马克杯", desc: "一件木质器物，彰显天然木材的温度与个性" },
      { label: "量勺",   desc: "手工制作的量勺，专为精准量取咖啡而设计" },
      { label: "木盘",   desc: "精心打磨，展现木材与手工之美" },
    ],
    journalCategories: ["品牌故事", "社区", "商业", "材料"],
  },

  contact: {
    title: "联系我们",
    intro1: "我们很乐意收到您的来信。",
    intro2: "如有产品咨询、合作意向、媒体请求或一般问题，请随时与我们联系。",
    contactFormBtn: "联系表单",
    instagram: "INSTAGRAM",
    customerService: "客户服务",
    collaboration: "合作",
    collaborationDesc: "创意合作与商业合作",
    locationsTitle: "销售地点",
    locationsDesc: "在精选咖啡馆、茶馆及独立零售商中发现 COBBLE。",
    retailerLabel: "零售商",
    retailerName: "MIKA Gift Shop — Toronto",
    retailerAddress: "496 College Street, Toronto, Ontario",
    visitUsTitle: "参观工作室",
    visitUsDesc: "我们的工作室是创意成形、器物诞生的地方。我们诚挚欢迎访客前来参观、参加工坊，共享以工艺与日常仪式为中心的美好时光。",
    studioLabel: "工作室",
    studioAddress: "380 Alliance Ave, Toronto, Ontario",
    getDirections: "获取路线",
    mapTitle: "显示 Cobble 工作室位于多伦多 380 Alliance Ave 的地图",
    sendMessage: "发送信息",
    nameLbl: "姓名",
    namePlaceholder: "您的姓名",
    emailLbl: "邮箱",
    messageLbl: "留言",
    messagePlaceholder: "我们能如何帮助您？",
    sendBtn: "发送",
  },

  journal: {
    title: "日志",
    subtitle: "丰富感官的故事，\n以舒适与专注启迪日常生活。",
    catAll: "全部",
    catCraft: "工艺",
    catProcess: "过程",
    catMaterial: "材料",
    catStory: "故事",
    catStudioNote: "工作室笔记",
    noStories: "此分类暂无内容。",
  },

  collections: { allCollections: "所有系列" },

  footer: {
    tagline: "用心制作的手工木器。每件均为孤品。",
    shopTitle: "商店",
    shopLinks: ["杯子与马克杯", "托盘与木板", "汤匙", "新品上市", "礼品创意"],
    aboutTitle: "关于",
    aboutLinks: ["我们的故事", "工艺", "日志", "可持续发展"],
    supportTitle: "支持",
    supportLinks: ["常见问题", "配送与退货", "产品护理", "联系我们"],
    newsletterTitle: "订阅通讯",
    newsletterDesc: "保持联系——新品、故事和工作室笔记直达您的邮箱。",
    emailPlaceholder: "您的邮箱",
    joinBtn: "订阅",
    copyright: "© 2026 Cobble Canada Inc.",
    privacyPolicy: "隐私政策",
    termsOfUse: "使用条款",
  },

  cart: {
    title: "购物车",
    emptyTitle: "购物车为空",
    emptyDesc: "探索我们的手工系列，找到您喜欢的作品。",
    colProduct: "产品",
    colQty: "数量",
    colPrice: "价格",
    colorLbl: "颜色：",
    sizeLbl: "尺寸：",
    clearCart: "清空购物车",
    orderSummary: "订单摘要",
    subtotal: "小计",
    shipping: "配送",
    addMoreForFreeShipping: "再加 {0} 即可享受免费配送",
    total: "合计",
    proceedToCheckout: "前往结账",
    continueShopping: "继续购物",
    trustSignals: ["订单满 CA$100 免费配送", "加拿大制造", "安全结账"],
  },

  checkout: {
    stepCart: "购物车",
    stepShipping: "配送",
    sectionContact: "联系信息",
    sectionShipping: "配送地址",
    sectionEngraving: "个性刻字",
    engravingDesc: "在您的作品上手工刻上姓名、日期或短句。",
    textToEngrave: "刻字内容",
    engravingInputPlaceholder: "例：致 Sarah，带着爱——2025年6月",
    placementLbl: "刻字位置",
    placementPlaceholder: "例：作品底部、内缘…",
    engravingNote: "我们的品牌总监将在开始前通过邮件确认刻字细节。最终位置和字体风格将共同商定。",
    deliveryHeading: "精心手作——约一周送达",
    deliveryBody: "每件 Cobble 作品均在我们的加拿大工作室完全手工制作。由于您的订单专为您定制，请在发货前预留 5-7 个工作日用于制作。质量是我们的首要原则——我们不会发送不达标的作品。",
    orderNotesLbl: "订单备注",
    orderNotesPlaceholder: "礼品寄语、配送说明或其他…",
    paymentTitle: "电子转账付款",
    paymentBodyPrefix: "今日不收取任何款项。下单后，我们的品牌总监将亲自联系您",
    paymentBodySuffix: "发送转账说明并确认所有细节。",
    placeOrder: "提交订单",
    placingOrder: "正在提交…",
    termsText: "提交订单即表示您同意我们的",
    termsLink: "服务条款",
    privacyLink: "隐私政策",
    orderSummary: "订单摘要",
    subtotal: "小计",
    shipping: "配送",
    engravingLbl: "刻字",
    total: "合计",
    dueETransfer: "订单确认后通过电子转账付款。",
    trustSignals: [
      "每件作品在加拿大手工制作",
      "品牌总监亲自与您沟通",
      "确认后才需付款",
      "离开工作室前经过质量检验",
    ],
    emptyTitle: "购物车为空",
    orderReceived: "订单已收到",
    thankYouPrefix: "谢谢您，",
    orderConfirmedPrefix: "您的订单",
    orderConfirmedSuffix: "已确认。我们已记录您的配送地址及刻字详情。",
    whatHappensNext: "后续流程",
    nextSteps: [
      { heading: "品牌总监将与您联系", copy: "请在 1 个工作日内在 {0} 收到来自我们的邮件。我们将确认订单细节并发送电子转账说明。" },
      { heading: "电子转账付款", copy: "您的订单总额为 {1}。收到转账后，我们将立即开始制作您的作品。" },
      { heading: "按订单手工制作", copy: "每件 Cobble 作品均在加拿大工作室手工制作。制作需 5-7 个工作日。" },
      { heading: "全程追踪配送", copy: "您的订单将全程追踪配送。预计到达：发货后约一周。" },
    ],
    firstName: "名",
    lastName: "姓",
    emailLbl: "邮箱",
    phoneLbl: "电话",
    address1: "地址",
    address2: "公寓 / 门牌",
    cityLbl: "城市",
    provinceLbl: "省 / 州",
    postalCode: "邮政编码",
    countryLbl: "国家",
    optional: "选填",
    required: "必填",
    enterValidEmail: "请输入有效邮箱",
    pleaseEnterEngraving: "请输入刻字内容",
    characters: "字符",
  },

  dashboard: {
    memberSince: "加入于",
    signOut: "退出登录",
    sections: { overview: "概览", orders: "订单", saved: "收藏", profile: "个人资料", addresses: "地址" },
    eyebrow: "账户",
    welcomeBack: "欢迎回来，",
    recentOrderText: "您最近的作品如下。慢慢来——美好的事物需要时间。",
    noOrdersText: "工作室现在很安静。准备好了就来浏览商店吧。",
    mostRecentOrder: "最近订单",
    allOrders: "全部订单",
    noOrdersYet: "暂无订单。您的委托将显示在这里。",
    browseShop: "浏览商店",
    savedPieces: "收藏作品",
    viewAll: "查看全部",
    noSavedPiecesOverview: "暂无收藏作品——浏览商店开始收藏。",
    orderLabel: "订单",
    placedLabel: "下单日期",
    totalLabel: "总计",
    viewOrder: "查看订单",
    ordersTitle: "订单",
    ordersSub: "您所有委托作品的记录，从工作台到您手中。",
    noOrdersPlaced: "您还没有下过任何订单。",
    piece: "件",
    pieces: "件",
    close: "关闭",
    details: "详情",
    orderTotal: "订单总计",
    engraving: "刻字",
    shipTo: "配送至",
    viewInvoice: "查看发票",
    buyAgain: "再次购买",
    orderStages: { ordered: "已下单", workshop: "制作中", shipped: "已发货", delivered: "已送达" },
    savedTitle: "收藏作品",
    savedSub: "您关注的作品。每件都是独一无二的——一旦售出，即告绝版。",
    noSavedPieces: "暂无收藏作品。",
    browseShopArrow: "浏览商店 →",
    removeFromSaved: "取消收藏",
    profileTitle: "个人资料",
    profileSub: "您的联系方式。我们很少写信，只谈工作。",
    loginDetails: "登录信息",
    fullNameLabel: "全名",
    emailLabel: "邮箱",
    passwordLabel: "密码",
    lastChanged: "4个月前修改。",
    studioNotes: "工作室通知",
    prefNewPieces: "新品与补货",
    prefNewPiecesHint: "有新作品上架时的简短通知。",
    prefJournal: "日志与工作室故事",
    prefJournalHint: "来自工作台的长篇记录。",
    prefSMS: "短信订单更新",
    prefSMSHint: "关于您委托的短信通知。",
    saveChanges: "保存更改",
    cancel: "取消",
    addressesTitle: "地址",
    addressesSub: "您的作品送往的地方。我们用再生羊毛和纸张手工包装每件作品。",
    defaultLabel: "默认",
    edit: "编辑",
    remove: "删除",
    setAsDefault: "设为默认",
    addAddress: "添加地址",
    editAddress: "编辑地址",
    addressLabelField: "标签",
    addressLine1: "地址行 1",
    addressLine2: "地址行 2（可选）",
    cityLabel: "城市",
    stateLabel: "省 / 州",
    postalLabel: "邮政编码",
    countryLabel: "国家",
    phoneLabel: "电话（可选）",
    setAsDefaultOnSave: "设为默认地址",
    saving: "保存中…",
  },

  productPage: {
    home: "首页",
    shop: "商店",
    collectionBadge: "系列",
    uniqueGrain: "每件作品都承载着其来源木材的纹理和细小的不规则性——没有两件是相同的。",
    productDetail: "产品详情",
    specification: "规格参数",
    careGuide: "护理指南",
    capacity: "容量",
    material: "材质",
    finish: "表面处理",
    dimension: "尺寸",
    features: ["满 $100 免费配送", "加拿大制造", "孤品——3-5天内发货"],
    shippingInfo: "关于运输",
    relatedProducts: "完善您的体验",
    quickAdd: "快速添加",
    newBadge: "新品",
  },

  productPurchase: {
    quantity: "数量",
    color: "颜色",
    size: "尺寸",
    addToCart: "加入购物车",
    added: "已添加 ✓",
    save: "收藏",
    saved: "已收藏 ♥",
    viewCart: "查看购物车 →",
  },

  journalContent: {
    backToJournal: "← 返回日志",
    brandStoryBreadcrumb: "品牌故事",
    minRead: "分钟阅读",
    brandStory: {
      poem: "流逝的时光，终将化形为一件木质器物。",
      poemLines: ["始于木", "终于器", "善于用"],
      attribution: "自2025年10月1日起，这件作品历时一个月完成——从设计到实现，独立进行，偶有朋友相助。",
      caption1: "从这里，我在加拿大多伦多的创作之旅开始了——伴随木材，在音乐中静静前行。",
      caption2: "这个过程如同作品的制作——观察、雕刻、打磨，循环往复。时间渐渐淡出意识。有时，我回过神来，才发现音乐已经停了——而一个小时已悄然流逝。",
    },
    posts: {
      "the-craft-behind-the-cup": {
        category: "工艺",
        title: "杯背后的工艺",
        body: [
          "每个杯子都从一块粗坯开始——胡桃木、樱桃木或枫木——因其密度和纹理的安静个性而被选中。这个过程没有捷径。木块必须被评估，在手中转动，被理解。",
          "第一刀是最不确定的。凿刀开始掏空，从那一刻起，杯子开始呈现自己。杯壁逐渐变薄。太快，木材就会开裂；太慢，节奏就会中断。与木材合作意味着顺应其本性，而非与之对抗。",
          "最终的形态不是从图纸中涌现，而是从对话中——制作者与材料之间的对话。每个杯子都是独一无二的，因为木材坚持如此。",
        ],
      },
      "from-wood-to-hand": {
        category: "过程",
        title: "从木到手——工作室内部",
        body: [
          "工作室在早晨是安静的。光线低低地穿过工作台，捕捉着前一天留下的细小尘埃。这是工作最清晰的时候——在决策的喧嚣之前，在手机响起之前。",
          "一个早晨的工作可能只产生一个准备好的木坯，或者经过数小时小幅调整后解决的一个曲线。木工的进展很少是线性的。有些天，凿子第一次就找到了正确的角度。其他天，则要花上大半个早晨。",
          "保持不变的是节奏：握住、倾听、切割、评估。手每次触碰木材都会学到新东西，这种学习会延续到之后每一件作品中。",
        ],
      },
      "light-and-shadow": {
        category: "故事",
        title: "光与影——静止的器物",
        body: [
          "静止的器物并非被动。它在纹理中积累光线，在曲线中保持阴影，在只有细心才能发现的地方保留着制作的痕迹。",
          "一个下午放在窗台上的杯子，与早餐时握在手中的是同一个杯子——但它也是另一种东西。光线改变了我们所看到的，而在改变我们所看到的同时，它也改变了我们记忆中使用它的方式。",
          "这就是木质器物随着时间所做的事。它们不是老化，而是深化。在工作室里看起来普通的纹理，经过多年的使用后变得发光。表面变得柔和。器物变得更加完整地成为它自己。",
        ],
      },
    },
  },

  account: {
    sectionLabel: "账户",
    welcomeBack: "欢迎回来",
    createAccount: "创建账户",
    signInDesc: "登录以查看您的订单和收藏作品。",
    registerDesc: "加入 Cobble，享受订单历史、收藏作品和工作室笔记。",
    signInTab: "登录",
    registerTab: "注册",
    fullNameLbl: "全名",
    emailLbl: "邮箱",
    passwordLbl: "密码",
    confirmPasswordLbl: "确认密码",
    rememberMe: "记住我",
    forgotPassword: "忘记密码？",
    signingIn: "登录中…",
    creatingAccount: "创建账户中…",
    signInBtn: "登录",
    createAccountBtn: "创建账户",
    newToCobble: "初次使用 Cobble？",
    alreadyHaveAccount: "已有账户？",
    createAccountLink: "创建账户",
    signInLink: "登录",
    termsText: "创建账户即表示您同意我们的使用条款和隐私政策。",
    imageQuote: "每件作品独一无二——为它而生的双手亦然。",
    checkEmailTitle: "查看您的邮箱",
    checkEmailDescPrefix: "我们已发送确认链接至",
    checkEmailDescSuffix: "点击链接激活您的账户。",
    resendEmail: "重新发送邮件",
    backToSignIn: "← 返回登录",
    linkResent: "新链接已发送。",
    fullNamePlaceholder: "张三",
    emailPlaceholder: "you@email.com",
    passwordPlaceholder: "••••••••",
    passwordsMustMatch: "两次输入的密码不一致。",
    passwordTooShort: "密码至少需要 6 个字符。",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// JAPANESE
// ─────────────────────────────────────────────────────────────────────────────
const ja: Translations = {
  nav: { shop: "ショップ", journal: "ジャーナル", about: "について", contact: "お問い合わせ", shopByCollection: "• コレクション別ショップ" },
  banner: "$100以上のご注文で送料無料。",
  search: "検索",
  myAccount: "マイアカウント",
  signOut: "サインアウト",

  viewMore: "もっと見る",
  viewAll: "すべて見る",
  shopNow: "今すぐ購入",
  continueShopping: "買い物を続ける",
  optional: "任意",
  free: "無料",
  and: "および",

  hero: { newArrivals: "新着商品" },

  productsSection: { title: "製品", viewAll: "すべて見る" },

  home: {
    journalTitle: "ジャーナル",
    videoQuote: "あなたの毎日が満たされますように",
    videoQuoteLine2: "インスピレーションを与えるもので。",
    aboutUs: "私たちについて",
  },

  about: {
    heroQuote: "「観察する。振り返る。なるがままに。」",
    ourStory: "私たちのストーリー",
    storyBody: [
      "C O B B L E は、カナダのトロントを拠点とする木工ブランドです。スタジオでは、日常の使用・素材性・静かな暮らしの関係を探る手工芸品を制作しています。",
      "各ピースは無垢材から作られ、素材の自然な木目と触感を活かしています。デザインはシンプルで機能的であり、長期的な使用を重視しています。",
      "私たちの目標は、美しいだけでなく、日々使い続けることを前提としたものを作ることです。",
      "時とともに木材は変化し、使用を通じて独自の個性を育みます。それが各ピースをあなただけのものにする自然なプロセスです。",
    ],
    cobbleNameDesc: "はスタジオの名前です。かつては角張った不規則な石が、自然の力でゆっくりと形を変えるように、各ピースはその独自の形として生まれます。",
    cobbleWorkDesc: "現在の制作シリーズは日常の器を探求しており、マグカップ・スクープ・スプーン・クリップ・プレートの5シリーズで展開しています。",
    ourProducts: "製品紹介",
    productEssence: "製品のエッセンス",
    productStory: "プロダクトストーリー",
    productStoryDesc: "インタビューを通して、製品の背景にあるストーリーやアイデアをご紹介します。",
    essenceSections: [
      { title: "自然", body: "各ピースには、その木が生きた証が刻まれています。木目のパターン、色調、質感は自然に変化し、すべての器を唯一無二のものにします。" },
      { title: "工芸", body: "手で設計し仕上げた各器は、プロポーション・触感・細部への丁寧な配慮を反映しています。" },
      { title: "触れる", body: "木は触れることを誘います。その温もりと重さは手に心地よくなじみ、毎日持ち、使い続けたくなります。" },
      { title: "パティナ", body: "器は使うほどに意味を帯びます。時とともに木材はより豊かな色調を育み、日常の細やかな痕跡を刻みます。" },
      { title: "リチュアル", body: "私たちは、日常のひとときは大切にされるべきと信じています。朝のコーヒーでも午後のお茶でも、ふさわしい器がそのひとときを完全にします。" },
    ],
    productCards: [
      { label: "マグカップ", desc: "天然木の温もりと個性を讃える木製の器" },
      { label: "スクープ",   desc: "コーヒーを正確に量るための手工芸スクープ" },
      { label: "プレート",   desc: "木の美しさと職人の手仕事を体現する作品" },
    ],
    journalCategories: ["ブランドストーリー", "コミュニティ", "ビジネス", "マテリアル"],
  },

  contact: {
    title: "お問い合わせ",
    intro1: "ご連絡をお待ちしております。",
    intro2: "製品についてのご質問、コラボレーション、取材依頼、その他のご質問は、お気軽にお問い合わせください。",
    contactFormBtn: "お問い合わせフォーム",
    instagram: "INSTAGRAM",
    customerService: "カスタマーサービス",
    collaboration: "コラボレーション",
    collaborationDesc: "クリエイティブなパートナーシップとコラボレーションのお問い合わせ",
    locationsTitle: "取扱店舗",
    locationsDesc: "厳選されたカフェ、ティーハウス、独立系小売店でCOBBLEをお見つけください。",
    retailerLabel: "小売店",
    retailerName: "MIKA Gift Shop — Toronto",
    retailerAddress: "496 College Street, Toronto, Ontario",
    visitUsTitle: "スタジオ訪問",
    visitUsDesc: "私たちのスタジオは、アイデアが形になり、器が生まれる場所です。スタジオ見学、ワークショップ、職人技と日常のリチュアルを中心とした時間をともに過ごす方々をお待ちしています。",
    studioLabel: "スタジオ",
    studioAddress: "380 Alliance Ave, Toronto, Ontario",
    getDirections: "道順を見る",
    mapTitle: "トロント 380 Alliance Ave の Cobble スタジオを示す地図",
    sendMessage: "メッセージを送る",
    nameLbl: "お名前",
    namePlaceholder: "お名前をご入力ください",
    emailLbl: "メールアドレス",
    messageLbl: "メッセージ",
    messagePlaceholder: "どのようなご用件でしょうか？",
    sendBtn: "送信",
  },

  journal: {
    title: "ジャーナル",
    subtitle: "感覚を豊かにするストーリー、\n日常を心地よく、意図を持って。",
    catAll: "すべて",
    catCraft: "工芸",
    catProcess: "プロセス",
    catMaterial: "素材",
    catStory: "ストーリー",
    catStudioNote: "スタジオノート",
    noStories: "このカテゴリにはまだストーリーがありません。",
  },

  collections: { allCollections: "すべてのコレクション" },

  footer: {
    tagline: "意図を持って手作りされた木製品。すべてのピースは一点もの。",
    shopTitle: "ショップ",
    shopLinks: ["カップ＆マグ", "トレー＆ボード", "スプーン", "新着商品", "ギフトアイデア"],
    aboutTitle: "について",
    aboutLinks: ["私たちのストーリー", "工芸", "ジャーナル", "サステナビリティ"],
    supportTitle: "サポート",
    supportLinks: ["FAQ", "配送・返品", "製品ケア", "お問い合わせ"],
    newsletterTitle: "ニュースレター",
    newsletterDesc: "最新情報をお届け——新作・ストーリー・スタジオノートをメールでお届けします。",
    emailPlaceholder: "メールアドレス",
    joinBtn: "登録",
    copyright: "© 2026 Cobble Canada Inc.",
    privacyPolicy: "プライバシーポリシー",
    termsOfUse: "利用規約",
  },

  cart: {
    title: "カート",
    emptyTitle: "カートが空です",
    emptyDesc: "手工芸コレクションをご覧になり、お気に入りの作品を見つけてください。",
    colProduct: "製品",
    colQty: "数量",
    colPrice: "価格",
    colorLbl: "カラー：",
    sizeLbl: "サイズ：",
    clearCart: "カートを空にする",
    orderSummary: "注文概要",
    subtotal: "小計",
    shipping: "配送",
    addMoreForFreeShipping: "送料無料まであと {0}",
    total: "合計",
    proceedToCheckout: "レジに進む",
    continueShopping: "買い物を続ける",
    trustSignals: ["CA$100以上で送料無料", "カナダ製", "安全なチェックアウト"],
  },

  checkout: {
    stepCart: "カート",
    stepShipping: "配送",
    sectionContact: "連絡先",
    sectionShipping: "配送先住所",
    sectionEngraving: "パーソナル彫刻",
    engravingDesc: "名前、日付、または短いフレーズをピースに手彫りできます。",
    textToEngrave: "彫刻する文字",
    engravingInputPlaceholder: "例：Sarahへ、愛を込めて — 2025年6月",
    placementLbl: "彫刻位置",
    placementPlaceholder: "例：底面、内縁…",
    engravingNote: "ブランドディレクターが開始前にメールで彫刻の詳細を確認します。最終的な位置とフォントスタイルは一緒に決定します。",
    deliveryHeading: "心を込めた手作り——約1週間でお届け",
    deliveryBody: "すべてのCobbleピースはカナダのスタジオで完全に手作業で作られます。お客様のご注文は専用に制作されるため、発送前に5〜7営業日の制作時間をご確認ください。品質が第一原則です——準備ができていないピースはお送りしません。",
    orderNotesLbl: "注文メモ",
    orderNotesPlaceholder: "ギフトメッセージ、配送指示、その他…",
    paymentTitle: "電子送金によるお支払い",
    paymentBodyPrefix: "本日はお支払いは発生しません。ご注文後、ブランドディレクターが直接",
    paymentBodySuffix: "に連絡し、電子送金の手順とお客様のピースの詳細を確認いたします。",
    placeOrder: "注文を確定する",
    placingOrder: "注文処理中…",
    termsText: "ご注文いただくことで、",
    termsLink: "利用規約",
    privacyLink: "プライバシーポリシー",
    orderSummary: "注文概要",
    subtotal: "小計",
    shipping: "配送",
    engravingLbl: "彫刻",
    total: "合計",
    dueETransfer: "注文確認後に電子送金でお支払いいただきます。",
    trustSignals: [
      "すべてカナダで手作り",
      "ブランドディレクターが直接ご連絡",
      "確認後のみお支払い",
      "出荷前に品質検査済み",
    ],
    emptyTitle: "カートが空です",
    orderReceived: "ご注文を受け付けました",
    thankYouPrefix: "ありがとうございます、",
    orderConfirmedPrefix: "注文番号",
    orderConfirmedSuffix: "が確認されました。配送先住所と彫刻の詳細を記録しました。",
    whatHappensNext: "今後の流れ",
    nextSteps: [
      { heading: "ブランドディレクターよりご連絡", copy: "1営業日以内に {0} へ個人的なメールが届きます。注文内容の確認と電子送金の手順をお伝えします。" },
      { heading: "電子送金によるお支払い", copy: "ご注文合計は {1} です。送金が確認され次第、すぐに制作を開始します。" },
      { heading: "ご注文に合わせた手作り", copy: "すべてのCobbleピースはカナダのスタジオで手作りされます。制作には5〜7営業日かかります。" },
      { heading: "追跡付き配送", copy: "ご注文は追跡付きで発送されます。お届け予定：発送から約1週間。" },
    ],
    firstName: "名",
    lastName: "姓",
    emailLbl: "メールアドレス",
    phoneLbl: "電話番号",
    address1: "住所",
    address2: "アパート・部屋番号",
    cityLbl: "市区町村",
    provinceLbl: "都道府県 / 州",
    postalCode: "郵便番号",
    countryLbl: "国",
    optional: "任意",
    required: "必須",
    enterValidEmail: "有効なメールアドレスを入力してください",
    pleaseEnterEngraving: "彫刻するテキストを入力してください",
    characters: "文字",
  },

  dashboard: {
    memberSince: "メンバー登録日",
    signOut: "サインアウト",
    sections: { overview: "概要", orders: "注文", saved: "保存済み", profile: "プロフィール", addresses: "住所" },
    eyebrow: "アカウント",
    welcomeBack: "おかえりなさい、",
    recentOrderText: "最新の作品は下にあります。ゆっくりどうぞ——良いものには時間がかかります。",
    noOrdersText: "工房は今のところ静かです。準備ができたらショップをご覧ください。",
    mostRecentOrder: "最新の注文",
    allOrders: "すべての注文",
    noOrdersYet: "まだ注文がありません。委託注文はここに表示されます。",
    browseShop: "ショップを見る",
    savedPieces: "保存した作品",
    viewAll: "すべて見る",
    noSavedPiecesOverview: "まだ保存した作品がありません——ショップを見て保存を始めましょう。",
    orderLabel: "注文",
    placedLabel: "注文日",
    totalLabel: "合計",
    viewOrder: "注文を見る",
    ordersTitle: "注文",
    ordersSub: "工房からあなたの手へ——すべての委託注文の記録。",
    noOrdersPlaced: "まだ注文していません。",
    piece: "点",
    pieces: "点",
    close: "閉じる",
    details: "詳細",
    orderTotal: "注文合計",
    engraving: "彫刻",
    shipTo: "配送先",
    viewInvoice: "請求書を見る",
    buyAgain: "再購入",
    orderStages: { ordered: "注文済み", workshop: "制作中", shipped: "発送済み", delivered: "配達済み" },
    savedTitle: "保存した作品",
    savedSub: "気になっている作品。どれも一点もの——なくなったらそれまでです。",
    noSavedPieces: "まだ保存した作品がありません。",
    browseShopArrow: "ショップを見る →",
    removeFromSaved: "保存を解除",
    profileTitle: "プロフィール",
    profileSub: "あなたの連絡先。私たちはめったに書かず、仕事についてのみです。",
    loginDetails: "ログイン情報",
    fullNameLabel: "フルネーム",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    lastChanged: "4ヶ月前に変更。",
    studioNotes: "スタジオノート",
    prefNewPieces: "新作・再入荷",
    prefNewPiecesHint: "新しい作品が届いたときの簡単なお知らせ。",
    prefJournal: "ジャーナル＆スタジオストーリー",
    prefJournalHint: "作業台からの長文ノート。",
    prefSMS: "SMSによる注文更新",
    prefSMSHint: "委託に関するテキストメッセージ。",
    saveChanges: "変更を保存",
    cancel: "キャンセル",
    addressesTitle: "住所",
    addressesSub: "あなたの作品が届く場所。リサイクルウールと紙で一点ずつ手梱包します。",
    defaultLabel: "デフォルト",
    edit: "編集",
    remove: "削除",
    setAsDefault: "デフォルトに設定",
    addAddress: "住所を追加",
    editAddress: "住所を編集",
    addressLabelField: "ラベル",
    addressLine1: "住所 1",
    addressLine2: "住所 2（任意）",
    cityLabel: "市区町村",
    stateLabel: "都道府県 / 州",
    postalLabel: "郵便番号",
    countryLabel: "国",
    phoneLabel: "電話（任意）",
    setAsDefaultOnSave: "デフォルトの住所に設定",
    saving: "保存中…",
  },

  productPage: {
    home: "ホーム",
    shop: "ショップ",
    collectionBadge: "コレクション",
    uniqueGrain: "各ピースはその元となった木材の木目と小さな不規則性を持ちます——同じものは二つとありません。",
    productDetail: "製品詳細",
    specification: "仕様",
    careGuide: "ケアガイド",
    capacity: "容量",
    material: "素材",
    finish: "仕上げ",
    dimension: "寸法",
    features: ["$100以上で送料無料", "カナダ製", "一点もの——3〜5日以内に発送"],
    shippingInfo: "配送について",
    relatedProducts: "あなたの体験を完成させる",
    quickAdd: "クイック追加",
    newBadge: "新着",
  },

  productPurchase: {
    quantity: "数量",
    color: "カラー",
    size: "サイズ",
    addToCart: "カートに追加",
    added: "追加しました ✓",
    save: "保存",
    saved: "保存済み ♥",
    viewCart: "カートを見る →",
  },

  journalContent: {
    backToJournal: "← ジャーナルに戻る",
    brandStoryBreadcrumb: "ブランドストーリー",
    minRead: "分で読める",
    brandStory: {
      poem: "過ぎ去った時は、最終的に木製の器として形を成す。",
      poemLines: ["木から生まれ", "器として形成され", "使用を通じて磨かれる"],
      attribution: "2025年10月1日より、この作品は1ヶ月かけて完成しました——デザインから実現まで独立して行い、時折友人たちの支援を受けながら。",
      caption1: "ここから、カナダのトロントでの私の創作の旅が始まりました——木とともに、音楽に静かに寄り添いながら。",
      caption2: "このプロセスは作品の制作を映し出しています——観察し、彫り、磨くという継続的なサイクル。時間は次第に意識から消えていきます。気がつくと音楽が止まっていて、もう1時間が経っていたということもあります。",
    },
    posts: {
      "the-craft-behind-the-cup": {
        category: "工芸",
        title: "カップの裏にある工芸",
        body: [
          "各カップは粗い木材のブロックから始まります——クルミ、チェリー、またはメープル——密度と木目の静かな個性によって選ばれます。このプロセスに近道はありません。ブロックは評価され、手の中で回転させられ、理解されなければなりません。",
          "最初の切り込みが最も不確かです。丸のみが空洞を始め、その瞬間からカップは自らを明かし始めます。壁は徐々に薄くなっていきます。速すぎると木が割れ、遅すぎるとリズムが崩れます。木と共に働くとは、その性質に従って働くことであり、逆らうことではありません。",
          "最終的な形は図面からではなく、対話から生まれます——作り手と素材の間の対話から。木がそれを主張するから、各カップは唯一無二なのです。",
        ],
      },
      "from-wood-to-hand": {
        category: "プロセス",
        title: "木から手へ——工房の内側",
        body: [
          "工房は朝、静かです。光が作業台を横切って低く差し込み、前日の細かな埃を捉えます。これが最も仕事が明確な時——決断の喧騒の前、電話の前。",
          "午前中の作業は、よく準備された木材のブランク以上のものを生み出さないかもしれませんし、あるいは何時間もの小さな調整の後に解決された一つの曲線だけかもしれません。木工の進歩が直線的であることはめったにありません。ある日はのみが最初の一回で正しい角度を見つけます。他の日は午前中のほとんどがかかります。",
          "変わらないのはリズムです：持つ、聴く、切る、評価する。手は木に触れるたびに何か新しいことを学び、その学びは後に続くすべての作品へと引き継がれていきます。",
        ],
      },
      "light-and-shadow": {
        category: "ストーリー",
        title: "光と影——静止する器",
        body: [
          "静止した器は受動的ではありません。木目に光を蓄積し、曲線に影を保ち、細心の注意を払った者だけが見つける場所に作られた跡を残しています。",
          "午後に窓辺に置かれたカップは、朝食時に手に持ったカップと同じですが、それはまた別の何かでもあります。光は私たちが見るものを変え、見るものを変えることで、私たちがそれを使った記憶も変えます。",
          "これが木製の器が時間とともにすることです。それらは老いるのではなく、深まります。工房では単純に見えた木目が、何年も使用されると輝くようになります。仕上げが柔らかくなります。器はより完全に自分自身になっていきます。",
        ],
      },
    },
  },

  account: {
    sectionLabel: "アカウント",
    welcomeBack: "おかえりなさい",
    createAccount: "アカウントを作成",
    signInDesc: "ログインしてご注文と保存した作品を確認してください。",
    registerDesc: "Cobbleに参加して、注文履歴・保存作品・スタジオノートをご利用ください。",
    signInTab: "ログイン",
    registerTab: "登録",
    fullNameLbl: "フルネーム",
    emailLbl: "メールアドレス",
    passwordLbl: "パスワード",
    confirmPasswordLbl: "パスワードの確認",
    rememberMe: "ログイン状態を保持",
    forgotPassword: "パスワードをお忘れですか？",
    signingIn: "ログイン中…",
    creatingAccount: "アカウント作成中…",
    signInBtn: "ログイン",
    createAccountBtn: "アカウントを作成",
    newToCobble: "Cobble初めてのご利用ですか？ ",
    alreadyHaveAccount: "すでにアカウントをお持ちですか？ ",
    createAccountLink: "アカウントを作成",
    signInLink: "ログイン",
    termsText: "アカウントを作成することで、利用規約およびプライバシーポリシーに同意したことになります。",
    imageQuote: "すべてのピースは唯一無二——そのために作られた手もまた然り。",
    checkEmailTitle: "メールをご確認ください",
    checkEmailDescPrefix: "確認リンクを送信しました：",
    checkEmailDescSuffix: "リンクをクリックしてアカウントを有効化してください。",
    resendEmail: "メールを再送する",
    backToSignIn: "← ログインに戻る",
    linkResent: "新しいリンクが送信されました。",
    fullNamePlaceholder: "山田 太郎",
    emailPlaceholder: "you@email.com",
    passwordPlaceholder: "••••••••",
    passwordsMustMatch: "パスワードが一致しません。",
    passwordTooShort: "パスワードは6文字以上で入力してください。",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTED HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export function fmt(template: string, ...args: string[]): string {
  return args.reduce((s, arg, i) => s.replace(`{${i}}`, arg), template)
}

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "EN",  native: "English"  },
  { code: "fr", label: "FR",  native: "Français" },
  { code: "zh", label: "中文", native: "中文"     },
  { code: "ja", label: "日本語", native: "日本語" },
]

const translations: Record<Language, Translations> = { en, fr, zh, ja }

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("cobble-lang") as Language | null
    if (stored && (["en", "fr", "zh", "ja"] as Language[]).includes(stored)) {
      setLanguageState(stored)
    }
  }, [])

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    localStorage.setItem("cobble-lang", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
