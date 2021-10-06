import PropTypes from "prop-types";

import useStyles from "./css.js";

const Button = (props: { text: string }) => {
	const classes = useStyles();

	return (
		<div className={ classes.button }>
			{ props.text[0].toUpperCase() + props.text.slice(1) }
		</div>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired
};

export default Button;
