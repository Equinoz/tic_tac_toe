import PropTypes from "prop-types";

import Button from "../Button";

import useStyles from "./css.js";

const StartButtons = (props: { onClickPlayer: () => void, onClickComputer: () => void }) => {
	const classes = useStyles();

	return (
		<div className={ classes.startButtons }>
			<h2 className={ classes.h2 }>Who goes first?</h2>
			<div className={ classes.buttons }>
				<Button text="player" onClick={ props.onClickPlayer } />
				<Button text="computer" onClick={ props.onClickComputer } />
			</div>
		</div>
	);
};

StartButtons.propTypes = {
	onClickPlayer: PropTypes.func.isRequired,
	onClickComputer: PropTypes.func.isRequired
};

export default StartButtons;
