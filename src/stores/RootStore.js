import { ModInfoStore } from './ModInfoStore';

export class RootStore {
  modInfoStore;

  constructor() {
    this.modInfoStore = new ModInfoStore(this);
  }
}
