import { useGlobalContext } from "../../context";
import { Status } from "../../enums";

import Button from "../Button";

import useStyles from "./css";

const AgainButton = () => {
	const { state, setState } = useGlobalContext();

	const classes = useStyles(state.status);

	return (
		<div className={ classes.againButton }>
			<Button onClick={ () => setState({ ...state, status: Status.Init }) }>play again?</Button>
		</div>
	);
};

export default AgainButton;
