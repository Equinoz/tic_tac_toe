import { createContext, useContext } from "react";

import { Status } from "../enums";

export const GlobalContext = createContext<Context>({
	state: {
		status: Status.Init,
		message: "",
		playerFirst: false,
		match: null,
		moveAllowed: false
	},
	setState: (State) => {}
});

export const useGlobalContext = () => useContext(GlobalContext);
