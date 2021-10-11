import PropTypes from "prop-types";

import Button from "../Button";

import useStyles from "./css";

const StartButtons = (props: { state: number, onClickPlayer: () => void, onClickComputer: () => void }) => {
	const classes = useStyles(props);

	return (
		<div className={ classes.startButtons }>
			<h2 className={ classes.h2 }>Who goes first?</h2>
			<div className={ classes.buttons }>
				<Button onClick={ props.onClickPlayer }>player</Button>
				<Button onClick={ props.onClickComputer }>computer</Button>
			</div>
		</div>
	);
};

StartButtons.propTypes = {
	state: PropTypes.number.isRequired,
	onClickPlayer: PropTypes.func.isRequired,
	onClickComputer: PropTypes.func.isRequired
};

export default StartButtons;
