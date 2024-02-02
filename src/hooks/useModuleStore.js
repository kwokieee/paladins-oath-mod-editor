import { useModInfoStore } from './useModInfoStore';

export function useModuleStore() {
  const { moduleStore } = useModInfoStore();
  return moduleStore;
}
