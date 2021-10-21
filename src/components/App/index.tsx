import { useState } from "react";

import { GlobalContext } from "../../context";
import { Status } from "../../enums";

import Header from "../Header";
import StartButtons from "../StartButtons";
import Message from "../Message";
import Game from "../Game";
import AgainButton from "../AgainButton";

import useStyles from "./css.js";

function App() {
	const classes = useStyles();

	const [state, setState] = useState<State>({
		status: Status.Init,
		message: "",
		playerFirst: false,
		match: null,
		moveAllowed: false
	});

	return (
		<GlobalContext.Provider value={{ state, setState }}>
			<div className={ classes.app }>
				<Header />
				<StartButtons />
				<Message />
				<AgainButton />
				<Game />
			</div>
		</GlobalContext.Provider>
	);
}

export default App;
