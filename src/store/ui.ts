import { create } from "zustand";

import { SolatEnum } from "entities/solat";

export interface ZusUIType {
  solat: SolatEnum | undefined;
  insallationGuideModalIsOpen: boolean;
  solatInfoModalIsOpen: boolean;
  setSolat: (param: SolatEnum) => void;
  setSolatInfoModalIsOpen: (param: boolean) => void;
  setInstallationGuideModalOpen: (param: boolean) => void;
}

export const useUIStore = create<ZusUIType>((set, _get) => ({
  solat: undefined,
  insallationGuideModalIsOpen: false,
  solatInfoModalIsOpen: false,
  setSolat: (param: SolatEnum) => set({ solat: param }),
  setSolatInfoModalIsOpen: (param: boolean) =>
    set({ solatInfoModalIsOpen: param }),
  setInstallationGuideModalOpen: (param: boolean) =>
    set({ insallationGuideModalIsOpen: param }),
}));
