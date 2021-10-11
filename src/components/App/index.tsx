import { useState } from "react";

import Header from "../Header";
import StartButtons from "../StartButtons";
import Message from "../Message";
import Game from "../Game";
import AgainButton from "../AgainButton";

import useStyles from "./css.js";

function App() {
	enum State {
		Init,
		Started,
		Over
	};

	const [state, setState] = useState({
		state: State.Init,
		// message: "Fake message",
		message: "Sorry, the computer beat you..."
	});

	const playerFirst = () => {
		setState({
			...state,
			state: State.Started
		});
	};

	const computerFirst = () => {
		setState({
			...state,
			state: State.Started
		});
	};

	const play = () => {
		setState({
			...state,
			state: State.Over
		});
	};

	const playAgain = () => {
		setState({
			...state,
			state: State.Init
		});
	};

	const classes = useStyles();

	return (
		<div className={ classes.app }>
			<Header />
			<StartButtons state={ state.state } onClickPlayer={ playerFirst } onClickComputer={ computerFirst } />
			<Message state={ state.state }>{ state.message }</Message>
			<AgainButton state={ state.state } onClick={ playAgain }/>
			<Game onClick={ play } />
		</div>
	);
}

export default App;
