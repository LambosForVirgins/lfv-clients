import { type DrawEntry } from "@/state/types";

class EntryDatabase {
  private readonly _records: DrawEntry[] = [];

  constructor(_initialState: DrawEntry[] = []) {
    this._records = _initialState;
  }

  async addEntry(entry: DrawEntry): Promise<void> {
    this._records.push(entry);
  }

  async all(): Promise<DrawEntry[]> {
    return this._records;
  }

  async find(entryId: string): Promise<DrawEntry | null> {
    return this._records.find((entry) => entry.id === entryId) ?? null;
  }

  async countEntries(address: string): Promise<number> {
    return this._records.reduce((total, entry) => {
      if (entry.address === address) {
        total += 1;
      }

      return total;
    }, 0);
  }
}

export const EntryDB = new EntryDatabase();
