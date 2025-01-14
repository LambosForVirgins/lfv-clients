import { v4 as generateRandom } from "uuid";
import { deriveNumberFromSeed } from "../string/deriveNumberFromSeed";
import {
  type DrawEvent,
  DrawStatus,
  type DrawRecord,
  type DrawEntry,
} from "@/state/types";

class DrawBuilder implements DrawRecord {
  readonly id: string;
  readonly giveawayId: string;
  readonly seed: string;
  status: DrawStatus;
  timeOpens: number;
  timeCloses: number;
  timeDraws: number;
  winner: number;
  price: number;
  /**
   * The number of entry tokens required to enter the draw.
   * Defaults to 1 in most cases.
   */
  readonly entryFee: number = 1;
  readonly events: DrawEvent[] = [];
  readonly entries: DrawEntry[] = [];

  constructor(_giveawayId: string, id?: string, _duration: number = 60) {
    this.id = `draw-${id || generateRandom()}`;
    this.giveawayId = _giveawayId;
    this.timeOpens = Date.now();
    this.timeCloses = Date.now() + _duration * 60 * 1000;
    this.timeDraws = this.timeCloses + 3600000;
    this.price = 1;
    this.seed = generateRandom().substring(0, 8);
    this.status = DrawStatus.Pending;
    this.winner = this.getSelectedEntry();
  }

  close() {
    if (this.status === DrawStatus.Closed)
      throw new Error("Draw already closed");
    this.status = DrawStatus.Closed;
    return this;
  }

  open() {
    if (this.status !== DrawStatus.Pending)
      throw new Error("Draw status pending required");
    this.status = DrawStatus.Open;
    return this;
  }

  withStatus(status: DrawStatus) {
    this.status = status;
    return this;
  }

  withEvents(events: DrawEvent[]) {
    // TODO: Iterate events and add unique
    return this;
  }

  getSelectedEntry(): number {
    return deriveNumberFromSeed(this.seed, {
      max: this.entries.length,
      skip: this.winner,
    });
  }

  toJSON(): DrawRecord {
    return {
      id: this.id,
      giveawayId: this.giveawayId,
      seed: this.seed,
      status: this.status,
      timeOpens: this.timeOpens,
      timeCloses: this.timeCloses,
      timeDraws: this.timeDraws,
      price: this.price,
      winner: this.winner,
      events: this.events,
      entries: this.entries,
    };
  }
}

export const createDraw = (giveawayId: string, id?: string) =>
  new DrawBuilder(giveawayId, id);

export const createDrawResult = (giveawayId: string, id?: string) =>
  new DrawBuilder(giveawayId, id).close();
