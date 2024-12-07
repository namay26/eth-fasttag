import { createContext } from "react";

type Actions = {
  scan: string | null;
  write: string | null;
  setActions: (actions: { scan: string | null; write: string | null }) => void;
};

export const ActionsContext = createContext<Actions>({
  scan: null,
  write: null,
  setActions: () => {},
});
