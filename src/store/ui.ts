import { create } from "zustand";

import { ICompulsaryPrayerPlaceholder } from "entities/solat";

export interface ZusUIType {
  solat: ICompulsaryPrayerPlaceholder | undefined;
  insallationGuideModalIsOpen: boolean;
  solatInfoModalIsOpen: boolean;
  setSolat: (param: ICompulsaryPrayerPlaceholder) => void;
  setSolatInfoModalIsOpen: (param: boolean) => void;
  setInstallationGuideModalOpen: (param: boolean) => void;
}

export const useUIStore = create<ZusUIType>((set, _get) => ({
  solat: undefined,
  insallationGuideModalIsOpen: false,
  solatInfoModalIsOpen: false,
  setSolat: (param: ICompulsaryPrayerPlaceholder) => set({ solat: param }),
  setSolatInfoModalIsOpen: (param: boolean) =>
    set({ solatInfoModalIsOpen: param }),
  setInstallationGuideModalOpen: (param: boolean) =>
    set({ insallationGuideModalIsOpen: param }),
}));
