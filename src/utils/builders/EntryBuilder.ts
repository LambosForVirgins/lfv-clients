import { v4 as generateRandom } from "uuid";

class EntryBuilder {
  build() {
    return { id: generateRandom().slice(0, 8), address: "test" };
  }
}

export const createEntry = () => new EntryBuilder().build();
