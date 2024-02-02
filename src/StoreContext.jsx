import { createContext } from 'react';
import { RootStore } from './data/classes/RootStore';

export const StoreContext = createContext(null);

// store is a singleton
let store = null;

export function StoreProvider({ children }) {
  const rootStore = store ?? new RootStore();
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
}
