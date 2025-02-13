import { Merchandise } from "./types";

const isDev = import.meta.env.DEV;

export const MOCKS: Merchandise[] = [
  {
    id: "b0917b7a-b6f2-11ef-86c8-273af6a30755",
    sku: "2b8d8dc6-b7ec-4a61-b29e-f1e6ecd4d5d0",
    active: true,
    title: "Virgin Wrappers",
    description: "Doesn't count if you don't touch the sides.",
    media: [],
    providers: ["daee4f06-b6f2-11ef-b6d2-1f52d6bbb5bd"],
    price: 100_000,
  },
  {
    id: "cc35068e-b6f3-11ef-9935-3b89a2cb274d",
    sku: "76f396a3-b803-4c84-a7d6-1146e66554a5",
    active: isDev,
    title: "Cum Socks",
    description: null,
    media: [],
    constraints: {
      minBalance: 250_000,
    },
    providers: ["45bdeb8d-8fdc-4a73-ae6f-057aea599558"],
    price: 250_000,
  },
  {
    id: "f649e2bb-0d91-4ea0-8b12-f1209d56a85c",
    sku: "e694ee20-c9fa-4300-95cf-fd25e05c9efb",
    active: isDev,
    title: "Large Load",
    description: "1 Million VIRGIN for bulkiest buyers.",
    media: [],
    constraints: {
      minBalance: 1_000_000,
      limited: 100,
      limit: 1,
    },
    providers: ["45bdeb8d-8fdc-4a73-ae6f-057aea599558"],
    price: 250_000,
  },
  {
    id: "930be8a7-1d6c-4af0-81c9-31afde5a04dd",
    sku: "e90be35f-1ee9-4224-878b-47ed049c5934",
    active: isDev,
    title: "Surface-to-Air Guidance Not-missile",
    description: "It's not the size but how you use it.",
    media: [],
    constraints: {
      minBalance: 5_000_000,
    },
    providers: ["daee4f06-b6f2-11ef-b6d2-1f52d6bbb5bd"],
    price: [
      {
        value: 750_000,
        currency: "VIRGIN",
      },
      {
        value: 1500,
        currency: "USD",
      },
    ],
  },
  {
    id: "d9e2d0e8-5e8a-4663-972c-129b14e0cc9c",
    sku: "da171a34-37fb-4467-8208-b66f1d3fcede",
    active: true,
    title: "Sticker Pack",
    description: null,
    media: [],
    constraints: {
      minBalance: 250_000,
    },
    providers: ["daee8b06-b6f2-11ef-b6d2-ebc5e4d8a9fe"],
    price: 250_000,
  },
  {
    id: "5c9115e6-fb1f-4b72-9307-9e95cba12a90",
    sku: "3ad33a1f-6075-47bb-af00-e5a92fa1215c",
    active: isDev,
    title: "Not Lambo Wrap",
    description: null,
    media: [],
    constraints: {
      minBalance: 250_000,
    },
    providers: ["daee8b06-b6f2-11ef-b6d2-ebc5e4d8a9fe"],
    price: 250_000,
  },
];
