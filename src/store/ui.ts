import { create } from "zustand";

import { SolatEnum } from "entities/solat";
import { IDisplaySolatModalParam } from "entities/ui";

export interface IUiSlice {
  solat: SolatEnum | undefined;
  displayModal: boolean;
  displaySolatInfoModal: (solatType: IDisplaySolatModalParam) => void;
}

export const createUiSlice = create<IUiSlice>((set, _get) => ({
  solat: undefined,
  displayModal: false,
  displaySolatInfoModal: ({ solat, displayModal }: IDisplaySolatModalParam) =>
    set({ solat, displayModal }),
}));
