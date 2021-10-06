import Button from "../Button";

import useStyles from "./css.js";

const AgainButton = () => {
	const classes = useStyles();

	return (
		<div className={ classes.againButton }>
			<Button text="play again?" />
		</div>
	);
};

export default AgainButton;
