import { useContext } from 'react';
import { ModInfoContext } from '../ModInfoContext';

export function useModInfo() {
  return useContext(ModInfoContext);
}
