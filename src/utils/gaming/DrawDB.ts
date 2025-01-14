import { type DrawRecord } from "@/state/types";
import { createDraw, createDrawResult } from "./DrawBuilder";

class DrawDatabase {
  private readonly _draws: DrawRecord[] = [];

  constructor(_initialDraws: DrawRecord[] = []) {
    this._draws = _initialDraws;
  }

  async addDraw(draw: DrawRecord): Promise<void> {
    this._draws.push(draw);
  }

  async all(): Promise<DrawRecord[]> {
    return this._draws;
  }

  async find(drawId: string): Promise<DrawRecord | null> {
    console.log("drawId", drawId, this._draws);
    return this._draws.find((draw) => draw.id === drawId) ?? null;
  }

  async getCurrentDraw(): Promise<DrawRecord | null> {
    return this._draws[this._draws.length - 1] ?? null;
  }
}

const draw1 = createDrawResult("giveaway-bc923fbe", "36ffef35"),
  draw2 = createDrawResult("giveaway-bc923fbe", "2a934bf9"),
  latestDraw = createDraw("giveaway-bc923fbe", "we3t54wa").open();

export const DrawDB = new DrawDatabase([draw1, draw2, latestDraw]);
