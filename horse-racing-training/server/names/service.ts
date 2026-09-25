// Lazily-created singleton: name store (on the momentum DB) + background refresher.
import { momentum } from "../momentum/service";
import { nameStore, type NameStore } from "./store";
import { getNameIndex } from "./nameIndex";
import { pageClient } from "./hkjcPages";
import { createRefresher, type Refresher } from "./refresher";

let inst: { store: NameStore; refresher: Refresher } | null = null;

export function names() {
  if (!inst) {
    const store = nameStore(momentum().db);
    inst = { store, refresher: createRefresher({ store, index: getNameIndex, pages: pageClient() }) };
  }
  return inst;
}
