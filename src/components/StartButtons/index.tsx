import { useGlobalContext,  } from "../../context";
import { Status } from "../../enums";

import Button from "../Button";

import useStyles from "./css";

const StartButtons = () => {
	const { status, setStatus, setMessage } = useGlobalContext();

	const classes = useStyles(status);

	const playerFirst = () => {
		setStatus(Status.Started);
		setMessage("play your move");
	};

	const computerFirst = () => {
		setStatus(Status.Started);
		setMessage("computer's move...");
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
