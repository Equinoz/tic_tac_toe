import PropTypes from "prop-types";

import Button from "../Button";

import useStyles from "./css.js";

const AgainButton = (props: { onClick: () => void }) => {
	const classes = useStyles();

	return (
		<div className={ classes.againButton }>
			<Button text="play again?" onClick={ props.onClick } />
		</div>
	);
};

AgainButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default AgainButton;
