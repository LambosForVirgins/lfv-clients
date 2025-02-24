import { DrawStatus, Giveaway, type GiveawayRecord } from "../draws/types";
import { v4 as generateUnique } from "uuid";

export const DAILY_GIVEAWAY_ID = "b0917b7a-b6f2-11ef-86c8-273af6a30755";

const isDev = import.meta.env.DEV;

type DrawAccount = {
  drawId: number;
  entries: any[];
  giveawayId: number;
  timeCreated: number;
  totalEntries: number;
  version: 1 | 0 | number;
};

export const MOCKS: Giveaway[] = [
  {
    id: "b0917b7a-b6f2-11ef-86c8-273af6a30755",
    active: isDev,
    description:
      "Top up your holdings with 10,000 and 100,000 VIRGIN awarded every day",
    title: "Daily Top Up",
    draws: [
      {
        id: "59418864-b6f3-11ef-9935-4b687ac24f23",
        seed: "dc0e5da5",
        status: DrawStatus.Closed,
        timeOpens: new Date("2025-01-12").getTime(),
        timeCloses: new Date("2025-01-13").getTime(),
        timeDraws: new Date("2025-01-14").getTime(),
        winner: null,
        entries: [],
        events: [],
      },
      {
        id: "5941e106-b6f3-11ef-9935-eb82dccecc73",
        seed: "ded44c60",
        status: DrawStatus.Closed,
        timeOpens: new Date("2025-01-13").getTime(),
        timeCloses: new Date("2025-01-14").getTime(),
        timeDraws: new Date("2025-01-15").getTime(),
        winner: null,
        entries: [],
        events: [],
      },
      {
        id: "5941e34a-b6f3-11ef-9935-37b9787dc41c",
        seed: "d13a660f",
        status: DrawStatus.Closed,
        timeOpens: new Date("2025-01-14").getTime(),
        timeCloses: new Date("2025-01-15").getTime(),
        timeDraws: new Date("2025-01-16").getTime(),
        winner: null,
        entries: [],
        events: [],
      },
      {
        id: "5941e502-b6f3-11ef-9935-f74ceb9fe5b6",
        seed: "b1a5cb92",
        status: DrawStatus.Closed,
        timeOpens: new Date("2025-01-15").getTime(),
        timeCloses: new Date("2025-01-16").getTime(),
        timeDraws: new Date("2025-01-17").getTime(),
        winner: null,
        entries: [],
        events: [],
      },
      {
        id: "5941e692-b6f3-11ef-9935-7f8c9326aece",
        seed: "a45758cc",
        status: DrawStatus.Closed,
        timeOpens: new Date("2025-01-16").getTime(),
        timeCloses: new Date("2025-01-17").getTime(),
        timeDraws: new Date("2025-01-18").getTime(),
        winner: null,
        entries: [],
        events: [],
      },
      {
        id: "3b1d189a-3dbf-4931-bdcf-96b0e559b300",
        seed: "a45758cc",
        status: DrawStatus.Closed,
        timeOpens: new Date("2025-01-17").getTime(),
        timeCloses: new Date("2025-01-18").getTime(),
        timeDraws: new Date("2025-01-19").getTime(),
        winner: null,
        entries: [],
        events: [],
      },
      {
        id: "2b257ce2-3faf-4b29-8f8f-83a39946fc04",
        seed: "a45758cc",
        status: DrawStatus.Closed,
        timeOpens: new Date("2025-01-18").getTime(),
        timeCloses: new Date("2025-01-19").getTime(),
        timeDraws: new Date("2025-01-20").getTime(),
        winner: null,
        entries: [],
        events: [],
      },
    ],
    providers: ["daee4f06-b6f2-11ef-b6d2-1f52d6bbb5bd"],
  },
  {
    id: "cc35068e-b6f3-11ef-9935-3b89a2cb274d",
    active: isDev,
    description: null,
    title: "Gold Bullion",
    constraints: {
      minBalance: 250_000,
    },
    draws: [],
    providers: ["daee8b06-b6f2-11ef-b6d2-ebc5e4d8a9fe"],
  },
  {
    id: "433b8cf8-b6f4-11ef-97c4-1fcb6de3dc2e",
    active: isDev,
    description: "Only the purest virgins can qualify for this giveaway",
    title: "Jeffrey's Island",
    constraints: {
      minBalance: 6_000_000,
    },
    draws: [],
    providers: ["daee8c50-b6f2-11ef-b6d2-3b8d6bd7279d"],
  },
  {
    id: "433b96ee-b6f4-11ef-97c4-2ba747ecd978",
    active: isDev,
    description: null,
    title: "Rolex Giveaway",
    draws: [],
    providers: ["daee8d22-b6f2-11ef-b6d2-7f8b06f19b37"],
  },
  {
    id: "433b9824-b6f4-11ef-97c4-e345c9682b0b",
    active: isDev,
    description: null,
    title: "$10K Cash",
    draws: [],
    providers: ["daee8dea-b6f2-11ef-b6d2-177155e4986e"],
  },
  {
    id: "433b9914-b6f4-11ef-97c4-4b7adfdcc5a1",
    active: isDev,
    title: "Bahamas Escape",
    description: null,
    draws: [],
    providers: ["daee8ebc-b6f2-11ef-b6d2-6b58d76ded67"],
  },
  {
    id: "433b99fa-b6f4-11ef-97c4-37fa46f8adaf",
    active: isDev,
    description: "Mary Magdalene did it with her legs closed",
    title: "Baby Jesus",
    draws: [],
    providers: ["daee8f7a-b6f2-11ef-b6d2-db62b187397b"],
  },
  {
    id: "433b9acc-b6f4-11ef-97c4-a7249a818ed6",
    active: true,
    description: "Celebrating $100M USD Market Cap with a Lambo giveaway",
    title: "$100M Lambo",
    constraints: {
      minBalance: 2000,
    },
    draws: [],
    providers: ["daee4f06-b6f2-11ef-b6d2-1f52d6bbb5bd"],
  },
];
