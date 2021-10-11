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
		message: "Fake message"
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
			{ state.state === State.Init && <StartButtons onClickPlayer={ playerFirst } onClickComputer={ computerFirst } />}
			{ state.state !== State.Init && <Message message={ state.message }/> }
			<Game onClick={ play } />
			{ state.state === State.Over && <AgainButton onClick={ playAgain }/>}
		</div>
	);
}

export default App;
