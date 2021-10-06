import Header from "../Header";
import StartButtons from "../StartButtons";
import Message from "../Message";
import Game from "../Game";
import AgainButton from "../AgainButton";

import useStyles from "./css.js";

function App() {
	const classes = useStyles();

	return (
		<div className={ classes.app }>
			<Header />
			<StartButtons />
			<Message />
			<Game />
			<AgainButton />
		</div>
	);
}

export default App;
