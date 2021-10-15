import { useGlobalContext } from "../../context";
import { Status } from "../../enums";

import Button from "../Button";

import useStyles from "./css";

const AgainButton = () => {
	const { status, setStatus } = useGlobalContext();

	const classes = useStyles(status);

	return (
		<div className={ classes.againButton }>
			<Button onClick={ () => setStatus(Status.Init) }>play again?</Button>
		</div>
	);
};

export default AgainButton;
