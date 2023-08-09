import { create } from "zustand";

import { SolatEnum } from "entities/solat";

export interface ZusUIType {
  solat: SolatEnum | undefined;
  insallationGuideModalIsOpen: boolean;
  setInstallationGuideModalOpen: (param: boolean) => void; 

}

export const useUIStore = create<ZusUIType>((set, _get) => ({
  solat: undefined,
  insallationGuideModalIsOpen: false,
  setInstallationGuideModalOpen: (param: boolean) => set({ insallationGuideModalIsOpen: param }),
}));
