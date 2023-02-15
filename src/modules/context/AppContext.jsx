import { createContext } from "react";

const store = { cart: {}, products: [] };

export const AppContext = createContext(store);
