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
	const playMove = (x: number, y:number) => {
		console.log("Le coup joué", x, ":", y);
	};

	const classes = useStyles();

	const [status, setStatus] = useState<Status>(Status.Init);
	const [message, setMessage] = useState<string>("");

	return (
		<GlobalContext.Provider value={{ status, setStatus, message, setMessage }}>
			<div className={ classes.app }>
				<Header />
				<StartButtons />
				<Message />
				<AgainButton />
				<Game playMove={ playMove } />
			</div>
		</GlobalContext.Provider>
	);
}

export default App;
