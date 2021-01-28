import React, {createContext, useContenxt} from "react";
import AuthStore from "./auth";

const context = createContext({
    AuthStore: new AuthStore()
});

export const useStore = () => useContenxt(context);