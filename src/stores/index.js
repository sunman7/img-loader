import {createContext, useContext} from "react";
import authStore from "./auth";
import userStore from "./user";


const context = createContext({
    authStore,
    userStore
});

export const useStore = () => useContext(context);