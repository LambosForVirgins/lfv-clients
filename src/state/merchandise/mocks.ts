import { Merchandise } from "./types";

export const MOCKS: Merchandise[] = [
  {
    id: "b0917b7a-b6f2-11ef-86c8-273af6a30755",
    sku: "2b8d8dc6-b7ec-4a61-b29e-f1e6ecd4d5d0",
    active: true,
    title: "Virgin Condoms",
    description: null,
    providers: ["daee4f06-b6f2-11ef-b6d2-1f52d6bbb5bd"],
    price: 100_000,
  },
  {
    id: "cc35068e-b6f3-11ef-9935-3b89a2cb274d",
    sku: "76f396a3-b803-4c84-a7d6-1146e66554a5",
    active: true,
    title: "Cum Socks",
    description: null,
    constraints: {
      minBalance: 250_000,
    },
    providers: ["45bdeb8d-8fdc-4a73-ae6f-057aea599558"],
    price: 250_000,
  },
  {
    id: "930be8a7-1d6c-4af0-81c9-31afde5a04dd",
    sku: "e90be35f-1ee9-4224-878b-47ed049c5934",
    active: true,
    title: "Surface-to-Air Guidance Not-missile",
    description: "It's not the size but how you use it.",
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
    constraints: {
      minBalance: 250_000,
    },
    providers: ["daee8b06-b6f2-11ef-b6d2-ebc5e4d8a9fe"],
    price: 250_000,
  },
];
