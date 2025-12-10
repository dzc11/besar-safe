import create from 'zustand'

export const useStore = create(set => ({
  userPhone: null,
  setUserPhone: (p) => set({ userPhone: p }),
  reports: [],
  setReports: (r) => set({ reports: r })
}));