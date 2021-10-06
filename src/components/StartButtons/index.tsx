import Button from "../Button";

import useStyles from "./css.js";

const StartButtons = () => {
	const classes = useStyles();

	return (
		<div className={ classes.startButtons }>
			<h2 className={ classes.h2 }>Who goes first?</h2>
			<div className={ classes.buttons }>
				<Button text="player" />
				<Button text="computer" />
			</div>
		</div>
	);
};

export default StartButtons;
