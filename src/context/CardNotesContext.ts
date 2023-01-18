import { createContext } from "react";

export const CardNotesContext = createContext<{
  show: boolean;
  toggle: Function;
}>({
  show: false,
  toggle: () => {},
});
