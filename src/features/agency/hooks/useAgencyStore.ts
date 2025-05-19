import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const accessTokenKey = 'GP:ACCESS';
export const accessTokenExpireKey = 'GP:ACCESS:EXPIRE';

export type AgencyState = {
  context: {
    agencyId: number | null;
  };
};

export type AgencyActions = {
  actions: {
    setAgency: (context: AgencyState['context']) => void;
  };
};

export type AgencyStore = AgencyState & AgencyActions;

export const PERSIST_AUTH_KEY = 'agency-storage';

export const useAgencyStore = create<AgencyStore>()(
  persist(
    (set) => ({
      context: {
        agencyId: null,
      },
      actions: {
        setAgency: (context) => set({ context }),
      },
    }),
    {
      name: PERSIST_AUTH_KEY,
      partialize: (state) => ({ context: state.context }),
    },
  ),
);
