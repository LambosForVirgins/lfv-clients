export enum DrawStatus {
  Pending = "Pending",
  Open = "Open",
  Locked = "Locked",
  Closed = "Closed",
}

type RemixEvent = {
  timeStamp: number;
  sender: string;
  hash: string;
};

export type DrawEvent = RemixEvent;

export type DrawEntry = {
  id: string;
  address: string;
  name?: string;
};

export type EntryRecord = {
  drawId: string;
  address: string;
  name?: string;
  count: number;
};

export type DrawRecord = {
  id: string;
  giveawayId: string;
  timeOpens: number;
  timeCloses: number;
  timeDraws: number;
  price: number;
  seed: string | null;
  winner: number | null;
  status: DrawStatus;
  entries: DrawEntry[];
  events: DrawEvent[];
};

export type DrawRound = DrawRecord & {
  seed: null;
  winner: null;
};

export type DrawResult = DrawRecord & {
  status: DrawStatus.Closed;
  seed: string;
  winner: number;
};

export type GiveawayRecord = {
  id: string;
  title: string;
  description: string | undefined | null;
  active: boolean;
  providers: string[];
  criteria: EntryCriteria[];
};

export type Giveaway = GiveawayRecord & {
  draws: DrawRecord[];
};

export type EntryCriteria = {
  type: string;
  parameter?: string;
  value: number | number[] | undefined | null;
};
