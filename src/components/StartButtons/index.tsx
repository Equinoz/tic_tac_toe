import { useGlobalContext } from "../../context";
import { Status } from "../../enums";
import { Match } from "../../utils/Match";

import Button from "../Button";

import useStyles from "./css";

const StartButtons = () => {
	const { state, setState } = useGlobalContext();

	const classes = useStyles(state.status);

	const playerFirst = () => {
		setState({
			...state,
			status: Status.Started,
			message: "play your move",
			playerFirst: true,
			match: new Match(false),
			moveAllowed: true
		});
	};

	const computerFirst = () => {
		setState({
			...state,
			status: Status.Started,
			message: "computer's move...",
			playerFirst: false,
			match: new Match()
		});
	};

	return (
		<div className={ classes.startButtons }>
			<h2 className={ classes.h2 }>Who goes first?</h2>
			<div className={ classes.buttons }>
				<Button onClick={ playerFirst  }>player</Button>
				<Button onClick={ computerFirst }>computer</Button>
			</div>
		</div>
	);
};

export default StartButtons;
