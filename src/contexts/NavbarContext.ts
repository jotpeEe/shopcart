import { createContext } from 'react';

export const NavbarContext = createContext<
    | {
          handleRouteChange: (title: string) => void;
          active: string;
      }
    | undefined
>(undefined);
