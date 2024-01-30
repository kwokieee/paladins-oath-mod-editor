import { useRootStore } from './useRootStore';

export function useModInfoStore() {
  const { modInfoStore } = useRootStore();
  return modInfoStore;
}
