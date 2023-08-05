import { create, StateCreator } from "zustand";

import { IDisplaySolatModalParam } from "./types";

import { SolatEnum } from "entities/solat";

export interface IUiSlice {
  uiSolat: SolatEnum | undefined;
  uiSolatModalIsOpen: boolean;
  uiDisplaySolatModal: (solatType: IDisplaySolatModalParam) => void;
}

export const createUiSlice: StateCreator<IUiSlice> = create<IUiSlice>(
  (set, _get) => ({
    uiSolat: undefined,
    uiSolatModalIsOpen: false,
    uiDisplaySolatModal: ({ solat, display }: IDisplaySolatModalParam) =>
      set({ uiSolat: solat, uiSolatModalIsOpen: display }),
  })
);
