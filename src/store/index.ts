import { create } from "zustand";
import { createUiSlice, IUiSlice } from "./slices/ui";
import { createSolatSlice, ISolatSlice } from "./slices/solat";

type IZustandStore = ISolatSlice & IUiSlice;

export const useZtdStore = create<IZustandStore>()((...fn) => ({
  ...createUiSlice(...fn),
  ...createSolatSlice(...fn),
}));
