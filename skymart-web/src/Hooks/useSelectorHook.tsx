import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

export const useSelectorHook = (term: String, stateName) => {
  return useSelector((state: RootState | Object) => state[stateName][term]);
};
