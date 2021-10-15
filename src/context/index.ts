import { createContext, useContext } from "react";

import { Status } from "../enums";

export const GlobalContext = createContext<Context>({
	status: Status.Init,
	setStatus: () => {},
	message: "",
	setMessage: () => {}
});

export const useGlobalContext = () => useContext(GlobalContext);
