import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type UIContextType = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const UIContext =
  createContext<UIContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const UIProvider = ({
  children,
}: Props) => {
  const [isCartOpen, setIsCartOpen] =
    useState(false);

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        openCart: () =>
          setIsCartOpen(true),
        closeCart: () =>
          setIsCartOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error(
      "useUI must be used within UIProvider"
    );
  }

  return context;
};